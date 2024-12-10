#include <gtest/gtest.h>
#include "../../main/Commands/StatusCodeFactory.h"

TEST(StatusCodes, getStatusMessage) {
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(200), "200 OK\n");
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(201), "201 Created\n");
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(204), "204 No Content\n");
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(400), "400 Bad Request\n");
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(404), "404 Not Found\n");
    EXPECT_EQ(StatusCodeFactory::getStatusMessage(500), "Unknown Status\n");
}