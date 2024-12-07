#include "DeleteCommand.h"
#include <iostream>
using namespace std;
DeleteCommand::DeleteCommand(IUserService& userService, CommandParser& commandParser)
    : userService(userService), commandParser(commandParser) {}

string DeleteCommand::execute(const vector<string>& args) {
  //temporal output
  string output = "DELETE command executed\n";

    // Convert additional args (after "delete") to integers
    vector<int> intArgs = commandParser.convertToInt(
        vector<string>(args.begin() + 1, args.end()));

    // If not enough args (or invalid args), do nothing
    if (intArgs.size() < 2)
    // Return 400 message
     return output; 

    int userId = intArgs[0]; // The first argument is the userId
    set<int> movies(intArgs.begin() + 1, intArgs.end()); // The rest of the arguments are movies

    // Check if the user exists
    if (!userService.userExists(userId)) {
    // return 404 message
    return  output;
  }
  // check if the user has the movies
  if (!userService.moviesExist(userId, movies)) {
    // return 404 message
    return  output;
  }

    // Call the PersistentUserService method to remove the movies and possibly delete the user
    userService.markAsUnwatched(userId, movies);
    //return 204 message
    return output;
}