#ifndef CONSOLEMENU_H
#define CONSOLEMENU_H
#include "IMenu.h"
class ConsoleMenu : public IMenu {
   public:
    vector<string> nextCommand() override;
};

#endif  // CONSOLEMENU_H
