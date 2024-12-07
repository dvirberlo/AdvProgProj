#include <gtest/gtest.h>

#include <chrono>
#include <memory>
#include <thread>

#include "../../main/Executor/Runnable.h"
#include "../../main/Executor/SimpleExecutor.h"

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

TEST(SimpleExecutor, SingleExec) {
    shared_ptr<MockMutexRunnable> runnable = make_shared<MockMutexRunnable>(0);
    SimpleExecutor executor;

    int expectedCount = 0;
    EXPECT_EQ(runnable->count, expectedCount);

    executor.execute(runnable);
    expectedCount++;

    executor.joinAll();
    EXPECT_EQ(runnable->count, expectedCount);
}

TEST(SimpleExecutor, MultiExec) {
    shared_ptr<MockMutexRunnable> runnable = make_shared<MockMutexRunnable>(0);
    SimpleExecutor executor;

    int expectedCount = 0;
    EXPECT_EQ(runnable->count, expectedCount);

    for (int i = 0; i < THREADS_COUNT; i++) {
        executor.execute(runnable);
        expectedCount++;
    }

    executor.joinAll();
    EXPECT_EQ(runnable->count, expectedCount);
}

TEST(SimpleExecutor, MultiSleepExec) {
    shared_ptr<MockMutexRunnable> runnable =
        make_shared<MockMutexRunnable>(THREADS_SLEEP);
    SimpleExecutor executor;

    int expectedCount = 0;
    EXPECT_EQ(runnable->count, expectedCount);

    for (int i = 0; i < THREADS_COUNT; i++) {
        executor.execute(runnable);
        expectedCount++;
    }

    executor.joinAll();
    EXPECT_EQ(runnable->count, expectedCount);
}
