#ifndef EXECUTOR_H
#define EXECUTOR_H

#include <memory>

#include "./Runnable.h"

using namespace std;

class Executor {
   public:
    /**
     * Executes the specified runnable at some time in the future.
     * The runnable may execute in a new thread, in a pooled thread, or in the
     * calling thread, at the discretion of the Executor implementation.
     */
    virtual void execute(shared_ptr<Runnable> runnable) = 0;
    /**
     * Wait for any running thread to finish.
     * If applicable, signals to any running threads to stop gracefully.
     */
    virtual void joinAll() = 0;
    virtual ~Executor() = default;
};

#endif
