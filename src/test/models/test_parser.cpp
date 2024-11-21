#include <gtest/gtest.h>

#include <string>
#include <vector>

#include "../../main/models/CommandParser.h"
using namespace std;

TEST(CommandParser, EmptyInput) {
    CommandParser parser;
    vector<string> expected = {};
    vector<string> actual = parser.parseString("");
    EXPECT_EQ(actual, expected);
}

TEST(CommandParser, helpCheck) {
    CommandParser parser;
    vector<string> expected = {"help"};
    vector<string> actual = parser.parseString("help");
    EXPECT_EQ(actual, expected);
}

TEST(CommandParser, commandParseCheck) {
    CommandParser parser;
    vector<string> expected = {"add", "1", "2", "3", "4"};
    vector<string> actual = parser.parseString("add  1 2   3  4");
    ASSERT_EQ(actual.size(), expected.size())
        << "Vectors are of unequal length";
    for (size_t i = 0; i < actual.size(); ++i) {
        EXPECT_EQ(actual[i], expected[i]) << "Mismatch at index " << i;
    }
}

TEST(CommandParser, anotherCommandParseCheck) {
    CommandParser parser;
    vector<string> expected = {"add", "1", "2", "3", "4"};
    vector<string> actual = parser.parseString("        add     1 2   3 4");
    ASSERT_EQ(actual.size(), expected.size())
        << "Vectors are of unequal length";
    for (size_t i = 0; i < actual.size(); ++i) {
        EXPECT_EQ(actual[i], expected[i]) << "Mismatch at index " << i;
    }
}

TEST(CommandParser, convertToInt) {
    CommandParser parser;
    vector<string> input1 = {"1", "2", "3", "4"};
    vector<int> expected1 = {1, 2, 3, 4};
    EXPECT_EQ(parser.convertToInt(input1), expected1);

    vector<string> input2 = {"-123", " 22", "33 ", "4"};
    vector<int> expected2 = {-123, 22, 33, 4};
    EXPECT_EQ(parser.convertToInt(input2), expected2);

    vector<string> input3 = {"1", "2", "hello", "4"};
    vector<int> expected3 = {};
    EXPECT_EQ(parser.convertToInt(input3), expected3);
}
