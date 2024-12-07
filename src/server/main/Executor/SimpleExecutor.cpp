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
    // lock threads list mutex
    lock_guard<std::mutex> lock(this->threads_mutex);
    // create a new thread and add it to threads list
    this->threads.push_back(thread([runnable]() { runnable->run(); }));
}

void SimpleExecutor::joinAll() {
    // lock threads list mutex
    lock_guard<std::mutex> lock(this->threads_mutex);
    // loop thought the threads list and join any joinable thread
    for (auto& t : this->threads) {
        if (t.joinable()) t.join();
    }
    // clear the threads list
    this->threads.clear();
}
