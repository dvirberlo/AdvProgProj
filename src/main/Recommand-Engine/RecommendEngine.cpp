#include "RecommendEngine.h"

#include <algorithm>

#include "../Users/IUserService.h"
#include "../Users/User.h"
#define N 10
using namespace std;

// Constructor to initialize the Recommendation Engine with user service and
// movie database
RecommendEngine::RecommendEngine(IUserService* userService)
    : userService(userService) {}

// Function to compute the number of shared movies between two users
int RecommendEngine::computeIntersect(const std::set<int>& UsrA,
                                      const std::set<int>& UsrB) {
    // create a set to store the intersection of the two sets
    std::set<int> intersection;
    // Calculate the intersection of the two sets (shared movies)
    std::set_intersection(UsrA.begin(), UsrA.end(), UsrB.begin(), UsrB.end(),
                          std::inserter(intersection, intersection.begin()));
    return intersection.size();  // Return the number of shared movies
}

// Function to compute the number of shared movies between the target user and
// all other users
std::map<int, int> RecommendEngine::computeSharedMovies(
    const std::map<int, std::set<int>>& dataMap, int targetUserId) {
    // Create a map to store the similarity between the target user and other
    // users
    std::map<int, int> userSimilarityMap;

    // Get the set of movies watched by the target user
    const auto& targetUserMovies = dataMap.at(targetUserId);

    // Calculate similarity (shared movies) for the target user with all other
    // users
    for (const std::pair<const int, std::set<int>>& entry : dataMap) {
        const int userId = entry.first;
        const std::set<int>& movies = entry.second;
        // Compute the number of shared movies with the target user
        userSimilarityMap[userId] = computeIntersect(targetUserMovies, movies);
    }
    userSimilarityMap.erase(
        targetUserId);  // Remove the target user from the map
    return userSimilarityMap;
}

// Function to get a list of users who have watched a specific movie
std::vector<int> RecommendEngine::WhoWatchedMovie(
    const std::map<int, std::set<int>>& dataMap, int targetMovieId) {
    std::vector<int> WhoWatched;

    // Iterate over each user and their watched movies
    for (const std::pair<const int, std::set<int>>& entry : dataMap) {
        const int userId = entry.first;
        const std::set<int>& movies = entry.second;
        // Check if the targetMovieId is in the set of movies that the user has
        // watched
        if (movies.find(targetMovieId) != movies.end()) {
            WhoWatched.push_back(userId);  // Add userId to the result list
        }
    }

    return WhoWatched;  // Return the list of users
}

// Function to calculate the sum of shared movies for all users who watched a
// given movie
std::map<int, int> RecommendEngine::SumOfSharedMovies(
    const std::map<int, std::set<int>>& dataMap, int movieId, int userId) {
    // Get a list of users who watched the target movie (movieId)
    // for example: 1 ,2 ,5 ,8
    std::vector<int> usersWhoWatched = WhoWatchedMovie(dataMap, movieId);

    // Compute the number of shared movies of the target user (userId) with all
    // other users
    // for example for user 2 : user 1 (2 movies), user 3 (1 movie), user 4 (2
    // movies) and so on
    std::map<int, int> sharedMoviesMap = computeSharedMovies(dataMap, userId);

    // Calculate the list of movies watched by the users who watched the target
    // movie
    std::set<int> unionMovies;
    for (int watcherId : usersWhoWatched) {
        // Skip the target user (userId) from the shared movie calculation
        if (watcherId != userId) {
            // Get the set of movies watched by the current user
            const std::set<int>& movies = dataMap.at(watcherId);
            // Insert all movies into the unionMovies set
            unionMovies.insert(movies.begin(), movies.end());
        }
    }

    // Remove the target movie (movieId) from the unionMovies set
    unionMovies.erase(movieId);

    // Initialize a map to store the sum of shared movies for each movie
    std::map<int, int> sumSharedMoviesMap;

    // Iterate through each movie in the union of movies
    for (int curMovie : unionMovies) {
        // Get the list of users who watched the current movie
        std::vector<int> curWatchers = WhoWatchedMovie(dataMap, curMovie);

        // Find the intersection of users who watched the target movie and the
        // current movie
        std::vector<int> intersection;
        std::set_intersection(usersWhoWatched.begin(), usersWhoWatched.end(),
                              curWatchers.begin(), curWatchers.end(),
                              std::back_inserter(intersection));

        // Calculate the total number of shared movies for the current movie
        int totalSharedMovies = 0;
        for (int watcherId : intersection) {
            if (watcherId !=
                userId) {  // Exclude the target user from the total
                totalSharedMovies +=
                    sharedMoviesMap[watcherId];  // Add the number of shared
                                                 // movies
            }
        }

        // Store the total shared movies for the current movie
        sumSharedMoviesMap[curMovie] = totalSharedMovies;
    }

    // Return the map with the sum of shared movies for each movie
    return sumSharedMoviesMap;
}

// function to get recommendations for a user
vector<int> RecommendEngine::getRecommendations(int user, int movie) {
    // Get all users and their watched movies
    map<int, set<int>> allUsers = userService->getAllUsersMap();

    // Calculate the sum of shared movies for the target movie and user
    map<int, int> sumSharedMoviesMap = SumOfSharedMovies(allUsers, movie, user);

    // Sort the movies based on the shared movie count
    vector<pair<int, int>> sortedMovies(sumSharedMoviesMap.begin(),
                                        sumSharedMoviesMap.end());
    sort(sortedMovies.begin(), sortedMovies.end(),
         [](const pair<int, int>& a, const pair<int, int>& b) {
             // First, compare by shared movie count in descending order
             if (a.second == b.second) {
                 // If the shared movie count is the same, compare by movie ID
                 // in ascending order
                 return a.first < b.first;
             }
             // Otherwise, compare by shared movie count in descending order
             return a.second > b.second;
         });

    // Collect the top N movie IDs (up to N movies)
    vector<int> topMovies;
    for (size_t i = 0; i < N && i < sortedMovies.size(); ++i) {
        topMovies.push_back(
            sortedMovies[i]
                .first);  // Add only the movieId (first element of pair)
    }

    return topMovies;  // Return the list of top N movies
}