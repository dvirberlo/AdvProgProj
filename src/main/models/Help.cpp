#include "Help.h"
#include <iostream>

void Help::execute()
{
    std::cout << "add [userid] [movieid1] [movieid2] ..\nrecommend [userid] [movieid]\nhelp\n";
}
