#include <iostream>
#include <string>
#include <vector>
using namespace std;
class CommandParser
{
public:
    vector<string> parseString(const string &fullCommand)
    {
        // if the string is empty just return indicator that invalid input.
        // if (fullCommand.empty())
        // {
        //     vector<string> command = {"No"};
        //     return command;
        // }
        vector<string> splitedCommand;
        size_t startPos = 0; // Start position for finding words
        size_t endPos = 0;   // End position of a found word

        // Loop through the string to find command and arguments
        while ((endPos = fullCommand.find_first_not_of(' ', startPos)) != string::npos)
        {
            // Find the end of the word
            startPos = fullCommand.find_first_of(' ', endPos);
            // Add the word to the vector
            splitedCommand.push_back(fullCommand.substr(endPos, startPos - endPos));
            // Update the start position for the next word
            startPos = (startPos == string::npos) ? startPos : startPos + 1;
        }
        return splitedCommand;
    }
};
// int main()
// {
//     CommandParser parser;
//     string input = "\n";
//     vector<string> words = parser.parseString(input);

//     // Print the result to verify
//     for (const string &word : words)
//     {
//         cout << word << endl;
//     }

//     return 0;
// }