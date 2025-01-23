package com.example.android_client.api;
import android.content.Context;
import android.net.Uri;
import android.util.Log;
import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;
import com.example.android_client.api.server.UserServerApi;
import com.example.android_client.entities.FileUtils;
import com.example.android_client.models.User;
import com.example.android_client.request.LoginRequest;
import com.example.android_client.response.ApiResponse;
import com.example.android_client.response.TokenResponse;
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
        MultipartBody.Part profileImg = MultipartBody.Part.createFormData("imageFile", imageFile.getName(), filePart);

        Call<User> call = userServerApi.addUser(firstname,lastname,username,password, profileImg);

        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(@NonNull Call<User> call, @NonNull Response<User> response) {
                Log.d("LoginAPI", "Login success: " + response.body().toString());

                if (response.isSuccessful() && response.body() != null) {
                    Log.d("LoginAPI", "Login success: " + response.body().toString());
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
    public void loginUser(Context context, LoginRequest loginRequest, MutableLiveData<ApiResponse<TokenResponse>> tokenLiveData) {
        userServerApi.login(loginRequest).enqueue(new Callback<TokenResponse>() {
            @Override
            public void onResponse(@NonNull Call<TokenResponse> call, @NonNull Response<TokenResponse> response) {
                // Log the full response
                if (response.isSuccessful()) {
                    System.out.println("Response is successful");
                    System.out.println("Response Body: " + response.body());
                    TokenResponse tokenResponse = response.body();
                    if (tokenResponse != null && tokenResponse.get_id() != null) {
                        System.out.println("User ID (_id) found: " + tokenResponse.get_id());
                        tokenLiveData.postValue(new ApiResponse<>(
                                tokenResponse, "User login successfully", true));
                    } else {
                        System.out.println("User ID (_id) not found");
                        tokenLiveData.postValue(new ApiResponse<>(
                                null, "User not found", false));
                    }
                } else {
                    System.out.println("Response not successful");
                    System.out.println("Error Body: " + response.errorBody());
                    try {
                        System.out.println("Error Body String: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    tokenLiveData.postValue(new ApiResponse<>(
                            null, "Wrong password or username", false));
                }
            }

            @Override
            public void onFailure(@NonNull Call<TokenResponse> call, @NonNull Throwable t) {
                System.out.println("Request failed");
                System.out.println("Error: " + t.getMessage());
                //
                tokenLiveData.postValue(new ApiResponse<>(
                        null, "Error: " + t.getMessage(), false));
            }
        });
    }

}
