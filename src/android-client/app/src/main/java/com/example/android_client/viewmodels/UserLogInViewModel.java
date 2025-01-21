package com.example.android_client.viewmodels;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.android_client.models.User;
import com.example.android_client.repository.UserLogInRepository;
//import com.example.android_client.repository.UserLogRepository;
import com.example.android_client.response.ApiResponse;
//import com.example.android_client.response.MessageResponse;
//import com.example.android_client.response.UpdateUserResponse;

public class UserLogInViewModel extends ViewModel {

    private UserLogInRepository userLogInRepository;
    private MutableLiveData<ApiResponse<User>> userData;
//    private MutableLiveData<ApiResponse<User>> userInfoData;

    //private MutableLiveData<ApiResponse<UpdateUserResponse>> userUpdateData;

   // private MutableLiveData<ApiResponse<MessageResponse>> userDeleteData;
    public UserLogInViewModel() {
        this.userLogInRepository = new UserLogInRepository();
        this.userData = new MutableLiveData<>();
//        this.userInfoData = new MutableLiveData<>();

    }
    public MutableLiveData<ApiResponse<User>> getUserData()
    {
        return this.userData;
    }
//    public MutableLiveData<ApiResponse<User>> getUserInfoData()
//    {
//        return this.userInfoData;
//    }

public void getUser() {
    userLogInRepository.getUser(userData);
}

}
