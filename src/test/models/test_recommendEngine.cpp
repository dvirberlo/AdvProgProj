#include <gtest/gtest.h>
#include <fstream>
#include <set>
#include <vector>
#include <iostream>
#include "../../main/models/User.h"
#include "../../main/services/PersistentUserService.h"
#include "../../main/models/RecommendEngine.h"

using namespace std;
// Test case of no reccomendations
TEST(RecommendationEngineTest, emptyRecommendations){
    const std::string filename = "test_data.txt";
    PersistentUserService *userService;
    RecommendEngine *recommendationEngine;

    // Writing provided user-movie data to the file
    std::ofstream file(filename);
    if (file.is_open())
    {
        file << "1:100,101,102,103,104,110,45,22,\n";
        file.close();
    }
    else
    {
        std::cerr << "Error opening file for writing: " << filename << std::endl;
    }

    // Initialize userService and recommendationEngine
    userService = new PersistentUserService(filename);
    recommendationEngine = new RecommendEngine(userService);

    // Get recommendations for user1 with movie 104
    std::vector<int> recommendations = recommendationEngine->getRecommendations(1, 111);
    // Define the expected list of recommended movies
    std::vector<int> expected = {};
    // Check if the recommendations match the expected output
    EXPECT_EQ(recommendations, expected);
}

// Test simple case of reccomendations
TEST(RecommendationEngineTest, simpleRecommendations){
    const std::string filename = "test_data.txt";
    PersistentUserService *userService;
    RecommendEngine *recommendationEngine;

    // Writing provided user-movie data to the file
    std::ofstream file(filename);
    if (file.is_open())
    {
        file << "1:4,2,5,6\n";
        file << "2:9,8,7,6,\n";
        file << "3:12,11,10,9,8,7,6,5,4,3,2,1,\n";
        file.close();
    }
    else
    {
        std::cerr << "Error opening file for writing: " << filename << std::endl;
    }

    // Initialize userService and recommendationEngine
    userService = new PersistentUserService(filename);
    recommendationEngine = new RecommendEngine(userService);

    // Get recommendations for user1 with movie 104
    std::vector<int> recommendations = recommendationEngine->getRecommendations(1, 6);
    // Define the expected list of recommended movies
    std::vector<int> expected = {7, 8, 9, 1, 3, 10, 11, 12};
    // Check if the recommendations match the expected output
    EXPECT_EQ(recommendations, expected);
    recommendations = recommendationEngine->getRecommendations(1, 2);
    // Define the expected list of recommended movies
    std::vector<int> expected_2 = {1, 3, 7, 8, 9, 10, 11, 12};
    // Check if the recommendations match the expected output
    EXPECT_EQ(recommendations, expected_2);
    recommendations = recommendationEngine->getRecommendations(2, 4);
    // Define the expected list of recommended movies
    std::vector<int> expected_3 = {2, 5, 1, 3, 10, 11, 12};
    // Check if the recommendations match the expected output
    EXPECT_EQ(recommendations, expected_3);
}

// // Test more complex case of reccomendations
TEST(RecommendationEngineTest, complicatedRecommendations){
    const std::string filename = "test_data.txt";
    PersistentUserService *userService;
    RecommendEngine *recommendationEngine;

    // Writing provided user-movie data to the file
    std::ofstream file(filename);
    if (file.is_open())
    {
        file << "1:100,101,102,103,\n";
        file << "2:101,102,104,105,106,\n";
        file << "3:100,104,105,107,108,\n";
        file << "4:101,105,106,107,109,110,\n";
        file << "5,100,102,103,105,108,111,\n";
        file << "6,100,103,104,110,111,112,113,\n";
        file << "7,102,105,106,107,108,109,110,\n";
        file << "8,101,104,105,106,109,111,114,\n";
        file << "9,100,103,105,107,112,113,115,\n";
        file << "10,100,102,105,106,107,109,110,116,\n";
        file << "11,100,101,102,103,\n";
        file.close();
    }
    else
    {
        std::cerr << "Error opening file for writing: " << filename << std::endl;
    }

    // Initialize userService and recommendationEngine
    userService = new PersistentUserService(filename);
    recommendationEngine = new RecommendEngine(userService);

    // Get recommendations for user1 with movie 104
    std::vector<int> recommendations = recommendationEngine->getRecommendations(1, 104);
    // Define the expected list of recommended movies
    std::vector<int> expected_1 = {105, 106, 111, 110, 112, 113, 107, 108, 109, 114};
    // Check if the recommendations match the expected output
    EXPECT_EQ(recommendations, expected_1);
    // Get recommendations for user1 with movie 104
    recommendations = recommendationEngine->getRecommendations(1, 113);
    // Define the expected list of recommended movies
    std::vector<int> expected_2 = {112, 104, 105, 107, 110, 111, 115};
    // Check if the recommendations match the expected output
    EXPECT_EQ(recommendations, expected_2);
    // Get recommendations for user1 with movie 104
    recommendations = recommendationEngine->getRecommendations(1, 115);
    // Define the expected list of recommended movies
    std::vector<int> expected_3 = {105, 107, 112, 113};
    // Check if the recommendations match the expected output
    EXPECT_EQ(recommendations, expected_3);
}