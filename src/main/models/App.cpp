#include <iostream>
#include "IMenu.cpp"
#include "ICommand.cpp"
#include <map>
#include <string>
using namespace std;
class App
{
private:
    IMenu *menu;
    map<int, ICommand *> commands; // Map of commands

public:
    // constructor
    App(IMenu *menu, map<int, ICommand *> commands)
        : menu(menu), commands(commands) {}
    // The flow of the appliction is controlled by the run method
    void run()
    {
        while (true)
        {
            // key represnt the command number
            int key = menu->nextCommand();
            try
            {
                commands[key]->execute();
            }
            catch (...)
            {
                menu->displayError("Invalid command");
            }
        }
    }
};