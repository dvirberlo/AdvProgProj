#ifndef IMENU_H
#define IMENU_H
#include <string>
#include <vector>
using namespace std;
class IMenu {
   public:
    virtual vector<string> nextCommand() = 0;
    virtual ~IMenu() {}
};

#endif
