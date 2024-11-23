#!/bin/bash

mkdir src/build-main
cmake -S src/main -B src/build-main
make -C src/build-main
./src/build-main/main.out
