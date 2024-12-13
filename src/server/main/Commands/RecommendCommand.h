#ifndef RECOMMEND_COMMAND_H
#define RECOMMEND_COMMAND_H

#include "../Recommand-Engine/RecommendEngine.h"
#include "CommandParser.h"
#include "ICommand.h"

using namespace std;

class RecommendCommand : public ICommand
{
private:
    IUserService &userService;
    CommandParser &commandParser;
    RecommendEngine &recommendEngine;

public:
    RecommendCommand(IUserService &userService, CommandParser &commandParser,
                     RecommendEngine &recommendEngine);
    string execute(const vector<string> &args) override;
};

#endif
