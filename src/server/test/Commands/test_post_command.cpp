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

    // Test the case of adding new user
    vector<string> args = {"POST", "1", "100", "101"};
    string output = command->execute(args);
    string expectedOutput = "201 Created\n";
    EXPECT_EQ(output, expectedOutput);

    // Test the case of user that already exists
    args= {"POST", "1", "102"};
    output = command->execute(args);
    expectedOutput = "404 Not Found\n";
    EXPECT_EQ(output, expectedOutput);

    //test the case of add old movie to another user
    args= {"POST", "2", "100"};
    output = command->execute(args);
    expectedOutput = "201 Created\n";
    EXPECT_EQ(output, expectedOutput);

    // Test the cases of less than 2 arguments
    args= {"POST", "3"};
    output = command->execute(args);
    expectedOutput = "400 Bad Request\n"; 
    EXPECT_EQ(output, expectedOutput);

    args= {"POST"};
    output = command->execute(args);
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    // Test the case of user that is not an integer
    args= {"POST", "a", "100"};
    output = command->execute(args);  
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    //test the case that one the movies is not an integer
    args= {"POST", "1", "102", "a"};
    output = command->execute(args);
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    //test the case of adding movie that is not int but start with int
    args= {"POST", "1", "102a"};
    output = command->execute(args);
    expectedOutput = "400 Bad Request\n";

    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};