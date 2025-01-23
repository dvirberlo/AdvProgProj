package com.example.android_client.api.server;
import com.example.android_client.models.User;
import com.example.android_client.request.LoginRequest;
import com.example.android_client.response.TokenResponse;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;
public interface UserServerApi {
    @Multipart
    @POST("users")
    Call<User> addUser(
            @Part("firstName") RequestBody firstName,
            @Part("lastName") RequestBody lastName,
            @Part("username") RequestBody username,
            @Part("password") RequestBody password,
            @Part MultipartBody.Part imageFile
    );
    @POST("tokens")
    Call<TokenResponse> login(
            @Body LoginRequest loginRequest
    );

    @GET("users/{id}")
    Call<User> getUser(@Path("id") String id);

}
