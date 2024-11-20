#pragma once
#ifndef IMENU_H
#define IMENU_H

#include <vector>
#include <string>

class IMenu
{
public:
    virtual std::vector<std::string> nextCommand() = 0;
    virtual void displayError(const std::string &error) = 0;
    virtual ~IMenu() {}
};

#endif
