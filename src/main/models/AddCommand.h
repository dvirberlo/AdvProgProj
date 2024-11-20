#ifndef ADDCOMMAND_H
#define ADDCOMMAND_H

#include "../models/CommandParser.h"
#include "../services/IUserService.h"
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
