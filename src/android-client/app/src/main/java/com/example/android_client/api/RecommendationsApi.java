package com.example.android_client.api;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.server.MovieServerApi;
import com.example.android_client.api.server.RecommendationsServerApi;
import com.example.android_client.entities.TokenInterceptor;
import com.example.android_client.entities.UserManager;
import com.example.android_client.models.Category;
import com.example.android_client.models.Movie;
import com.example.android_client.response.ApiResponse;

import java.util.List;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RecommendationsApi {
    private static final String BASE_URL = "http://10.0.2.2:3000/api/";

    private RecommendationsServerApi recommendationsServerApi;
    private Retrofit retrofit;
    private TokenInterceptor tokenInterceptor;
    public RecommendationsApi() {
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

        recommendationsServerApi = retrofit.create(RecommendationsServerApi.class);
    }

    public void getRecommendations(String MovieId,MutableLiveData<ApiResponse<List<Movie>>> moviesLiveData){
        Call<List<Movie>> call = recommendationsServerApi.getRecommendations(MovieId);
        call.enqueue(new Callback<List<Movie>>() {
            @Override
            public void onResponse(Call<List<Movie>> call, Response<List<Movie>> response) {
                if(response.isSuccessful() && response.body() != null){
                    moviesLiveData.postValue(new ApiResponse<>(response.body(), "Recommendations retrieved successfully", true));
                }else{
                    Log.e("MovieApi", "Error fetching recommendations. Response code: " + response.code());
                    moviesLiveData.postValue(new ApiResponse<>(null, "Failed to fetch movie", false));
                }
            }

            @Override
            public void onFailure(Call<List<Movie>> call, Throwable t) {
                Log.e("MovieApi", "Network error: " + t.getMessage());
                moviesLiveData.postValue(new ApiResponse<>(null, "Network error", false));
            }
        });
    }
}
