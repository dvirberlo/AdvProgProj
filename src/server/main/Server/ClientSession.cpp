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
        std::string inputCommand;

        // Read one full command line (until '\n')
        while (true) {
            char buffer[BUFFER_SIZE] = {0};
            int readBytes = recv(this->clientSocket, buffer, sizeof(buffer), 0);

            if (readBytes == 0) {
                // Client closed connection
                return;
            } else if (readBytes < 0) {
                std::cerr << "Error reading from client" << std::endl;
                return;
            } else {
                // Append received data to inputCommand
                inputCommand += std::string(buffer, readBytes);

                // Check if we have a newline
                size_t newlinePos = inputCommand.find('\n');
                if (newlinePos != std::string::npos) {
                    // Remove newline character
                    inputCommand.erase(newlinePos, 1);
                    break;
                }
            }
        }

        // Parse the command using the command parser
        std::vector<std::string> splittedCommand =
            this->commandParser.parseString(inputCommand);

        if (!splittedCommand.empty() &&
            this->commands.find(splittedCommand[0]) != this->commands.end()) {
            // Execute the command and send the result to the client
            std::string response =
                this->commands[splittedCommand[0]]->execute(splittedCommand);
            int sentBytes =
                send(this->clientSocket, response.c_str(), response.size(), 0);
            if (sentBytes < 0) {
                std::cerr << "Error sending to client" << std::endl;
                return;
            }
        } else {
            // Send an error message (bad command)
            std::string error = StatusCodeFactory::getStatusMessage(400);
            int sentBytes =
                send(this->clientSocket, error.c_str(), error.length(), 0);
            if (sentBytes < 0) {
                std::cerr << "Error sending to client" << std::endl;
                return;
            }
        }
    }
}
