# AdvProgProj

## Run the Project

### Run using Docker (recommended)

You can run the code using Docker in the following way:
(replace `8080` with any available port you want)

1. To run the server, execute:

```bash
docker-compose -f src/docker-compose.yml run --build --remove-orphans --service-ports --rm server-main --name server-main server-main 8080
```

2. To run the client, execute:

```bash
docker-compose -f src/docker-compose.yml run --build --remove-orphans --service-ports client-main server-main 8080
```

Note : First run the Server then run the client.

you can test the app using

```bash
docker-compose -f src/docker-compose.yml run --build server-test
```

## Questions:

1. Did the fact that the names of the commands changed required you to touch the code that should be "closed
   to changes but open to expansion"?no, we used a polymorphic commands map, so we could just change the keys of them in our commands map.

2. Did the fact that new commands were added require you to touch the code that should be "closed
   to changes but open to expansion"? No. Using the commands map we have mentioned above, we could just create new commands classes that implements `ICommand` and add them to new entries in our commands map.

3. Did the fact that the command output changed require you to touch the code that should be "closed
   to changes but open to expansion"? No, Since we used polymorphic `ICommand` interface, we could just locally modify the implementation of the commands that needed to be changed, without any bigger API changes.

4. Did the fact that the input and output came from sockets instead of the command line require you to touch the code that should be "closed to changes but open to expansion"? Yes, we had to change the signature of the execute function in the `ICommand` interface so that each function returns a string instead of void. This fix will ensure that all the output that the server produces will be sent directly as a string to the client.

## Short explanation about the program

This program is movie recommendation system, allows clients to interact with a server for movie recommendations and user management. Communication between the client and server is done via sockets, and all commands and responses are formatted with newline characters. The system supports the following commands:

1. **POST [userid] [movieId1] [movieId2] ...**: This command associates a user with one or more movies they have watched. It will create a new user if they don't exist.

2. **PATCH [userid] [movieId1] [movieId2] ...**: This command works similarly to the `POST` command but will only succeed if the user already exists.

3. **DELETE [userid] [movieId1] [movieId2] ...**: This command removes one or more movies from the user's watched list.

4. **GET [userid] [movieId]**: This command provides movie recommendations based on the user’s preferences. It recommends movies based on the user's watched movies and similar users' watches

5. **help**: This command displays a list of available commands and their parameters. Commands that require arguments will have their parameters listed.

**Error Handling**:
Upon successful execution of a command, the server responds with an appropriate status code and message indicating the success of the operation. If a logically incorrect command is received (e.g., trying to add or delete a non-existent user, or requesting recommendations for a user who has no watched movies), the response is:

```
404 Not Found
```

Any incorrectly formatted or unsupported command will result in the response:

```
400 Bad Request
```

**Program Continuity**:

The client and server programs run continuously, and never stop.

## Test example:

//images of tests

## Output example:

//images of output

## Development

### Run the code locally

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

Client: First, run the server as described above. Then, navigate to the root directory folder and execute the following:

```bash
python3 src/client/client.py 127.0.0.1 8080
```

Note: When running locally, ensure that the server is hosted on your own localhost. For now, port 8080 is the designated port for the server to listen on.

### Code Style and Format

Please, always format your files.

We use [Prettier](https://prettier.io/) formatter for any language it supports (currently: .md and .yml files)

We use [Clang Format](https://clang.llvm.org/docs/ClangFormat.html) for our C++ server source code.

#### Install the Formatters

Both formatter have VSCode extensions (see recommendations at [./.vscode/extensions.json](./.vscode/extensions.json)).
But you can also install and run them using CLIs:

```bash
# Prettier:
# install Prettier globally (using npm)
sudo apt-get install nodejs
npm install -g prettier
# check all the files using Prettier
npx prettier . --check
# format all the files using Prettier
npx prettier . --write

# Clang Format:
# install Clang Format
sudo apt-get install clang-format
# check all the files using Clang Format
clang-format --dry-run --Werror $(find . -name "*.cpp" -o -name "*.h")
# format all the files using Clang Format
clang-format -i $(find . -name "*.cpp" -o -name "*.h")
```
