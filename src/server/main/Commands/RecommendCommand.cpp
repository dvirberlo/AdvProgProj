
#include "RecommendCommand.h"

#include <iostream>

#include "../Recommand-Engine/RecommendEngine.h"
#include "CommandParser.h"

using namespace std;

RecommendCommand::RecommendCommand(RecommendEngine& recommendEngine,
                                   CommandParser& commandParser)
    : recommendEngine(recommendEngine), commandParser(commandParser) {}

void RecommendCommand::execute(const vector<string>& args) {
    // convert additional args (after "recommend") to integers
    vector<int> intArgs = commandParser.convertToInt(
        vector<string>(args.begin() + 1, args.end()));
    // if thee are not enough exactly 2 valid, do nothing
    if (intArgs.size() != 2) 
    // return 400 message
    return;

    int userId = intArgs[0];
    int movieId = intArgs[1];
    vector<int> recommendedMovies =
        recommendEngine.getRecommendations(userId, movieId);
    //if there is no recommendations return 404 message
    if (recommendedMovies.size() == 0) 
    //return 404 message
    return;    

    // print all the recommended movies by order, with space as separator:
    for (auto& movie : recommendedMovies) {
        cout << movie << " ";
    }
    //return 200 message

    // write new line char, only if there were recommendations
    if (recommendedMovies.size() > 0) cout << endl;
}
