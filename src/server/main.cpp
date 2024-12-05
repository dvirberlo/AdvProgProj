#include <map>
#include <string>

#include "./main/App/App.h"
#include "./main/Commands/PostCommand.h"
#include "./main/Commands/PatchCommand.h"
#include "./main/Commands/DeleteCommand.h"
#include "./main/Commands/CommandParser.h"
#include "./main/Commands/ConsoleMenu.h"
#include "./main/Commands/HelpCommand.h"
#include "./main/Commands/ICommand.h"
#include "./main/Commands/IMenu.h"
#include "./main/Commands/RecommendCommand.h"
#include "./main/Recommand-Engine/RecommendEngine.h"
#include "./main/Users/IUserService.h"
#include "./main/Users/PersistentUserService.h"
//#include "./main/Commands/DeleteCommand.h"

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
    RecommendEngine recommendEngine(userService);
    commands["GET"] =
        new RecommendCommand(recommendEngine, commandParser);

    IMenu *menu = new ConsoleMenu(commandParser);

    App app = App(menu, commands);
    app.run();
}

