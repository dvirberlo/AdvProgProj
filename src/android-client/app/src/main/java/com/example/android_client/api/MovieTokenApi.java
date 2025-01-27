package com.example.android_client.api;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.server.MovieServerApi;
import com.example.android_client.api.server.SearchServerApi;
import com.example.android_client.entities.TokenInterceptor;
import com.example.android_client.entities.UserManager;
import com.example.android_client.models.Category;
import com.example.android_client.models.Movie;
import com.example.android_client.response.ApiResponse;

import java.util.List;
import java.util.Map;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MovieTokenApi {
    private static final String BASE_URL = "http://10.0.2.2:3000/api/";

    private MovieServerApi movieServerApi;
    private Retrofit retrofit;
    private TokenInterceptor tokenInterceptor;
    public MovieTokenApi(){
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

        movieServerApi = retrofit.create(MovieServerApi .class);
    }

    public void getMovies(MutableLiveData<ApiResponse<List<Category>>> moviesLiveData){
        Call<List<Category>> call = movieServerApi.getMovies();
        call.enqueue(new Callback<List<Category>>() {
            @Override
            public void onResponse(Call<List<Category>> call, Response<List<Category>> response) {
                if(response.isSuccessful() && response.body() != null){
                    moviesLiveData.postValue(new ApiResponse<>(response.body(), "Movie retrieved successfully", true));
                }else{
                    Log.e("MovieApi", "Error fetching movie. Response code: " + response.code());
                    moviesLiveData.postValue(new ApiResponse<>(null, "Failed to fetch movie", false));
                }
            }

            @Override
            public void onFailure(Call<List<Category>> call, Throwable t) {
                Log.e("MovieApi", "Network error: " + t.getMessage());
                moviesLiveData.postValue(new ApiResponse<>(null, "Network error", false));
            }
        });
    }

}
