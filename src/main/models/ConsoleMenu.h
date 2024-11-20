#ifndef CONSOLEMENU_H
#define CONSOLEMENU_H
#include "IMenu.h"
class ConsoleMenu : public IMenu
{
public:
    std::vector<std::string> nextCommand() override;
};

#endif // CONSOLEMENU_H
