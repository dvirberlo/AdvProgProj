#include "App.h"
#include <iostream>
#include <vector>
#include <string>
using namespace std;

App::App(IMenu *menu, map<string, ICommand *> commands)
    : menu(menu), commands(commands) {}

void App::run()
{
    while (true)
    {
        // Command is represented as a vector of strings.
        vector<string> cmdStr = menu->nextCommand();
        try
        {
            // The command is in the first element.
            commands[cmdStr[0]]->execute(cmdStr);
        }
        catch (...)
        {
        }
    }
}
