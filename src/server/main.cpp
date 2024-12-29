#include <map>
#include <memory>
#include <string>
#include <vector>

#include "./main/Commands/CommandParser.h"
#include "./main/Commands/DeleteCommand.h"
#include "./main/Commands/HelpCommand.h"
#include "./main/Commands/ICommand.h"
#include "./main/Commands/PatchCommand.h"
#include "./main/Commands/PostCommand.h"
#include "./main/Commands/RecommendCommand.h"
#include "./main/Executor/Executor.h"
#include "./main/Executor/PoolExecutor.h"
#include "./main/Recommand-Engine/RecommendEngine.h"
#include "./main/Server/Server.h"
#include "./main/Users/IUserService.h"
#include "./main/Users/PersistentUserService.h"

using namespace std;

#define DEFAULT_SERVER_PORT 8080
// assumes the execution happen from the root directory of the project
#define DATA_FILE_PATH "data/user_data.txt"

int getServerPort(int argc, char* argv[]);

int main(int argc, char* argv[]) {
    CommandParser commandParser;
    const int serverPort = getServerPort(argc, argv);

    map<string, ICommand*> commands;
    commands["help"] = new HelpCommand();

    IUserService* userService = new PersistentUserService(DATA_FILE_PATH);
    commands["POST"] = new PostCommand(*userService, commandParser);
    commands["PATCH"] = new PatchCommand(*userService, commandParser);
    commands["DELETE"] = new DeleteCommand(*userService, commandParser);
    RecommendEngine recommendEngine(userService);
    commands["GET"] =
        new RecommendCommand(*userService, commandParser, recommendEngine);

    // Create the server and run it

    unique_ptr<Executor> executor = make_unique<PoolExecutor>();
    Server server = Server(commands, move(executor), serverPort);
    server.run();
}

int getServerPort(int argc, char* argv[]) {
    // defaults to DEFAULT_SERVER_PORT
    if (argc < 2) return DEFAULT_SERVER_PORT;
    try {
        return stoi(argv[1]);
    } catch (...) {
        // defaults to DEFAULT_SERVER_PORT
    }
    return DEFAULT_SERVER_PORT;
}
