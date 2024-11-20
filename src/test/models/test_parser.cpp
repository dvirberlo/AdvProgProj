#include <gtest/gtest.h>
#include "../../main/models/CommandParser.h"
#include <vector>
#include <string>
using namespace std;

TEST(CommandParser, EmptyInput)
{
    CommandParser parser;
    vector<string> expected = {};
    vector<string> actual = parser.parseString("");
    EXPECT_EQ(actual, expected);
}

TEST(CommandParser, helpCheck)
{
    CommandParser parser;
    vector<string> expected = {"help"};
    vector<string> actual = parser.parseString("help");
    EXPECT_EQ(actual, expected);
}

TEST(CommandParser, commandParseCheck)
{
    CommandParser parser;
    vector<string> expected = {"add", "1", "2", "3", "4"};
    vector<string> actual = parser.parseString("add  1 2   3  4");
    ASSERT_EQ(actual.size(), expected.size()) << "Vectors are of unequal length";
    for (size_t i = 0; i < actual.size(); ++i)
    {
        EXPECT_EQ(actual[i], expected[i]) << "Mismatch at index " << i;
    }
}

TEST(CommandParser, anotherCommandParseCheck)
{
    CommandParser parser;
    vector<string> expected = {"add", "1", "2", "3", "4"};
    vector<string> actual = parser.parseString("        add     1 2   3 4");
    ASSERT_EQ(actual.size(), expected.size()) << "Vectors are of unequal length";
    for (size_t i = 0; i < actual.size(); ++i)
    {
        EXPECT_EQ(actual[i], expected[i]) << "Mismatch at index " << i;
    }
}
