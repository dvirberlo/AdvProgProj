#include <gtest/gtest.h>

#include "../../main/Users/User.h"

TEST(User, Constructor) {
    int id1 = 1;
    User user1(id1, set<int>());
    EXPECT_EQ(user1.getId(), id1);
    EXPECT_EQ(user1.getMoviesWatched().size(), 0);

    int id2 = 2;
    set<int> movies = {100, 101};
    User user2(id2, set<int>(movies));
    EXPECT_EQ(user2.getId(), id2);
    EXPECT_EQ(user2.getMoviesWatched(), set<int>(movies));
}

TEST(User, EqualOperator) {
    User user1(1, {100, 101});
    User user1copy(1, {100, 101});
    User user1change(1, {100});
    User user2(2, {100, 101});

    EXPECT_EQ(user1 == user1copy, true);
    EXPECT_EQ(user1 == user1change, false);
    EXPECT_EQ(user1 == user2, false);
    EXPECT_EQ(user1copy == user2, false);
    EXPECT_EQ(user1change == user2, false);
}

TEST(User, OrderOperator) {
    User user1(1, {100, 101});
    User user1copy(1, {100, 101});
    User user1change(1, {100});
    User user2(2, {100, 101});

    EXPECT_EQ(user1 < user1copy, false);
    EXPECT_EQ(user1 < user1change, false);
    EXPECT_EQ(user1 < user2, true);
    EXPECT_EQ(user1copy < user2, true);
    EXPECT_EQ(user1change < user2, true);
}
