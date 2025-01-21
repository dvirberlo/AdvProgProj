package com.example.android_client.repository;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.UserApi;
import com.example.android_client.models.User;
import com.example.android_client.request.LoginRequest;
import com.example.android_client.response.ApiResponse;
import com.example.android_client.response.TokenResponse;

public class UserRepository {

    private UserApi userApi;


    public UserRepository() {
        userApi = new UserApi();
    }
    public void addUser(Context context, User user, MutableLiveData<ApiResponse<User>> RegisterLiveData) {
        userApi.addUser(context, user,RegisterLiveData);
    }


    public void loginUser(Context context,LoginRequest loginRequest, MutableLiveData<ApiResponse<TokenResponse>> tokenLiveData)
    {
        userApi.loginUser(context,loginRequest,tokenLiveData);
    }


}