#ifndef CLIENT_SESSION_H
#define CLIENT_SESSION_H

#include <iostream>
#include <map>
#include <string>
#include <vector>

#include "../Commands/CommandParser.h"
#include "../Commands/ICommand.h"
#include "../Executor/Runnable.h"

using namespace std;

class ClientSession : public Runnable {
   private:
    CommandParser& commandParser;
    map<string, ICommand*>& commands;
    int clientSocket;

   public:
    ClientSession(map<string, ICommand*>& commands,
                  CommandParser& commandParser, int clientSocket);

    void run() override;
};

#endif
