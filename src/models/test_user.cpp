#include <gtest/gtest.h>

#include "user.h"

TEST(User, Constructor) {
    User user(1);
    EXPECT_EQ(user.id, 1);
    EXPECT_EQ(user.moviesWatched.size(), 0);
}