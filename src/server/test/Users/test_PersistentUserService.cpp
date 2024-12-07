#include <gtest/gtest.h>

#include <cstdio>
#include <fstream>
#include <iostream>
#include <map>
#include <set>
#include <sstream>
#include <string>
#include <vector>

#include "../../main/Users/PersistentUserService.h"
#include "../../main/Users/User.h"

using namespace std;

#define MOCK_FILE_PATH "test_data.txt"

TEST(PersistentUserService, Constructor) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);

    map<int, set<int>> expectedUserMap;
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);

    vector<User> expectedUserList;
    EXPECT_EQ(userService.getAllUsers(), expectedUserList);
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};

TEST(PersistentUserService, MarkAsWatched) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
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
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};

TEST(PersistentUserService, MarkAsUnwatched) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    userService.markAsWatched(2, {101, 103});
    userService.markAsWatched(1, {100, 103});
    userService.markAsWatched(3, {100});
    userService.markAsUnwatched(2, {101});

    map<int, set<int>> expectedUserMap = {
        {1, {100, 103}},
        {2, {103}},
        {3, {100}},
    };
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);

    vector<User> expectedUserList = {
        {1, {100, 103}},
        {2, {103}},
        {3, {100}},
    };
    EXPECT_EQ(userService.getAllUsers(), expectedUserList);
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};

TEST(PersistentUserService, Persistence) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
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
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};

TEST(PersistentUserService, Serialization) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    userService.markAsWatched(0, {});
    userService.markAsWatched(1, {100, 101});
    userService.markAsWatched(2, {200});
    userService.markAsWatched(3, {100, 200, 300, 400});

    // read file
    ifstream file(MOCK_FILE_PATH);
    stringstream buffer;
    buffer << file.rdbuf();
    string fileContent = buffer.str();
    EXPECT_EQ(fileContent, "0:\n1:100,101,\n2:200,\n3:100,200,300,400,\n");
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};

TEST(PersistentUserService, Deserialization) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    // write to file
    ofstream file(MOCK_FILE_PATH);
    file << "0:\n1:100,101,\n2:200,\n3:100,200,300,400,\n";
    file.close();

    PersistentUserService userService(MOCK_FILE_PATH);

    map<int, set<int>> expectedUserMap = {
        {0, {}},
        {1, {100, 101}},
        {2, {200}},
        {3, {100, 200, 300, 400}},
    };
    EXPECT_EQ(userService.getAllUsersMap(), expectedUserMap);

    vector<User> expectedUserList = {
        {0, {}},
        {1, {100, 101}},
        {2, {200}},
        {3, {100, 200, 300, 400}},
    };
    EXPECT_EQ(userService.getAllUsers(), expectedUserList);
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};

TEST(PersistentUserService, UserExists) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    userService.markAsWatched(1, {100, 103});

    EXPECT_TRUE(userService.userExists(1));
    EXPECT_FALSE(userService.userExists(2));
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};
TEST(PersistentUserService, MoviesExist) {
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    userService.markAsWatched(1, {100, 103});

    EXPECT_TRUE(userService.moviesExist(1, {100}));
    EXPECT_TRUE(userService.moviesExist(1, {103}));
    EXPECT_FALSE(userService.moviesExist(1, {100, 101}));
    remove(MOCK_FILE_PATH);  // clean data file before and after every test
};