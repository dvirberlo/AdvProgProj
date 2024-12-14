#include "HelpCommand.h"

#include <iostream>

#include "StatusCodeFactory.h"
using namespace std;
string HelpCommand::execute(const vector<string>& args) {
    // if there are more arguments, return 400 message
    if (args.size() > 1) {
        return StatusCodeFactory::getStatusMessage(400);
    }
    string output =
        "DELETE, arguments: [userid] [movieid1] [movieid2] ...\n"
        "GET, arguments: [userid] [movieid]\n"
        "PATCH, arguments: [userid] [movieid1] [movieid2] ...\n"
        "POST, arguments: [userid] [movieid1] [movieid2] ...\n"
        "help\n";
    return output;
}
