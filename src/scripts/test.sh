#!/bin/bash

# create a folder for the build
mkdir src/build-test
# build the tests inside the folder, using cmake and make
cmake -S src/test -B src/build-test
make -C src/build-test
# run the compiled executable
./src/build-test/test.out
