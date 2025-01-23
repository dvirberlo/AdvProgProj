package com.example.android_client.api;
import android.content.Context;
import android.net.Uri;
import android.util.Log;
import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.server.SearchServerApi;
import com.example.android_client.api.server.UserServerApi;
import com.example.android_client.entities.FileUtils;
import com.example.android_client.entities.TokenInterceptor;
import com.example.android_client.entities.UserManager;
import com.example.android_client.models.Movie;
import com.example.android_client.models.User;
import com.example.android_client.request.LoginRequest;
import com.example.android_client.response.ApiResponse;
import com.example.android_client.response.MoviesResponse;
import java.io.IOException;
import java.util.List;
import okhttp3.logging.HttpLoggingInterceptor;
import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SearchApi {
    private static final String BASE_URL = "http://10.0.2.2:3000/api/";

    private SearchServerApi  searchServerApi;
    private Retrofit retrofit;
    private TokenInterceptor tokenInterceptor;

    public SearchApi(){
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

        searchServerApi = retrofit.create(SearchServerApi.class);

    }



    public void search(String query, MutableLiveData<ApiResponse<List<Movie>>> liveData) {
        searchServerApi.search(query).enqueue(new Callback<MoviesResponse>() {
            @Override
            public void onResponse(Call<MoviesResponse> call, Response<MoviesResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Movie> movies = response.body().getMovies();
                    liveData.postValue(new ApiResponse<>(movies, "Search successful", true));
                } else {
                    String errorMessage = "Search failed";
                    if (response.errorBody() != null) {
                        try {
                            errorMessage = response.errorBody().string();
                        } catch (IOException e) {
                            e.printStackTrace();
                            errorMessage = "An unexpected error occurred.";
                        }
                    }
                    liveData.postValue(new ApiResponse<>(null, errorMessage, false));
                }
            }

            @Override
            public void onFailure(Call<MoviesResponse> call, Throwable t) {
                liveData.postValue(new ApiResponse<>(null, "Error: " + t.getMessage(), false));
            }
        });
    }
}


