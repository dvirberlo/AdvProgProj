#include "PatchCommand.h"

#include <iostream>

#include "../Users/IUserService.h"
#include "CommandParser.h"
#include "StatusCodeFactory.h"
using namespace std;

PatchCommand::PatchCommand(IUserService& userService,
                           CommandParser& commandParser)
    : userService(userService), commandParser(commandParser) {}
string PatchCommand::execute(const vector<string>& args) {
    // convert additional args (after "add") to integers
    vector<int> intArgs = commandParser.convertToInt(
        vector<string>(args.begin() + 1, args.end()));
    // if not enough args (or invalid args), do nothing
    if (intArgs.size() < 2)
        // return 400 message
        return StatusCodeFactory::getStatusMessage(400);

    int userId = intArgs[0];
    set<int> movies(intArgs.begin() + 1, intArgs.end());

    if (!userService.userExists(userId)) {
        // return 404 message
        return StatusCodeFactory::getStatusMessage(404);
    }

    userService.markAsWatched(userId, movies);
    // return 204 message
    return StatusCodeFactory::getStatusMessage(204);
}
