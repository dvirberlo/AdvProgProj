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
        vector<string> cmdStr = menu->nextCommand();
        if (cmdStr.empty())
        {
            continue;
        }
        // check if exist a entry in the commands map for that input
        auto it = commands.find(cmdStr[0]);

        // Remark : commands.end() mark the end of the map (pass the map range)
        if (it != commands.end())
        {
            commands[cmdStr[0]]->execute(cmdStr); // Execute the command safely
        }
        else
        {
            // do nothing
        }
    }
}
