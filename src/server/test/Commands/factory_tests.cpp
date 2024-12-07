#include <gtest/gtest.h>
#include "../../main/Commands/StatusCodeFactory.h"

TEST(StatusCodes, getStatusMessage) {
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(200), "200 OK");
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(201), "201 Created");
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(204), "204 No Content");
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(400), "400 Bad Request");
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(404), "404 Not Found");
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(500), "Unknown Status");
}