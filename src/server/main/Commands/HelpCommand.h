#ifndef HELP_COMMAND_H
#define HELP_COMMAND_H

#include "ICommand.h"

using namespace std;
class HelpCommand : public ICommand {
   public:
    string execute(const vector<string>& args) override;
};

#endif
