#ifndef POSTCOMMAND_H
#define POSTCOMMAND_H

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
    void execute(const vector<string>& args) override;
};

#endif
