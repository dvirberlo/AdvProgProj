#include "HelpCommand.h"

#include <iostream>
using namespace std;
void HelpCommand::execute(const vector<string>& args) {
    cout << "add [userid] [movieid1] [movieid2] ..." << endl
         << "recommend [userid] [movieid]" << endl
         << "help" << endl;
}
