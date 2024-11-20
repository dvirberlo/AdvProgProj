#include "ConsoleMenu.h"
#include "CommandParser.h"
#include <iostream>
#include <string>
using namespace std;
vector<string> ConsoleMenu::nextCommand()
{
    std::string fullCommand;
    // Get the full input from stdin
    std::getline(std::cin, fullCommand);
    CommandParser parser;
    // The command will be processed by parser and returned as a vector of strings
    vector<string> splittedCommand = parser.parseString(fullCommand);
    return splittedCommand;
}