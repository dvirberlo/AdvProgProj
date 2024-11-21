#ifndef RECOMMEND_ENGINE_H
#define RECOMMEND_ENGINE_H

#include <iostream>
#include <map>
#include <set>
#include <string>
#include <unordered_set>
#include <vector>

#include "../Users/IUserService.h"
#include "../Users/User.h"

using namespace std;

class RecommendEngine {
   public:
    RecommendEngine(IUserService* userService);

    vector<int> getRecommendations(int user, int movie);

   private:
    IUserService* userService;
    // Function to compute the number of shared movies between two users
    int computeIntersect(const set<int>& UsrA, const set<int>& UsrB);

    // Function to compute the number of shared movies between the target user
    // and all other users
    map<int, int> computeSharedMovies(const std::map<int, set<int>>& dataMap,
                                      int targetUserId);

    // Function to get a list of users who have watched a specific movie
    vector<int> WhoWatchedMovie(const std::map<int, set<int>>& dataMap,
                                int targetMovieId);

    // Function to calculate the sum of shared movies for all users who watched
    // a given movie
    map<int, int> SumOfSharedMovies(const std::map<int, set<int>>& dataMap,
                                    int movieId, int userId);
};

#endif
