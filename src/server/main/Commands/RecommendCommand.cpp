#include "RecommendCommand.h"

#include <iostream>

#include "../Recommand-Engine/RecommendEngine.h"
#include "CommandParser.h"
#include "StatusCodeFactory.h"

using namespace std;

RecommendCommand::RecommendCommand(RecommendEngine& recommendEngine,
                                   CommandParser& commandParser)
    : recommendEngine(recommendEngine), commandParser(commandParser) {}

string RecommendCommand::execute(const vector<string>& args) {

    // convert additional args (after "recommend") to integers
    vector<int> intArgs = commandParser.convertToInt(
        vector<string>(args.begin() + 1, args.end()));
    // if thee are not enough exactly 2 valid, do nothing
    if (intArgs.size() != 2) 
    // return 400 message
    return StatusCodeFactory::getStatusMessage(400);

    int userId = intArgs[0];
    int movieId = intArgs[1];
    vector<int> recommendedMovies =
        recommendEngine.getRecommendations(userId, movieId);
    //if there is no recommendations return 404 message
    if (recommendedMovies.size() == 0) 
    //return 404 message
    return StatusCodeFactory::getStatusMessage(404); 

    // prepare the output message
    string output = StatusCodeFactory::getStatusMessage(200) + "\n";
    for (auto& movie : recommendedMovies) {
            output += to_string(movie) + " ";  
        }
    output += "\n";
    return output;    
}
