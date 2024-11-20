cmake_minimum_required(VERSION 3.14)
project(AdvProgProj)

file(GLOB_RECURSE SRC_FILES ./*.cpp ./*.h)

add_executable(
  main.out
  ${SRC_FILES}
  ../main.cpp
)
