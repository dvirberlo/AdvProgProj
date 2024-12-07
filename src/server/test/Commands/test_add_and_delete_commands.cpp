#include <gtest/gtest.h>

#include <cstdio>
#include <fstream>
#include <iostream>
#include <map>
#include <set>
#include <sstream>
#include <string>
#include <vector>
#include "../../main/Commands/CommandParser.h"
#include "../../main/Commands/PostCommand.h"
#include "../../main/Commands/PatchCommand.h"
#include "../../main/Commands/DeleteCommand.h"

#include "../../main/Users/PersistentUserService.h"
#include "../../main/Users/User.h"

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

TEST(PatchCommand, addMovies) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    ICommand * patchCommand= new PatchCommand(userService, commandParser);
    ICommand * postCommand= new PostCommand(userService, commandParser);

    vector<string> args = {"POST", "1", "100", "101"};
    postCommand->execute(args);

    args= {"PATCH", "1", "102"};
    patchCommand->execute(args);

    args= {"PATCH", "2", "102"};
    patchCommand->execute(args);
    map<int, set<int>> expectedUserMap = {
        {1, {100, 101, 102}},
    };

    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};

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
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};
//test add and delete commands together
TEST(AddAndDeleteCommand, addAndDeleteMovies) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    ICommand * addCommand= new PostCommand(userService, commandParser);
    ICommand * deleteCommand= new DeleteCommand(userService, commandParser);
    vector<string> args = {"POST", "1", "100", "101"};
    addCommand->execute(args);
    args = {"DELETE", "1", "100"};
    deleteCommand->execute({args});
    map<int, set<int>> expectedUserMap = {
        {1, {101}},
    };
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};