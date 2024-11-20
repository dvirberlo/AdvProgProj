#include "./main/models/ICommand.h"
#include "./main/models/IMenu.h"
#include "./main/models/App.h"
#include "./main/models/Help.h"
#include "./main/models/ConsoleMenu.h"
#include "./main/models/CommandParser.h"
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
