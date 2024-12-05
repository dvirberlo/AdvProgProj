#ifndef RECOMMEND_COMMAND_H
#define RECOMMEND_COMMAND_H

#include "../Recommand-Engine/RecommendEngine.h"
#include "CommandParser.h"
#include "ICommand.h"

using namespace std;

class RecommendCommand : public ICommand {
   private:
    RecommendEngine& recommendEngine;
    CommandParser& commandParser;

   public:
    RecommendCommand(RecommendEngine& recommendEngine,
                     CommandParser& commandParser);
    void execute(const vector<string>& args) override;
};

#endif
