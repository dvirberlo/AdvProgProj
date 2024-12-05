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
#include "../../main/Commands/AddCommand.h"
#include "../../main/Commands/DeleteCommand.h"

#include "../../main/Users/PersistentUserService.h"
#include "../../main/Users/User.h"

using namespace std;

#define MOCK_FILE_PATH "test_data.txt"

TEST(AddCommand, addMovies) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    ICommand * command= new AddCommand(userService, commandParser);

    vector<string> args = {"add", "1", "100", "101"};
    command->execute(args);
    map<int, set<int>> expectedUserMap = {
        {1, {100, 101}},
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
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};