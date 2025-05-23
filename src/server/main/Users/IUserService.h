#ifndef IUSERSERVICE_H
#define IUSERSERVICE_H

#include <map>
#include <set>
#include <vector>

#include "User.h"

using namespace std;

class IUserService {
   public:
    virtual void markAsWatched(int userId, set<int> movies) = 0;
    virtual void markAsUnwatched(int userId, set<int> movies) = 0;
    virtual vector<User> getAllUsers() = 0;
    virtual map<int, set<int>> getAllUsersMap() = 0;
    virtual bool userExists(int userId) = 0;
    virtual bool moviesExist(int userId, set<int> movies) = 0;
};

#endif
