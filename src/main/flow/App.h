#ifndef APP_H
#define APP_H
#include "../services/IMenu.h"
#include "../Commands/ICommand.h"
#include <map>
#include <string>
#include <vector>
using namespace std;
class App
{
private:
    IMenu *menu;
    std::map<std::string, ICommand *> commands; // Map of commands

public:
    // Constructor
    App(IMenu *menu, std::map<std::string, ICommand *> commands);

    // Method to run the application
    void run();
};

#endif // APP_H
