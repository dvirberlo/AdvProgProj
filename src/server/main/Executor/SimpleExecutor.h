#ifndef SIMPLE_EXECUTOR_H
#define SIMPLE_EXECUTOR_H

#include <memory>
#include <mutex>
#include <thread>
#include <vector>

#include "./Executor.h"
#include "./Runnable.h"

using namespace std;

class SimpleExecutor : public Executor {
   private:
    vector<thread> threads;
    mutex threads_mutex;

   public:
    SimpleExecutor();
    void execute(shared_ptr<Runnable> command) override;
    void joinAll() override;
};

#endif
