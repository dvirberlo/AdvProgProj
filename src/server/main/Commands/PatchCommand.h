#ifndef patch_COMMAND_H
#define patch_COMMAND_H

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
    void execute(const vector<string>& args) override;
};

#endif
