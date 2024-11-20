#include <gtest/gtest.h>

#include "../../main/models/user.h"

TEST(User, Constructor) {
    User user(1);
    EXPECT_EQ(user.id, 1);
    EXPECT_EQ(user.moviesWatched.size(), 0);
}