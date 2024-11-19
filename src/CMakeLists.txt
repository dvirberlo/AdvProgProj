cmake_minimum_required(VERSION 3.14)
project(AdvProgProj)

# GoogleTest requires at least C++14
set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
# For Windows: Prevent overriding the parent project's compiler/linker settings
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

enable_testing()

# List of source files:
set(SOURCE_FILES
  models/user.cpp
)
# List of test files:
set(TEST_FILES
  models/test_user.cpp
)

add_executable(
  app.out
  ${SOURCE_FILES}
  main.cpp
)

add_executable(
  test.out
  ${SOURCE_FILES}
  ${TEST_FILES}
  test.cpp
)
target_link_libraries(
  test.out
  GTest::gtest_main
)
