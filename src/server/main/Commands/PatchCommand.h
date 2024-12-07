#ifndef PATCH_COMMAND_H
#define PATCH_COMMAND_H

#include "../Commands/CommandParser.h"
#include "../Users/IUserService.h"
#include "./ICommand.h"

using namespace std;

class PatchCommand : public ICommand {
   private:
    IUserService& userService;
    CommandParser& commandParser;

   public:
    PatchCommand(IUserService& userService, CommandParser& commandParser);
    string execute(const vector<string>& args) override;
};

#endif
