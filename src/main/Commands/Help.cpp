#include "Help.h"
#include <iostream>
using namespace std;
void Help::execute(vector<string> command)
{
    cout << "add [userid] [movieid1] [movieid2] ..\nrecommend [userid] [movieid]\nhelp\n";
}
