#include "HelpCommand.h"

#include <iostream>
using namespace std;
void HelpCommand::execute(const vector<string>& args) {
    vector <string> output={"DELETE, arguments: [userid] [movieid1] [movieid2] ...",
                            "GET, arguments: [userid] [movieid]",
                            "PATCH, arguments: [userid] [movieid1] [movieid2] ...",
                            "POST, arguments: [userid] [movieid1] [movieid2] ...",
                            "help"};
    // Print the commands
    for (auto i : output) {
        cout << i << endl;
    }
}
