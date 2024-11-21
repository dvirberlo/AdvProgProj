#ifndef ICOMMAND_H
#define ICOMMAND_H
#include <string>
#include <vector>
using namespace std;
class ICommand {
   public:
    virtual void execute(const vector<string>& args) = 0;
    virtual ~ICommand() = default;
};

#endif
