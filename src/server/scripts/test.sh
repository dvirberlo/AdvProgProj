#!/bin/bash

# build ./src/test
./src/server/scripts/build.sh server/test
# run the compiled executable
./src/build-server/test/test.out
