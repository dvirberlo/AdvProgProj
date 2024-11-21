#ifndef USER_H
#define USER_H

#include <set>

using namespace std;

/**
 * Immutable User class
 */
class User {
   private:
    int id;
    set<int> moviesWatched;

   public:
    User(int userId, set<int> movies);
    int getId();
    set<int> getMoviesWatched();

    bool operator==(const User& other) const;

    bool operator<(const User& other) const;
};

#endif
