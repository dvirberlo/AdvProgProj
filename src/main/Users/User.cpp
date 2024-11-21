#include "User.h"

#include <set>

using namespace std;

User::User(int userId, set<int> movies) : id(userId), moviesWatched(movies) {}

int User::getId() { return id; }
set<int> User::getMoviesWatched() { return set<int>(moviesWatched); }

bool User::operator==(const User& other) const {
    return other.id == id && other.moviesWatched == moviesWatched;
}

bool User::operator<(const User& other) const { return id < other.id; }
