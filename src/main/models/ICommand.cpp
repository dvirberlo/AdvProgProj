#include <string>
#include <vector>
using namespace std;
class ICommand
{
public:
    // the execute function : input : vector consist of the command and its arguments
    virtual void execute(vector<string> command) = 0;
    virtual ~ICommand() = default;
};