#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;
class IMenu {
   public:
    // the next command returns a map of the command and its arguments
    // Remark the key is the command and the value is a vector of strings that
    // represent the arguments
    virtual vector<string> nextCommand() = 0;
};
