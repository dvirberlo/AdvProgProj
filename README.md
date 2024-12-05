# AdvProgProj

## Run the Project

### Run using Docker (recommended)

You can run the code using Docker:

```bash
docker-compose -f src/docker-compose.yml run --build server-main
```

you can test the app using

```bash
docker-compose -f src/docker-compose.yml run --build server-test
```

### Run locally:

For faster development iteration, you can also run the code directly on your Linux/WSL machine:

First, install CMake (command for Debian based distributions)

```bash
sudo apt-get update
sudo apt-get install cmake
```

From the root directory of the project, you can run our provided scripts

```bash
./src/server/scripts/run.sh # run the app


./src/server/scripts/test.sh # test the app
```

## Short explanation about the program

This program implements a movie recommendation system in C++ using the Command Line Interface (CLI). It allows users to input commands for managing and recommending movies based on user preferences.

The system supports three commands:

add [userid] [movieid1] [movieid2] ...:
This command associates a user with one or more movies they have watched. The data is saved to a file for persistent storage.

recommend [userid] [movieid]:
Given a user ID and a movie ID, the system provides up to 10 recommendations for other movies, based on users with similar tastes (using a similarity algorithm).

help: Displays a list of available commands.

The program loads and saves data to files, ensuring that recommendations remain consistent even after restarting the program. Invalid commands or incorrect input are ignored.

The system runs continuously, processing commands without termination.

## Test example:
![tests_1](https://github.com/user-attachments/assets/8c53c9c8-1ced-4e75-8ed1-86d46d683fb7)

![tests_2](https://github.com/user-attachments/assets/d4110d24-4c5a-4ef2-af71-f68434357548)

## Output example:

![output example ](https://github.com/user-attachments/assets/eb143f57-9d86-44b4-abed-5c679119baa5)
