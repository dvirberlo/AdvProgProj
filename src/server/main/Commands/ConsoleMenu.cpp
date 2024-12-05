#include "ConsoleMenu.h"

#include <iostream>
#include <string>

#include "CommandParser.h"
#include "ConsoleMenu.h"

using namespace std;

ConsoleMenu::ConsoleMenu(CommandParser& commandParser)
    : commandParser(commandParser) {}

vector<string> ConsoleMenu::nextCommand() {
    string fullCommand;
    // Get the full input from stdin
    getline(cin, fullCommand);

    // The command will be processed by parser and returned as a vector of
    // strings
    vector<string> splittedCommand = commandParser.parseString(fullCommand);
    return splittedCommand;
}
