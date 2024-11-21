#include "CommandParser.h"

#include <string>
#include <vector>

using namespace std;

vector<string> CommandParser::parseString(const string &fullCommand) {
    if (fullCommand.empty() ||
        fullCommand.find_first_not_of(' ') == string::npos) {
        vector<string> empty;
        return empty;
    }
    vector<string> splitedCommand;
    size_t startPos = 0;  // Start position for finding words
    size_t endPos = 0;    // End position of a found word

    // Loop through the string to find command and arguments
    while ((endPos = fullCommand.find_first_not_of(' ', startPos)) !=
           string::npos) {
        // Find the end of the word
        startPos = fullCommand.find_first_of(' ', endPos);
        // Add the word to the vector
        splitedCommand.push_back(fullCommand.substr(endPos, startPos - endPos));
        // Update the start position for the next word
        startPos = (startPos == string::npos) ? startPos : startPos + 1;
    }
    return splitedCommand;
}

/**
 * converts a list of string into integers.
 * if the strings do not represent integers, returns an empty list.
 */
vector<int> CommandParser::convertToInt(const vector<string> &strings) {
    vector<int> result;
    try {
        for (const string &str : strings) {
            result.push_back(stoi(str));
        }
    } catch (...) {
        // if some args are not numbers we return an empty list
        return {};
    }
    return result;
}
