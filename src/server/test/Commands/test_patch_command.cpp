#include <gtest/gtest.h>
#include "../../main/Commands/PatchCommand.h"
#include "../../main/Users/PersistentUserService.h"
#include "../../main/Commands/CommandParser.h"
#include <iostream>
#include <vector>
#include <string>
#define MOCK_FILE_PATH "test_data.txt"  

TEST(PatchCommand, addMovies) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    ICommand * patchCommand= new PatchCommand(userService, commandParser);

    userService.markAsWatched(1, {100, 101});

    // Test the case of adding movie to old user
    vector<string> args= {"PATCH", "1", "102"};
    patchCommand->execute(args);
    map<int, set<int>> expectedUserMap = {
        {1, {100, 101, 102}},
    };
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};

TEST(PatchCommand, patchOutput) {
    remove(MOCK_FILE_PATH); // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    ICommand * patchCommand= new PatchCommand(userService, commandParser);
    userService.markAsWatched(1, {100, 101});

    // Test the case of adding movie to old user
    vector<string> args= {"PATCH", "1", "102"};
    string output = patchCommand->execute(args);
    string expectedOutput = "204 No Content\n";
    EXPECT_EQ(output, expectedOutput);

    // Test the case of adding movie to new user
    args= {"PATCH", "2", "102"};
    output = patchCommand->execute(args);
    expectedOutput = "404 Not Found\n";
    EXPECT_EQ(output, expectedOutput);
    
    // Test the case of less than 2 arguments
    args= {"PATCH", "3"};
    output = patchCommand->execute(args);
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);
    args= {"PATCH"};
    output = patchCommand->execute(args);
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    // Test the case userid that not a number
    args= {"PATCH", "a", "102"};
    output = patchCommand->execute(args);
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    // Test the case the one of movie id is not a number
    args= {"PATCH", "1", "a"};
    output = patchCommand->execute(args);
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};