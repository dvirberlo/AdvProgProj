package com.example.android_client.repository;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.UserLogInApi;
import com.example.android_client.models.User;
import com.example.android_client.response.ApiResponse;
import com.example.android_client.viewmodels.UserLogInViewModel;

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