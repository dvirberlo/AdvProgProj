#include "Help.cpp"
#include <iostream>
#include "IMenu.cpp"
#include "ICommand.cpp"
#include "ConsoleMenu.cpp"
#include <map>
#include <string>
using namespace std;
class App
{
private:
    IMenu *menu;
    map<string, ICommand *> commands; // Map of commands

public:
    // constructor
    App(IMenu *menu, map<string, ICommand *> commands)
        : menu(menu), commands(commands) {}
    // The flow of the appliction is controlled by the run method
    void run()
    {
        while (true)
        {
            // command is represented has a map from string : the command , to vector of args.
            vector<string> cmdStr = menu->nextCommand();
            try
            {
                // the command is in the first
                commands[cmdStr[0]]->execute();
            }
            catch (...)
            {
            }
        }
    }
};
int main()
{
    map<string, ICommand *> commands;
    commands["help"] = new Help();
    IMenu *menu = new ConsoleMenu();
    App app = App(menu, commands);
    app.run();
}