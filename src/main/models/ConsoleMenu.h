#pragma once
#ifndef CONSOLEMENU_H
#define CONSOLEMENU_H

#include "IMenu.h"

class ConsoleMenu : public IMenu
{
public:
    std::vector<std::string> nextCommand() override;
    void displayError(const std::string &error) override;
};

#endif // CONSOLEMENU_H
