
#include "./RecommendCommand.h"

#include <iostream>

#include "../models/CommandParser.h"
#include "../models/RecommendEngine.h"

using namespace std;

RecommendCommand::RecommendCommand(RecommendEngine& recommendEngine,
                                   CommandParser& commandParser)
    : recommendEngine(recommendEngine), commandParser(commandParser) {}

void RecommendCommand::execute(const vector<string>& args) {
    // convert additional args (after "add") to integers
    vector<int> intArgs = commandParser.convertToInt(
        vector<string>(args.begin() + 1, args.end()));
    // if thee are not enough exactly 2 valid, do nothing
    if (intArgs.size() != 2) return;

    int userId = intArgs[0];
    int movieId = intArgs[1];
    vector<int> recommendedMovies =
        recommendEngine.getRecommendations(userId, movieId);

    // print all the recommended movies by order, with space as separator:
    for (auto& movie : recommendedMovies) {
        cout << movie << " ";
    }
    // write new line char
    cout << endl;
}
