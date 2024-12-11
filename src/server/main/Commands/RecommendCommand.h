#ifndef RECOMMEND_COMMAND_H
#define RECOMMEND_COMMAND_H

#include "../Recommand-Engine/RecommendEngine.h"
#include "CommandParser.h"
#include "ICommand.h"

using namespace std;

class RecommendCommand : public ICommand {
   private:
     IUserService& userService;
    CommandParser& commandParser;

   public:
    RecommendCommand(IUserService& userService,
                     CommandParser& commandParser);
    string execute(const vector<string>& args) override;
};

#endif
