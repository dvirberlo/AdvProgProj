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
    string output = command->execute({"DELETE", "1", "100"});
    string expectedOutput = "204 No Content\n";
    EXPECT_EQ(output, expectedOutput);

    output = command->execute({"DELETE", "1", "100"});
    expectedOutput = "404 Not Found\n";
    EXPECT_EQ(output, expectedOutput);

    output = command->execute({"DELETE", "2"});
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};