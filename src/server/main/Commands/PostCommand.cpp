#include "PostCommand.h"

#include <iostream>

#include "../Users/IUserService.h"
#include "CommandParser.h"
using namespace std;

PostCommand::PostCommand(IUserService &userService,
                         CommandParser &commandParser)
    : userService(userService), commandParser(commandParser) {}

string PostCommand::execute(const vector<string> &args) {
  //temporal output
  string output = "POST command executed\n";
  // convert additional args (after "add") to integers
  vector<int> intArgs =
      commandParser.convertToInt(vector<string>(args.begin() + 1, args.end()));

  // if not enough args (or invalid args), do nothing
  if (intArgs.size() < 2)
  // return 400 message
    return output;

  int userId = intArgs[0];
  set<int> movies(intArgs.begin() + 1, intArgs.end());

  if (userService.userExists(userId)) {
    // return 404 message
    return output;
  }

  userService.markAsWatched(userId, movies);
  //return 201 message
  return output;
}