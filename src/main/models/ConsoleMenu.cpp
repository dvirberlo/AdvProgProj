#include "ConsoleMenu.h"

#include <iostream>
#include <string>

#include "CommandParser.h"
#include "ConsoleMenu.h"

using namespace std;

vector<string> ConsoleMenu::nextCommand() {
    string fullCommand;
    // Get the full input from stdin
    getline(cin, fullCommand);

    CommandParser parser;
    // The command will be processed by parser and returned as a vector of
    // strings
    vector<string> splittedCommand = parser.parseString(fullCommand);
    return splittedCommand;
}
