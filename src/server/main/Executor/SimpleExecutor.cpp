#include "./SimpleExecutor.h"

#include <memory>
#include <mutex>
#include <thread>
#include <vector>

#include "./Executor.h"
#include "./Runnable.h"

using namespace std;

SimpleExecutor::SimpleExecutor() : Executor() {}

void SimpleExecutor::execute(shared_ptr<Runnable> runnable) {
    // create a new thread and add it to threads list
    this->threads_mutex.lock();
    this->threads.push_back(thread([runnable]() { runnable->run(); }));
    this->threads_mutex.unlock();
}

void SimpleExecutor::joinAll() {
    // loop thought the threads list and join any joinable thread
    this->threads_mutex.lock();
    for (auto& t : this->threads) {
        if (t.joinable()) t.join();
    }
    // clear the threads list
    this->threads.clear();
    this->threads_mutex.unlock();
}
