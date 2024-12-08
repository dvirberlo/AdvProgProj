#include "Server.h"

#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#include <iostream>
#include <string>
#include <thread>
using namespace std;
#define BUFFER_SIZE 4096
Server::Server(IMenu* menu, const std::map<std::string, ICommand*>& commands,
               const int port)
    : menu(menu), commands(commands), port(port) {}

void Server ::handleClient(int clientSocket) {
    CommandParser* commandParser = new CommandParser();
    // Read from the client
    char buffer[BUFFER_SIZE];
    while (true) {
        int expectedDataLen = sizeof(buffer);
        int readBytes = recv(clientSocket, buffer, expectedDataLen, 0);
        if (readBytes == 0) {
            // connection is closed
            // note that in this exercise we assume that the client will never
            // close the connection
            return;
        } else if (readBytes < 0) {
            cout << "error reading from client" << endl;
            return;
        }
        // Convert the buffer to a string : the command
        std::string inputCommand(buffer);
        // Parse the command using the command parser
        vector<string> splittedCommand =
            commandParser->parseString(inputCommand);
        // Find the command in the map
        auto it = commands.find(splittedCommand[0]);

        // Remark : commands.end() mark the end of the map (pass the map range)
        if (it != commands.end()) {
            commands[splittedCommand[0]]->execute(
                splittedCommand);  // Execute the command safely
            // Send the result to the client : remark we didnt change yet the
            // Command API which means for this moment we just send simple
            // string indicate we got the command
            string response = "We got the command";
            int sentBytes =
                send(clientSocket, response.c_str(), response.size(), 0);

            if (sentBytes < 0) {
                cout << "error sending to client" << endl;
                return;
            }
        } else {
            // Send an error message to the client: command invalid
            string error = "400 Bad Request";
            int sentBytes =
                send(clientSocket, error.c_str(), error.length(), 0);
        }
    }
}

void Server::run() {
    const int serverPort = this->port;
    int serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (serverSocket == -1) {
        std::cerr << "Can't create a socket";
        exit(1);
    }

    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(serverPort);
    // Accept connections from any IP : this is a Flag mark that
    serverAddr.sin_addr.s_addr = INADDR_ANY;
    int check =
        ::bind(serverSocket, (sockaddr*)&serverAddr, sizeof(serverAddr));

    if (check < 0) {
        std::cerr << "Can't bind to IP/port";
        close(serverSocket);
        exit(1);
    }
    // Start listening : SOMAXCONN is the maximum number of connections
    if (listen(serverSocket, SOMAXCONN) == -1) {
        std::cerr << "Can't listen";
        close(serverSocket);
        exit(1);
    }

    while (true) {
        sockaddr_in clientAddr;
        socklen_t clientAddrSize = sizeof(clientAddr);
        int clientSocket =
            accept(serverSocket, (sockaddr*)&clientAddr, &clientAddrSize);

        if (clientSocket < 0) {
            std::cerr << "Problem with client connecting!";
            close(clientSocket);
            continue;
        }
        // Handle the client in a separate thread
        std::thread clientThread(&Server::handleClient, this, clientSocket);
        // Detach the thread to allow it to run independently : we want to
        // support multiple clients
        clientThread.detach();
    }
}
