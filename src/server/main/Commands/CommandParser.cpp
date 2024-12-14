#include "CommandParser.h"

#include <stdexcept>
#include <string>
#include <vector>

using namespace std;

vector<string> CommandParser::parseString(const string& fullCommand) {
    if (fullCommand.empty() ||
        fullCommand.find_first_not_of(' ') == string::npos) {
        vector<string> empty;
        return empty;
    }
    vector<string> splittedCommand;
    size_t startPos = 0;  // Start position for finding words
    size_t endPos = 0;    // End position of a found word

    // Loop through the string to find command and arguments
    while ((endPos = fullCommand.find_first_not_of(' ', startPos)) !=
           string::npos) {
        // Find the end of the word
        startPos = fullCommand.find_first_of(' ', endPos);
        // Add the word to the vector
        splittedCommand.push_back(
            fullCommand.substr(endPos, startPos - endPos));
        // Update the start position for the next word
        startPos = (startPos == string::npos) ? startPos : startPos + 1;
    }
    return splittedCommand;
}

/**
 * converts a list of string into integers.
 * if the strings do not represent integers, returns an empty list.
 */
// Helper function to trim whitespace from both ends of a string
std::string trim(const std::string& str) {
    size_t start = str.find_first_not_of(" \t\n\r\f\v");
    size_t end = str.find_last_not_of(" \t\n\r\f\v");
    return (start == std::string::npos) ? ""
                                        : str.substr(start, end - start + 1);
}

std::vector<int> CommandParser::convertToInt(
    const std::vector<std::string>& strings) {
    std::vector<int> result;
    try {
        for (const std::string& str : strings) {
            std::string trimmedStr = trim(str);
            size_t pos;
            int num = std::stoi(trimmedStr, &pos);
            if (pos != trimmedStr.length()) {
                // If there are non-numeric characters after the number, return
                // an empty vector
                return {};
            }
            result.push_back(num);
        }
    } catch (const std::invalid_argument& e) {
        // If the string is not a valid number, return an empty vector
        return {};
    } catch (const std::out_of_range& e) {
        // If the number is out of range, return an empty vector
        return {};
    }
    return result;
}
