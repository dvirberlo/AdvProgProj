#ifndef DELETE_COMMAND_H
#define DELETE_COMMAND_H

#include "../Commands/CommandParser.h"
#include "../Users/IUserService.h"
#include "./ICommand.h"

using namespace std;

class DeleteCommand : public ICommand {
   private:
    IUserService& userService;
    CommandParser& commandParser;

   public:
    DeleteCommand(IUserService& userService, CommandParser& commandParser);
    string execute(const vector<string>& args) override;
};

#endif