package com.example.android_client.viewmodels;
import android.content.Context;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import com.example.android_client.models.User;
import com.example.android_client.repository.UserRepository;
import com.example.android_client.request.LoginRequest;
import com.example.android_client.response.ApiResponse;
import com.example.android_client.response.TokenResponse;

public class UserViewModel extends ViewModel {
    private  UserRepository userRepository;
    // live data of the user info when register
    private MutableLiveData<ApiResponse<User>> registerData;
    // will hold information about the token
    private MutableLiveData<ApiResponse<TokenResponse>> tokenData;

    public UserViewModel(){
        this.userRepository = new UserRepository();
        this.registerData = new MutableLiveData<>();
        this.tokenData = new MutableLiveData<>();
    }
    public MutableLiveData<ApiResponse<User>> getRegisterData(){
        return registerData;
    }
    public void addUser(Context context, User user){
        userRepository.addUser(context, user,registerData);
    }
    public MutableLiveData<ApiResponse<TokenResponse>> getTokenData()
    {
        return this.tokenData;
    }
    public void loginUser(Context context,LoginRequest loginRequest)
    {
        userRepository.loginUser(context,loginRequest,tokenData);
    }

}
