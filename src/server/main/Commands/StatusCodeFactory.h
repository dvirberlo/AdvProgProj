#ifndef STATUS_CODE_FACTORY_H
#define STATUS_CODE_FACTORY_H

#include <string>
#include <unordered_map>

class StatusCodeFactory {
   public:
    static std::string getStatusMessage(int code);

   private:
    // Prevent instantiation
    StatusCodeFactory() = delete;
};

#endif