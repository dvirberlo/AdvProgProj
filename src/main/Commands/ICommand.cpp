#ifndef ICommand_H
#define ICommand_H

#include <string>
#include <vector>

class ICommand
{
public:
    virtual void execute(std::vector<std::string> command) = 0; // Pure virtual function
    virtual ~ICommand() = default;                              // Virtual destructor
};

#endif // ICommand_H
