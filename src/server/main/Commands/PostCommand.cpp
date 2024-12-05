#include "PostCommand.h"

#include <iostream>

#include "../Users/IUserService.h"
#include "CommandParser.h"
using namespace std;

PostCommand::PostCommand(IUserService& userService, CommandParser& commandParser)
    : userService(userService), commandParser(commandParser) {}
void PostCommand::execute(const vector<string>& args) {
    // convert additional args (after "add") to integers
    vector<int> intArgs = commandParser.convertToInt(
        vector<string>(args.begin() + 1, args.end()));
    // if not enough args (or invalid args), do nothing
    if (intArgs.size() < 2) return;

    int userId = intArgs[0];
    set<int> movies(intArgs.begin() + 1, intArgs.end());
    userService.markAsWatched(userId, movies);
}
