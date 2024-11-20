#ifndef APP_H
#define APP_H

#include "IMenu.h"
#include "ICommand.h"
#include <map>
#include <string>

class App
{
private:
    IMenu *menu;
    std::map<std::string, ICommand *> commands; // Map of commands

public:
    // Constructor
    App(IMenu *menu, std::map<std::string, ICommand *> commands)
        : menu(menu), commands(commands) {}
    // Method to run the application
    void run();
};

#endif // APP_H
