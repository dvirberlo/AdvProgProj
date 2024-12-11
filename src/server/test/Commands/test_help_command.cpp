#include <gtest/gtest.h>
#include "../../main/Commands/HelpCommand.h"


TEST(HelpCommand, helpOutput) {
    HelpCommand helpCommand;
    vector<string> args;
    string output = helpCommand.execute(args);
    string expectedOutput = "DELETE, arguments: [userid] [movieid1] [movieid2] ...\n"
                            "GET, arguments: [userid] [movieid]\n"
                            "PATCH, arguments: [userid] [movieid1] [movieid2] ...\n"
                            "POST, arguments: [userid] [movieid1] [movieid2] ...\n"
                            "help\n";
    EXPECT_EQ(output, expectedOutput);
    // Test the case of more than 1 arguments
    args.push_back("arg1");
    args.push_back("arg2");
    output = helpCommand.execute(args);
    expectedOutput = "400 Bad Request\n"; 
    EXPECT_EQ(output, expectedOutput);
}