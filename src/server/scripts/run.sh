#!/bin/bash

# build ./src/main
./src/server/scripts/build.sh server/main
# run the compiled executable
./src/build-server/main/main.out "$@"
