#ifndef USER_H
#define USER_H

#include <set>

using namespace std;

class User {
   public:
    int id;
    set<int> moviesWatched;

    User(int userId);
};

#endif
