#include <gtest/gtest.h>
#include "../../main/Users/PersistentUserService.h"
#include "../../main/Commands/RecommendCommand.h"
#include "../../main/Recommand-Engine/RecommendEngine.h"
#include <iostream>
#include <vector>
#include <string>
using namespace std; 
#define MOCK_FILE_PATH "test_data.txt"   

TEST(RecommendCommand, recommendOutput) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    RecommendEngine recommendEngine(&userService);
    ICommand * command= new RecommendCommand(recommendEngine, commandParser);
    userService.markAsWatched(1, {2,4,5,6});
    userService.markAsWatched(2, {6,7,8,9});
    userService.markAsWatched(3, {1,2,3,4,5,6,7,8,9,10,11,12});
    string output = command->execute({"GET", "1", "6"});
    string expectedOutput = "200 OK\n\n7 8 9 1 3 10 11 12\n";
    EXPECT_EQ(output, expectedOutput);

    output = command->execute({"GET", "1"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    output = command->execute({"GET", "1", "100"});
    expectedOutput = "404 Not Found\n";
    EXPECT_EQ(output, expectedOutput);

    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};