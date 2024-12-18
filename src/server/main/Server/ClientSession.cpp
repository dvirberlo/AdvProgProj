#include "ClientSession.h"

#include <arpa/inet.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <unistd.h>

#include <cstring>
#include <iostream>
#include <string>
#include <vector>

#include "../Commands/CommandParser.h"
#include "../Commands/ICommand.h"
#include "../Commands/IMenu.h"
#include "../Commands/StatusCodeFactory.h"
#include "../Executor/Runnable.h"

#define BUFFER_SIZE 4096

using namespace std;

ClientSession::ClientSession(map<string, ICommand*>& commands,
                             CommandParser& commandParser, int clientSocket)
    : Runnable(),
      commands(commands),
      commandParser(commandParser),
      clientSocket(clientSocket) {}

void ClientSession::run() {
    while (true) {
        char buffer[BUFFER_SIZE] = {0};
        std::string inputCommand = "";
        while (true) {
            char buffer[BUFFER_SIZE] = {0};
            int expectedDataLen = sizeof(buffer);
            int readBytes =
                recv(this->clientSocket, buffer, expectedDataLen, 0);
            if (readBytes == 0) {
                // connection is closed
                // note that in this exercise we assume that the client will
                // never close the connection
                return;
            } else if (readBytes < 0) {
                cout << "error reading from client" << endl;
                return;
            } else {
                // Convert the buffer to a string : the command, concat the
                // result to data already received .
                inputCommand += std::string(buffer);
                if (inputCommand.find("\n") != std::string::npos) {
                    // Find the position of the newline character
                    size_t newlinePos = inputCommand.find("\n");
                    // Remove the newline character
                    inputCommand = inputCommand.erase(newlinePos, 1);
                    break;
                } else {
                    // Continue reading from the client
                    continue;
                }
            }
        }

        // Parse the command using the command parser
        vector<string> splittedCommand =
            this->commandParser.parseString(inputCommand);
        // Remark : commands.end() mark the end of the map (pass the map range)
        if (splittedCommand.size() > 0 &&
            this->commands.find(splittedCommand[0]) != this->commands.end()) {
            // execute the command and send the result to the client
            string response =
                this->commands[splittedCommand[0]]->execute(splittedCommand);
            int sentBytes =
                send(this->clientSocket, response.c_str(), response.size(), 0);

            if (sentBytes < 0) {
                cout << "error sending to client" << endl;
                return;
            }
        } else {
            // Send an error message to the client: command invalid
            string error = StatusCodeFactory::getStatusMessage(400);
            int sentBytes =
                send(this->clientSocket, error.c_str(), error.length(), 0);
        }
    }
}
