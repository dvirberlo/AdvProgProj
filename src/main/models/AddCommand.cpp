
#include "./AddCommand.h"

#include <iostream>

#include "../models/CommandParser.h"
#include "../services/IUserService.h"

using namespace std;

AddCommand::AddCommand(IUserService& userService, CommandParser& commandParser)
    : userService(userService), commandParser(commandParser) {}

void AddCommand::execute(const vector<string>& args) {
    // convert additional args (after "add") to integers
    vector<int> intArgs = commandParser.convertToInt(
        vector<string>(args.begin() + 1, args.end()));
    // if not enough args (or invalid args), do nothing
    if (intArgs.size() < 2) return;

    int userId = intArgs[0];
    set<int> movies(intArgs.begin() + 1, intArgs.end());
    userService.markAsWatched(userId, movies);
}
