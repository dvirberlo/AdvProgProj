#include "ICommand.h"
#include "IMenu.h"
#include "App.h"
#include "Help.h"
#include "Help.h"
#include "ConsoleMenu.h"
#include "CommandParser.h"
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
