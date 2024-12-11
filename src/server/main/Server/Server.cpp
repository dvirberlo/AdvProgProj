#include "Server.h"

#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#include <iostream>
#include <memory>
#include <string>
#include <thread>

#include "../Commands/StatusCodeFactory.h"
#include "../Executor/Executor.h"
#include "../Executor/SimpleExecutor.h"
#include "./ClientSession.h"

using namespace std;
#define BUFFER_SIZE 4096
Server::Server(IMenu* menu, std::map<std::string, ICommand*>& commands,
               unique_ptr<Executor> executor, const int port)
    : menu(menu), commands(commands), executor(move(executor)), port(port) {}

void Server ::handleClient(int clientSocket) {
    CommandParser commandParser;

    shared_ptr<ClientSession> clientSession =
        make_shared<ClientSession>(this->commands, commandParser, clientSocket);

    this->executor->execute(clientSession);
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
