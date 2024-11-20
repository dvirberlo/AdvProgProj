#include <gtest/gtest.h>

#include <cstdio>
#include <iostream>
#include <map>
#include <set>
#include <string>
#include <vector>

#include "../../main/models/user.h"
#include "../../main/services/PersistentUserService.h"

using namespace std;

// assumes the execution happen inside a build folder inside /src
#define MOCK_FILE_PATH "../../data/mock_data.txt"

void fileCleanup() { remove(MOCK_FILE_PATH); }

TEST(PersistentUserService, Constructor) {
    fileCleanup();
    PersistentUserService userService(MOCK_FILE_PATH);

    map<int, set<int>> expectedUserMap;
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);

    vector<User> expectedUserList;
    EXPECT_EQ(userService.getAllUsers(), expectedUserList);
    fileCleanup();
};

TEST(PersistentUserService, MarkAsWatched) {
    fileCleanup();
    PersistentUserService userService(MOCK_FILE_PATH);
    userService.markAsWatched(2, {101, 103});
    userService.markAsWatched(1, {100, 103});
    userService.markAsWatched(3, {100});

    map<int, set<int>> expectedUserMap = {
        {1, {100, 103}},
        {2, {101, 103}},
        {3, {100}},
    };
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);

    vector<User> expectedUserList = {
        {1, {100, 103}},
        {2, {101, 103}},
        {3, {100}},
    };
    EXPECT_EQ(userService.getAllUsers(), expectedUserList);
    fileCleanup();
};

TEST(PersistentUserService, Persistence) {
    fileCleanup();
    PersistentUserService userService1(MOCK_FILE_PATH);
    userService1.markAsWatched(1, {100, 103});

    PersistentUserService userService2(MOCK_FILE_PATH);

    map<int, set<int>> expectedUserMap = {
        {1, {100, 103}},
    };
    EXPECT_EQ(userService2.getAllUsersMap(), expectedUserMap);

    vector<User> expectedUserList = {
        {1, {100, 103}},
    };
    EXPECT_EQ(userService2.getAllUsers(), expectedUserList);
    fileCleanup();
};
