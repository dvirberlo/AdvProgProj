package com.example.android_client.api;


import android.content.Context;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.server.UserServerApi;
import com.example.android_client.models.User;
import com.example.android_client.entities.FileUtils;
import com.example.android_client.entities.TokenInterceptor;
import com.example.android_client.entities.UserManager;
import com.example.android_client.response.ApiResponse;
//import com.example.android.response.MessageResponse;
//import com.example.android.response.UpdateUserResponse;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserLogInApi {
    private static final String BASE_URL = "http://10.0.2.2:3000/api/";
    private UserServerApi userServerApi;
    private Retrofit retrofit;
    private TokenInterceptor tokenInterceptor;

    public UserLogInApi(){
        String token = UserManager.getInstance().getToken();
        tokenInterceptor = new TokenInterceptor(token);

        HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(loggingInterceptor)
                .addInterceptor(tokenInterceptor)
                .build();

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        userServerApi = retrofit.create(UserServerApi.class);

    }

    public void getUser(MutableLiveData<ApiResponse<User>> userLiveData) {
        String userId = UserManager.getInstance().getUserId();
        Log.e("UserViewModel", userId);
        Log.e("UserViewModel", UserManager.getInstance().getToken());
        userServerApi.getUser(userId).enqueue(new Callback<User>() {
            @Override

            public void onResponse(@NonNull Call<User> call, @NonNull Response<User> response) {
                Log.e("UserViewModel", "1");
                if (response.isSuccessful() && response.body() != null) {
                    userLiveData.postValue(new ApiResponse<>(
                            response.body(),
                            "User details retrieved successfully",
                            true
                    ));
                } else {
                    Log.e("UserViewModel", "Error response code: " + response.code());
                    userLiveData.postValue(new ApiResponse<>(
                            null,
                            "Failed to retrieve user details",
                            false
                    ));
                }
            }

            @Override
            public void onFailure(@NonNull Call<User> call, @NonNull Throwable t) {
                Log.e("UserViewModel", "2");
                userLiveData.postValue(new ApiResponse<>(
                        null,
                        "Error: " + t.getMessage(),
                        false
                ));
            }
        });
    }




    // Utility method to validate password
    private boolean isValidPassword(String password) {
        String specialChars = "[!@#$%^&*(),.?\":{}|<>]";
        if (!password.matches(".*" + specialChars + ".*")) {
            return false;
        }
        return password.length()<=20 &&password.length() >= 8 && password.matches(".*[a-zA-Z]+.*");
    }





}
