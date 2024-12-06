#include <gtest/gtest.h>

#include "../../main/Executor/Runnable.h"

using namespace std;

class MockRunnable : public Runnable {
   public:
    int runCount = 0;
    MockRunnable() {}

    void run() override { this->runCount++; }
};

TEST(Runnable, BasicRun) {
    MockRunnable runnable;
    int expectedCount = 0;
    EXPECT_EQ(runnable.runCount, expectedCount);
    runnable.run();
    expectedCount++;
    EXPECT_EQ(runnable.runCount, expectedCount);
    runnable.run();
    expectedCount++;
    runnable.run();
    expectedCount++;
    EXPECT_EQ(runnable.runCount, expectedCount);
}
