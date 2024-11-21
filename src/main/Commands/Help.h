#ifndef HELP_H
#define HELP_H
#include "ICommand.h"
using namespace std;
class Help : public ICommand
{
public:
    void execute(vector<string> command) override;
};
#endif
