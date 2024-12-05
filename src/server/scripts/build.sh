#!/bin/bash

# params:
# $1 is the name of the current folder inside ./src/ to build

# create a folder for the build
mkdir src/build-$1
# build the project inside the folder, using cmake and make
cmake -S src/$1 -B src/build-$1
make -C src/build-$1
