#ifndef PERSISTENTUSERSERVICE_H
#define PERSISTENTUSERSERVICE_H

#include <map>
#include <set>
#include <string>
#include <vector>

#include "IUserService.h"
#include "User.h"

using namespace std;

class PersistentUserService : public IUserService {
   private:
    map<int, set<int>> userMap;
    string filepath;

   public:
    PersistentUserService(string path);
    void markAsWatched(int userId, set<int> movies) override;
    void markAsUnwatched(int userId, set<int> movies) override;
    vector<User> getAllUsers() override;
    map<int, set<int>> getAllUsersMap() override;
};

#endif
