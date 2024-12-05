#ifndef COMMANDPARSER_H
#define COMMANDPARSER_H

#include <string>
#include <vector>

using namespace std;

class CommandParser {
   public:
    vector<string> parseString(const string &fullCommand);

    vector<int> convertToInt(const vector<string> &strings);
};

#endif
