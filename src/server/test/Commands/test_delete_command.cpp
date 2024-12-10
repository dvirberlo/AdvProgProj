#include <gtest/gtest.h>
#include "../../main/Commands/DeleteCommand.h"
#include "../../main/Users/PersistentUserService.h"
#include "../../main/Commands/CommandParser.h"
#include <iostream>
#include <vector>
#include <string>
#define MOCK_FILE_PATH "test_data.txt"

TEST(DeleteCommand, deleteMovies) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    ICommand * command= new DeleteCommand(userService, commandParser);
    userService.markAsWatched(1, {100, 101});
    command->execute({"DELETE", "1", "100"});
    map<int, set<int>> expectedUserMap = {
        {1, {101}},
    };
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);
    
    vector<string> args= {"DELETE", "1", "105"};
    command->execute({args});
    expectedUserMap = {
        {1, {101}},
    };
    args = {"DELETE", "1", "101"};
    command->execute({args});
    expectedUserMap ={{1, {}}};
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};

TEST(DeleteCommand, deleteOutput) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    ICommand * command= new DeleteCommand(userService, commandParser);
    userService.markAsWatched(1, {100, 101});

    // Test the case of deleting movie from old user
    string output = command->execute({"DELETE", "1", "100"});
    string expectedOutput = "204 No Content\n";
    EXPECT_EQ(output, expectedOutput);

    // Test the case of deleting not existing movie
    output = command->execute({"DELETE", "1","101" "100"});
    expectedOutput = "404 Not Found\n";
    EXPECT_EQ(output, expectedOutput);
    //test that 101 from the last test is still there
    map<int, set<int>> expectedUserMap = {
        {1, {101}},
    };
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);
    
    userService.markAsWatched(1, {100, 101});
    // Test the case of deleting movie from not existing user
    output = command->execute({"DELETE", "2", "100"});
    expectedOutput = "404 Not Found\n";
    EXPECT_EQ(output, expectedOutput);

    //test the case of deleting movie from not int user
    output = command->execute({"DELETE", "a", "100"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    //test the case of deleting non int movie 
    output = command->execute({"DELETE", "1","100","10a"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    //test the case of deleting non int movie from user that not exist
    output = command->execute({"DELETE", "10", "a"});
    expectedOutput = "400 Bad Request\n";

    // Test the case of less than 2 arguments
    output = command->execute({"DELETE", "3"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);
    output = command->execute({"DELETE"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};