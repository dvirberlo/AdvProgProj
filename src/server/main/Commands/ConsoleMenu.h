#ifndef CONSOLEMENU_H
#define CONSOLEMENU_H
#include "CommandParser.h"
#include "IMenu.h"
class ConsoleMenu : public IMenu {
   private:
    CommandParser& commandParser;

   public:
    ConsoleMenu(CommandParser& commandParser);
    vector<string> nextCommand() override;
};

#endif  // CONSOLEMENU_H
