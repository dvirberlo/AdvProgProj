#!/bin/bash

mkdir src/build-test
cmake -S src/test -B src/build-test
make -C src/build-test
./src/build-test/test.out
