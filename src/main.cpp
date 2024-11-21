#include <map>
#include <string>

#include "./main/models/AddCommand.h"
#include "./main/models/App.h"
#include "./main/models/CommandParser.h"
#include "./main/models/ConsoleMenu.h"
#include "./main/models/HelpCommand.h"
#include "./main/models/ICommand.h"
#include "./main/models/IMenu.h"
#include "./main/models/RecommendCommand.h"
#include "./main/models/RecommendEngine.h"
#include "./main/services/IUserService.h"
#include "./main/services/PersistentUserService.h"

using namespace std;

// assumes the execution happen inside a build folder inside /src
#define DATA_FILE_PATH "../../data/user_data.txt"

int main() {
    map<string, ICommand *> commands;
    commands["help"] = new HelpCommand();

    IUserService *userService = new PersistentUserService(DATA_FILE_PATH);
    CommandParser commandParser;
    commands["add"] = new AddCommand(*userService, commandParser);

    RecommendEngine recommendEngine(userService);
    commands["recommend"] =
        new RecommendCommand(recommendEngine, commandParser);

    IMenu *menu = new ConsoleMenu(commandParser);

    App app = App(menu, commands);
    app.run();
}
