#include "RecommendCommand.h"

#include <iostream>

#include "../Recommand-Engine/RecommendEngine.h"
#include "../Users/IUserService.h"
#include "CommandParser.h"
#include "StatusCodeFactory.h"

using namespace std;

RecommendCommand::RecommendCommand(IUserService &userService,
                                   CommandParser &commandParser,
                                   RecommendEngine &recommendEngine)
    : userService(userService),
      commandParser(commandParser),
      recommendEngine(recommendEngine) {}

string RecommendCommand::execute(const vector<string> &args) {
    // convert additional args (after "recommend") to integers
    vector<int> intArgs = commandParser.convertToInt(
        vector<string>(args.begin() + 1, args.end()));
    // if thee are not enough exactly 2 valid, do nothing
    if (intArgs.size() != 2)
        // return 400 message
        return StatusCodeFactory::getStatusMessage(400);

    int userId = intArgs[0];
    int movieId = intArgs[1];
    // check if the user exists
    if (!userService.userExists(userId)) {
        // return 404 message
        return StatusCodeFactory::getStatusMessage(404);
    }
    // get the recommended movies
    vector<int> recommendedMovies =
        recommendEngine.getRecommendations(userId, movieId);

    // prepare the output message
    string output = StatusCodeFactory::getStatusMessage(200) + "\n";
    // Add movie IDs with a space, ensuring no trailing space
    bool first = true;  // Flag to check if this is the first movie
    for (auto &movie : recommendedMovies) {
        if (!first) {
            output +=
                " ";  // Add space before the movie ID if it's not the first one
        }
        output += to_string(movie);  // Add the movie ID
        first = false;  // After the first movie, set the flag to false
    }

    output += "\n";  // Append the final newline
    return output;
}
