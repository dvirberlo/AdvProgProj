#include <iostream>
#include <string>
#include "IMenu.cpp"
#include "ICommand.cpp"
#include <map>
#include "CommandParser.cpp"
using namespace std;
class Help : public ICommand
{
public:
    void execute() override
    {
        cout << "add [userid] [movieid1] [movieid2] ..\nrecommend [userid] [movieid]\nhelp\n";
    }
};