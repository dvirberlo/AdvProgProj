cmake_minimum_required(VERSION 3.14)
project(AdvProgProj)

set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_CXX_STANDARD 14)

file(GLOB_RECURSE SRC_FILES ./*.cpp ./*.h)

add_executable(
  main.out
  ${SRC_FILES}
  ../main.cpp
)
