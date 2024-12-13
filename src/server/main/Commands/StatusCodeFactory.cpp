#include "StatusCodeFactory.h"

std::string StatusCodeFactory::getStatusMessage(int statusCode) {
    static const std::unordered_map<int, std::string> statusCodes = {
        {200, "200 OK\n"},
        {201, "201 Created\n"},
        {204, "204 No Content\n"},
        {400, "400 Bad Request\n"},
        {404, "404 Not Found\n"}};

    auto it = statusCodes.find(statusCode);
    if (it != statusCodes.end()) {
        return it->second;
    } else {
        return "Unknown Status\n";
    }
}