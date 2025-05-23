#ifndef POST_COMMAND_H
#define POST_COMMAND_H

#include "../Commands/CommandParser.h"
#include "../Users/IUserService.h"
#include "./ICommand.h"

using namespace std;

class PostCommand : public ICommand {
   private:
    IUserService& userService;
    CommandParser& commandParser;

   public:
    PostCommand(IUserService& userService, CommandParser& commandParser);
    string execute(const vector<string>& args) override;
};

#endif
