#ifndef ICOMMAND_H
#define ICOMMAND_H
#include <vector>
#include <string>
using namespace std;
class ICommand
{
public:
    virtual void execute(vector<string> command) = 0;
    virtual ~ICommand() {}
};

#endif
