#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
#include <set>
#include <map>
#include "User.h"
#include "../services/IUserService.h"

using namespace std;


class RecommendEngine {
public:
    RecommendEngine(IUserService* userService);

   vector<int> getRecommendations(int user, int movie);

private:
    IUserService* userService;
// Function to compute the number of shared movies between two users
int computeIntersect(const set<int>& UsrA, const set<int>& UsrB);

// Function to compute the number of shared movies between the target user and all other users
map<int, int> computeSharedMovies(const std::map<int, set<int>>& dataMap, int targetUserId);

// Function to get a list of users who have watched a specific movie
vector<int> WhoWatchedMovie(const std::map<int, set<int>>& dataMap, int targetMovieId);

// Function to calculate the sum of shared movies for all users who watched a given movie
map<int, int> SumOfSharedMovies(const std::map<int, set<int>>& dataMap, int movieId, int userId);
};