package com.example.android_client.viewmodels;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import com.example.android_client.models.User;
import com.example.android_client.repository.UserLogInRepository;
import com.example.android_client.response.ApiResponse;

public class UserLogInViewModel extends ViewModel {

    private UserLogInRepository userLogInRepository;
    private MutableLiveData<ApiResponse<User>> userData;
    public UserLogInViewModel() {
        this.userLogInRepository = new UserLogInRepository();
        this.userData = new MutableLiveData<>();
    }
    public MutableLiveData<ApiResponse<User>> getUserData()
    {
        return this.userData;
    }

public void getUser() {
    userLogInRepository.getUser(userData);
}

}
