#include "HelpCommand.h"

#include <iostream>
using namespace std;
string HelpCommand::execute(const vector<string>& args) {
    string output = "DELETE, arguments: [userid] [movieid1] [movieid2] ...\n"
                    "GET, arguments: [userid] [movieid]\n"
                    "PATCH, arguments: [userid] [movieid1] [movieid2] ...\n"
                    "POST, arguments: [userid] [movieid1] [movieid2] ...\n"
                    "help";
    // Print the commands
    cout << output << endl;
    return output;
}
