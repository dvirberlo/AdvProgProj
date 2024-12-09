#ifndef SERVER_H
#define SERVER_H

#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <sys/socket.h>
#include <unistd.h>

#include <map>
#include <string>

#include "../Commands/CommandParser.h"
#include "../Commands/ICommand.h"
#include "../Commands/IMenu.h"
class Server {
   private:
    IMenu *menu;
    std::map<std::string, ICommand *> commands;
    int const port;

   public:
    Server(IMenu *menu, const std::map<std::string, ICommand *> &commands,
           const int port);

    // Method to run the application
    void run();
    void handleClient(int clientSocket);
};

#endif  // SERVER_H
