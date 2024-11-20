#include <iostream>
#include "Help.cpp"
#include <string>
#include "IMenu.cpp"
#include "ICommand.cpp"
#include <map>
#include "CommandParser.cpp"
using namespace std;
class ConsoleMenu : public IMenu
{
public:
    // return value : vector of strings the first one will represent the command followed by args.
    vector<string> nextCommand() override
    {
        string fullCommand;
        // Get the full input from stdin
        getline(cin, fullCommand);
        CommandParser parser;
        // The command will be processed by parser and returned as a vector of strings
        vector<string> splittedCommand = parser.parseString(fullCommand);
        return splittedCommand;
    }
    void displayError(const std::string &error) override
    {
    }
};

// private:
//     ICommand *fromStrToIcmd(string str)
//     {
//         if (str == "help")
//         {
//             Help helper;
//             return new Help(helper);
//         }
//     }
// };