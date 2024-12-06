#include "DeleteCommand.h"

#include <iostream>
using namespace std;
DeleteCommand::DeleteCommand(IUserService& userService, CommandParser& commandParser)
    : userService(userService), commandParser(commandParser) {}

void DeleteCommand::execute(const vector<string>& args) {

    // Convert additional args (after "delete") to integers
    vector<int> intArgs = commandParser.convertToInt(
        vector<string>(args.begin() + 1, args.end()));
    
    // If not enough args (or invalid args), do nothing
    if (intArgs.size() < 2)
    // Return 400 message
     return; 

    int userId = intArgs[0]; // The first argument is the userId
    set<int> movies(intArgs.begin() + 1, intArgs.end()); // The rest of the arguments are movies

    // Check if the user exists
    if (!userService.userExists(userId)) {
    // return 404 message
    return;
  }
    //check if the user has the movies
    for (int movie : movies) {
        if (!userService.getAllUsersMap()[userId].count(movie)) {
            // return 404 message
            return;
        }
    }

    // Call the PersistentUserService method to remove the movies and possibly delete the user
    userService.markAsUnwatched(userId, movies);
    //return 204 message
}