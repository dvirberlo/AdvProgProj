#include "PersistentUserService.h"

#include <algorithm>
#include <fstream>
#include <iostream>
#include <map>
#include <set>
#include <sstream>
#include <string>
#include <vector>

#include "User.h"

using namespace std;

void serializeMap(const map<int, set<int>>& map, ostream& outputStream);
map<int, set<int>> deserializeMap(istream& inputStream);

PersistentUserService::PersistentUserService(string path) : IUserService() {
    filepath = path;
    // deserialize userMap from filepath, if exists:
    try {
        ifstream file(filepath);
        if (file && file.good()) {
            userMap = deserializeMap(file);
            file.close();
        }
    } catch (...) {
        cerr << "deserialize user map file failed" << endl;
    }
}

void PersistentUserService::markAsWatched(int userId, set<int> movies) {
    if (userMap.find(userId) == userMap.end()) {
        // userId does not exist in userTable, creates an entry with the movies
        userMap[userId] = set<int>(movies);
    } else {
        // userId exists in userTable, add the movies to users's set
        userMap[userId].insert(movies.begin(), movies.end());
    }
    // serialize userMap and write to filepath:
    try {
        ofstream file(filepath);
        if (!file) throw "could not open file";
        serializeMap(userMap, file);
        file.close();
    } catch (...) {
        cerr << "serialize user map into file failed" << endl;
    }
}

vector<User> PersistentUserService::getAllUsers() {
    // iterate through the userMap and convert it to a list of User objects
    vector<User> users;
    for (auto it = userMap.begin(); it != userMap.end(); ++it) {
        users.push_back(User(it->first, it->second));
    }
    // sort the list (by user id, as defined in User.operator<)
    sort(users.begin(), users.end());
    return users;
}

map<int, set<int>> PersistentUserService::getAllUsersMap() {
    return map<int, set<int>>(userMap);
}

/**
 * map<int, set<int>> serialization is in this format (readable text):
 *  int_key:set_val_1,set_val_2,...,set_val_n,
 * for example:
 *  1:100,102,
 *  2:101,
 *  3:
 * represents 3 users: User(1, {100, 102}), User(2, {101}) and User(3, {})
 */
void serializeMap(const map<int, set<int>>& map, ostream& outputStream) {
    for (const auto& pair : map) {
        int key = pair.first;
        set<int> values = pair.second;
        // write "int_key:"
        outputStream << key << ":";
        for (auto it = values.begin(); it != values.end(); ++it) {
            // write "set_val_i,"
            outputStream << *it << ",";
        }
        outputStream << "\n";
    }
}
map<int, set<int>> deserializeMap(istream& inputStream) {
    map<int, set<int>> map;
    string line;
    // read the stream line by line
    while (getline(inputStream, line)) {
        stringstream lineStream(line);
        int key, val;
        char column;
        set<int> values;
        // read "int_key:" from line
        lineStream >> key >> column;
        // read all "set_val_i," values from line
        while (lineStream >> val) {
            values.insert(val);
            // skip comma separator
            lineStream.ignore();
        }
        map[key] = values;
    }
    return map;
}
