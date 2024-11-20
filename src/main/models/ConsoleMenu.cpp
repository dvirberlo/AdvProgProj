#include <iostream>
#include <string>
#include "IMenu.cpp"
class ConsoleMenu : public IMenu
{
public:
    int nextCommand() override
    {
        int command;
        // input from standard input
        std::cin >> command;
        return command;
    }
    void displayError(const std::string &error) override
    {
    }
};