#include <gtest/gtest.h>
#include "../../main/Commands/StatusCodeFactory.h"
#include "../../main/Commands/HelpCommand.h"
#include "../../main/Commands/PostCommand.h"
#include "../../main/Commands/DeleteCommand.h"
#include "../../main/Commands/PatchCommand.h"
#include "../../main/Users/PersistentUserService.h"
#include "../../main/Commands/RecommendCommand.h"
#include "../../main/Recommand-Engine/RecommendEngine.h"
#include <iostream>
#include <vector>
#include <string>
using namespace std; 
#define MOCK_FILE_PATH "test_data.txt"   

TEST(HelpCommand, helpOutput) {
    HelpCommand helpCommand;
    vector<string> args;
    string output = helpCommand.execute(args);
    string expectedOutput = "DELETE, arguments: [userid] [movieid1] [movieid2] ...\n"
                            "GET, arguments: [userid] [movieid]\n"
                            "PATCH, arguments: [userid] [movieid1] [movieid2] ...\n"
                            "POST, arguments: [userid] [movieid1] [movieid2] ...\n"
                            "help";
    EXPECT_EQ(output, expectedOutput);
}
#define MOCK_FILE_PATH "test_data.txt"

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

TEST(PatchCommand, patchOutput) {
    remove(MOCK_FILE_PATH); // clean data file before and after every test
    PersistentUserService userService(MOCK_FILE_PATH);
    CommandParser commandParser;
    ICommand * patchCommand= new PatchCommand(userService, commandParser);
    ICommand * postCommand= new PostCommand(userService, commandParser);

    vector<string> args = {"POST", "1", "100", "101"};
    postCommand->execute(args);

    args= {"PATCH", "1", "102"};
    string output = patchCommand->execute(args);
    string expectedOutput = "204 No Content\n";
    EXPECT_EQ(output, expectedOutput);

    args= {"PATCH", "2", "102"};
    output = patchCommand->execute(args);
    expectedOutput = "404 Not Found\n";
    EXPECT_EQ(output, expectedOutput);

    args= {"PATCH", "3"};
    output = patchCommand->execute(args);
    expectedOutput = "400 Bad Request\n";
    EXPECT_EQ(output, expectedOutput);

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