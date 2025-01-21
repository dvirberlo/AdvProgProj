package com.example.android_client.viewmodels;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.android_client.models.User;
import com.example.android_client.repository.UserRepository;
import com.example.android_client.response.ApiResponse;

public class UserViewModel extends ViewModel {
    private  UserRepository userRepository;
    private MutableLiveData<ApiResponse<User>> registerData;

    //private MutableLiveData<ApiResponse<TokenRequest>> tokenData;

    public UserViewModel(){
        this.userRepository = new UserRepository();
        this.registerData = new MutableLiveData<>();
    }
    public MutableLiveData<ApiResponse<User>> getRegisterData(){
return registerData;
    }
    public void addUser(Context context, User user){
        userRepository.addUser(context, user,registerData);
    }

}
