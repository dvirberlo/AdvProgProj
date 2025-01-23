package com.example.android_client.repository;
import androidx.lifecycle.MutableLiveData;
import com.example.android_client.api.UserLogInApi;
import com.example.android_client.models.User;
import com.example.android_client.response.ApiResponse;

public class UserLogInRepository {
    private UserLogInApi userLogInApi;

    public UserLogInRepository() {
        userLogInApi = new UserLogInApi();
    }

    public void getUser(MutableLiveData<ApiResponse<User>> userLiveData)
    {
        userLogInApi.getUser(userLiveData);
    }

}