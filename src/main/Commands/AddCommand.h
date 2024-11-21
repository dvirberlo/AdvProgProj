#ifndef ADDCOMMAND_H
#define ADDCOMMAND_H

#include "../Commands/CommandParser.h"
#include "../Users/IUserService.h"
#include "./ICommand.h"

using namespace std;

class AddCommand : public ICommand {
   private:
    IUserService& userService;
    CommandParser& commandParser;

   public:
    AddCommand(IUserService& userService, CommandParser& commandParser);
    void execute(const vector<string>& args) override;
};

#endif
