#include "CommandParser.h"
#include <string>
#include <vector>

std::vector<std::string> CommandParser::parseString(const std::string &fullCommand)
{
    std::vector<std::string> splitedCommand;
    size_t startPos = 0; // Start position for finding words
    size_t endPos = 0;   // End position of a found word

    // Loop through the string to find command and arguments
    while ((endPos = fullCommand.find_first_not_of(' ', startPos)) != std::string::npos)
    {
        // Find the end of the word
        startPos = fullCommand.find_first_of(' ', endPos);
        // Add the word to the vector
        splitedCommand.push_back(fullCommand.substr(endPos, startPos - endPos));
        // Update the start position for the next word
        startPos = (startPos == std::string::npos) ? startPos : startPos + 1;
    }
    return splitedCommand;
}
