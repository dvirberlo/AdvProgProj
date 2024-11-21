#include "./main/Commands/ICommand.h"
#include "./main/services/IMenu.h"
#include "./main/flow/App.h"
#include "./main/Commands/Help.h"
#include "./main/services/ConsoleMenu.h"
#include "./main/utilities/CommandParser.h"
#include <string>
#include <map>
using namespace std;
int main()
{
    map<string, ICommand *> commands;
    commands["help"] = new Help();
    IMenu *menu = new ConsoleMenu();
    App app = App(menu, commands);
    app.run();
}
