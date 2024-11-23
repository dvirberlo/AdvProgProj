#!/bin/bash

# create a folder for the build
mkdir src/build-main
# build the project inside the folder, using cmake and make
cmake -S src/main -B src/build-main
make -C src/build-main
# run the compiled executable
./src/build-main/main.out
