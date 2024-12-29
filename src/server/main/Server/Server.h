#ifndef SERVER_H
#define SERVER_H

#include <map>
#include <memory>
#include <string>

#include "../Commands/CommandParser.h"
#include "../Commands/ICommand.h"
#include "../Executor/Executor.h"
class Server {
   private:
    std::map<std::string, ICommand *> commands;
    int const port;
    unique_ptr<Executor> executor;

   public:
    Server(std::map<std::string, ICommand *> &commands,
           unique_ptr<Executor> executor, const int port);

    // Method to run the application
    void run();
    void handleClient(int clientSocket);
};

#endif  // SERVER_H
