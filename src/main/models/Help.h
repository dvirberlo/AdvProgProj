#pragma once
#ifndef HELP_H
#define HELP_H

#include "ICommand.h"

class Help : public ICommand
{
public:
    void execute() override;
};

#endif
