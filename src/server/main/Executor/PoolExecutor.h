#ifndef POOL_EXECUTOR_H
#define POOL_EXECUTOR_H

#include <atomic>
#include <condition_variable>
#include <memory>
#include <mutex>
#include <queue>
#include <thread>
#include <vector>

#include "./Executor.h"
#include "./Runnable.h"

using namespace std;

class PoolExecutor : public Executor {
   private:
    vector<thread> threads;
    queue<shared_ptr<Runnable>> taskQueue;
    mutex queueMutex;
    condition_variable queueCondition;
    atomic<bool> stop;

    void threadLoop();

   public:
    PoolExecutor();
    PoolExecutor(int poolSize);
    void execute(shared_ptr<Runnable> command) override;
    void joinAll() override;
};

#endif
