#ifndef COMMANDPARSER_H
#define COMMANDPARSER_H

#include <string>
#include <vector>

class CommandParser
{
public:
    std::vector<std::string> parseString(const std::string &fullCommand);
};

#endif
