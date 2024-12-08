#include <gtest/gtest.h>
#include "../../main/Commands/PostCommand.h"
#include "../../main/Users/PersistentUserService.h"
#include "../../main/Commands/CommandParser.h"
#include <iostream>
#include <vector>
#include <string>

using namespace std; 
#define MOCK_FILE_PATH "test_data.txt"  

TEST(PostCommand, addMovies) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    ICommand * command= new PostCommand(userService, commandParser);

    vector<string> args = {"POST", "1", "100", "101"};
    command->execute(args);

    args= {"POST", "1", "102"};
    command->execute(args);

    args= {"POST", "2", "102"};
    command->execute(args);

    map<int, set<int>> expectedUserMap = {
        {1, {100, 101}},
        {2, {102}},
    };
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};

TEST(PostCommand, postOutput) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    ICommand * command= new PostCommand(userService, commandParser);

    vector<string> args = {"POST", "1", "100", "101"};
    string output = command->execute(args);
    string expectedOutput = "201 Created\n";
    EXPECT_EQ(output, expectedOutput);

    args= {"POST", "1", "102"};
    output = command->execute(args);
    expectedOutput = "404 Not Found\n";
    EXPECT_EQ(output, expectedOutput);

    args= {"POST", "2", "102"};
    output = command->execute(args);
    expectedOutput = "201 Created\n";
    EXPECT_EQ(output, expectedOutput);

    args= {"POST", "3"};
    output = command->execute(args);
    expectedOutput = "400 Bad Request\n"; 
    EXPECT_EQ(output, expectedOutput);

    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};