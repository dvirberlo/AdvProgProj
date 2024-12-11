#include <map>
#include <memory>
#include <string>

#include "./main/Commands/CommandParser.h"
#include "./main/Commands/ConsoleMenu.h"
#include "./main/Commands/DeleteCommand.h"
#include "./main/Commands/HelpCommand.h"
#include "./main/Commands/ICommand.h"
#include "./main/Commands/IMenu.h"
#include "./main/Commands/PatchCommand.h"
#include "./main/Commands/PostCommand.h"
#include "./main/Commands/RecommendCommand.h"
#include "./main/Executor/Executor.h"
#include "./main/Executor/SimpleExecutor.h"
#include "./main/Server/Server.h"
#include "./main/Users/IUserService.h"
#include "./main/Users/PersistentUserService.h"

#define SERVER_PORT 8080

using namespace std;

// assumes the execution happen from the root directory of the project
#define DATA_FILE_PATH "data/user_data.txt"

int main() {
    map<string, ICommand *> commands;
    commands["help"] = new HelpCommand();

    IUserService *userService = new PersistentUserService(DATA_FILE_PATH);
    CommandParser commandParser;
    commands["POST"] = new PostCommand(*userService, commandParser);
    commands["PATCH"] = new PatchCommand(*userService, commandParser);
    commands["DELETE"] = new DeleteCommand(*userService, commandParser);
    commands["GET"] = new RecommendCommand(*userService, commandParser);

    IMenu *menu = new ConsoleMenu(commandParser);
    // Create the server and run it

    unique_ptr<Executor> executor = make_unique<SimpleExecutor>();
    Server server = Server(menu, commands, move(executor), SERVER_PORT);
    server.run();
}
