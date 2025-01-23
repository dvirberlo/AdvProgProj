package com.example.android_client.api;

import android.content.Context;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.server.UserServerApi;
import com.example.android_client.entities.FileUtils;
import com.example.android_client.models.User;
import com.example.android_client.response.ApiResponse;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.logging.HttpLoggingInterceptor;
import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserApi {
    private static final String BASE_URL = "http://10.0.2.2:3000/api/";
    private UserServerApi userServerApi;
    private Retrofit retrofit;

    public UserApi(){

        HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(loggingInterceptor)
                .build();

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        userServerApi = retrofit.create(UserServerApi.class);
    }

    public void addUser(Context context, User user, MutableLiveData<ApiResponse<User>> registerLiveData){

        RequestBody firstname = RequestBody.create(MediaType.parse("text/plain"), user.getFirstName());
        RequestBody lastname = RequestBody.create(MediaType.parse("text/plain"), user.getLastName());
        RequestBody username = RequestBody.create(MediaType.parse("text/plain"), user.getUsername());
        RequestBody password = RequestBody.create(MediaType.parse("text/plain"), user.getPassword());


        String profileImgString = user.getImage();
        Uri profileImgUri = Uri.parse(profileImgString);
        File imageFile;
        try {
            imageFile = FileUtils.getFileFromUri(context, profileImgUri);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle error
            return;
        }


        RequestBody filePart = RequestBody.create(MediaType.parse("multipart/form-data"),imageFile);
        MultipartBody.Part profileImg = MultipartBody.Part.createFormData("profileImg", imageFile.getName(), filePart);

        Call<User> call = userServerApi.addUser(firstname,lastname,username,password, profileImg);

        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(@NonNull Call<User> call, @NonNull Response<User> response) {
                if (response.isSuccessful() && response.body() != null) {
                    registerLiveData.postValue(new ApiResponse<>(
                            response.body(), "User registered successfully", true));
                } else {
                    String errorMessage = "Registration failed";
                    if (response.errorBody() != null) {
                        try {
                            // Parse the JSON response to get the error message
                            String errorJson = response.errorBody().string();
                            JSONObject jsonObject = new JSONObject(errorJson);
                            errorMessage = jsonObject.getString("message");
                        } catch (IOException | JSONException e) {
                            Log.e("RegistrationError", "Error parsing error message", e);
                        }
                    }
                    registerLiveData.postValue(new ApiResponse<>(
                            null, errorMessage, false));
                }
            }

            @Override
            public void onFailure(@NonNull Call<User> call, @NonNull Throwable t) {
                registerLiveData.postValue(new ApiResponse<>(
                        null, "Network error: " + t.getMessage(), false));
            }
        });
    }


}
