#include <iostream>
#include <string>

class IMenu
{
public:
    virtual int nextCommand() = 0;
    virtual void displayError(const std::string &error) = 0;
};
