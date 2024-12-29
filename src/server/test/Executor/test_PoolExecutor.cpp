#include <gtest/gtest.h>

#include <chrono>
#include <iostream>
#include <memory>
#include <thread>

#include "../../main/Executor/PoolExecutor.h"
#include "../../main/Executor/Runnable.h"

/**
 * A simple class that implements Runnable, to use in tests.
 * Sleep for the specified time and increase a global counter.
 */
class MockMutexRunnable : public Runnable {
   private:
    mutex lock;

   public:
    int count = 0;
    int sleep;
    MockMutexRunnable(int sleep) : sleep(sleep) {}

    void run() override {
        // sleep
        if (sleep > 0) this_thread::sleep_for(chrono::milliseconds(sleep));
        // increase count by one
        this->lock.lock();
        this->count++;
        this->lock.unlock();
    }
};

using namespace std;

#define THREADS_COUNT 200
#define THREADS_SLEEP 50

TEST(PoolExecutor, SingleExec) {
    shared_ptr<MockMutexRunnable> runnable = make_shared<MockMutexRunnable>(0);
    PoolExecutor executor;

    int expectedCount = 0;
    EXPECT_EQ(runnable->count, expectedCount);

    executor.execute(runnable);
    expectedCount++;

    executor.joinAll();
    EXPECT_EQ(runnable->count, expectedCount);
}

TEST(PoolExecutor, MultiExec) {
    shared_ptr<MockMutexRunnable> runnable = make_shared<MockMutexRunnable>(0);
    PoolExecutor executor;

    int expectedCount = 0;
    EXPECT_EQ(runnable->count, expectedCount);

    for (int i = 0; i < THREADS_COUNT; i++) {
        executor.execute(runnable);
        expectedCount++;
    }

    executor.joinAll();
    EXPECT_EQ(runnable->count, expectedCount);
}

TEST(PoolExecutor, MultiSleepExec) {
    shared_ptr<MockMutexRunnable> runnable =
        make_shared<MockMutexRunnable>(THREADS_SLEEP);
    PoolExecutor executor;

    int expectedCount = 0;
    EXPECT_EQ(runnable->count, expectedCount);

    for (int i = 0; i < THREADS_COUNT; i++) {
        executor.execute(runnable);
        expectedCount++;
    }

    executor.joinAll();
    EXPECT_EQ(runnable->count, expectedCount);
}
