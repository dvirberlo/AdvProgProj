#include "./PoolExecutor.h"

#include <atomic>
#include <condition_variable>
#include <memory>
#include <mutex>
#include <queue>
#include <thread>
#include <vector>

#include "./Executor.h"
#include "./Runnable.h"

#define DEFAULT_POOL_SIZE 4

using namespace std;

/**
 * There are alway {poolSize} threads running PoolExecutor::threadLoop.
 * In the loop, the threads wait for new tasks to be added into the task queue.
 * When adding a task, we notify one thread using the condition variable.
 * When joinAll is called, we set stop to true and notify all the threads.
 * In this case, the threads will empty the tasks queue and stop running.
 */

PoolExecutor::PoolExecutor() : PoolExecutor(DEFAULT_POOL_SIZE) {}
PoolExecutor::PoolExecutor(int poolSize) : Executor(), stop(false) {
    // create the specified number of thread
    for (int i = 0; i < poolSize; i++) {
        this->threads.emplace_back([this]() { this->threadLoop(); });
    }
}

void PoolExecutor::execute(shared_ptr<Runnable> runnable) {
    // lock queue and push the new runnable if stop was not set to true
    {
        if (this->stop) return;
        unique_lock<mutex> lock(this->queueMutex);
        this->taskQueue.push(runnable);
    }
    // notify one thread there's a new task
    this->queueCondition.notify_one();
}

void PoolExecutor::joinAll() {
    // lock queue and set stop to true
    {
        unique_lock<mutex> lock(this->queueMutex);
        this->stop = true;
    }
    // notify all threads that stop has changed
    this->queueCondition.notify_all();

    // wait for the threads to finish
    for (auto& t : this->threads) {
        if (t.joinable()) t.join();
    }
}

/**
 * Only the running threads will execute this function.
 */
void PoolExecutor::threadLoop() {
    while (true) {
        shared_ptr<Runnable> task;
        // lock queue and wait for new tasks
        {
            unique_lock<mutex> lock(this->queueMutex);
            this->queueCondition.wait(lock, [this]() {
                // wait until queue is not empty or stop is set to true
                return this->stop || !this->taskQueue.empty();
            });

            // if stop was set to true and queue is empty, exit
            if (this->stop && this->taskQueue.empty()) return;
            // get the new task from queue
            task = this->taskQueue.front();
            this->taskQueue.pop();
        }
        // (unlock queue lock and) run the task
        if (task) task->run();
    }
}
