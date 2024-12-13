#include <gtest/gtest.h>

#include <iostream>
#include <string>
#include <vector>

#include "../../main/Commands/RecommendCommand.h"
#include "../../main/Recommand-Engine/RecommendEngine.h"
#include "../../main/Users/PersistentUserService.h"
using namespace std;
#define MOCK_FILE_PATH "test_data.txt"

TEST(RecommendCommand, recommendOutput) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    IUserService *userService = new PersistentUserService(MOCK_FILE_PATH);
    CommandParser commandParser;
    RecommendEngine recommendEngine(userService);
    ICommand *command =
        new RecommendCommand(*userService, commandParser, recommendEngine);
    userService->markAsWatched(1, {2, 4, 5, 6});
    userService->markAsWatched(2, {6, 7, 8, 9});
    userService->markAsWatched(3, {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12});
    string output = command->execute({"GET", "1", "6"});
    string expectedOutput = "200 OK\n\n7 8 9 1 3 10 11 12\n";
    EXPECT_EQ(output, expectedOutput);

    // test the case of user id is not a number
    output = command->execute({"GET", "a", "6"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    // Test the case of movie id is not a number
    output = command->execute({"GET", "1", "6a"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    // Test the case of user that not exists
    output = command->execute({"GET", "1"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    // test the case of number of arguments less than 2
    output = command->execute({"GET"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    output = command->execute({"GET", "1"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    // the case of empty recommendation
    output = command->execute({"GET", "1", "111"});
    expectedOutput = "200 OK\n\n\n";
    EXPECT_EQ(output, expectedOutput);

    // the case of user that not exists
    output = command->execute({"GET", "4", "6"});
    expectedOutput = "404 Not Found\n";
    EXPECT_EQ(output, expectedOutput);

    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};
TEST(RecommendCommand, emptyFileOutput) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    IUserService *userService = new PersistentUserService(MOCK_FILE_PATH);
    CommandParser commandParser;
    RecommendEngine recommendEngine(userService);
    ICommand *command =
        new RecommendCommand(*userService, commandParser, recommendEngine);
    string output = command->execute({"GET", "1", "6"});
    string expectedOutput = "404 Not Found\n";
    EXPECT_EQ(output, expectedOutput);
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
}