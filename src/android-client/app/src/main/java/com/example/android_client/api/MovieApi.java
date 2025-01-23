package com.example.android_client.api;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.server.MovieServerApi;
import com.example.android_client.models.Movie;
import com.example.android_client.response.ApiResponse;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MovieApi {
    private static final String BASE_URL = "http://10.0.2.2:3000/api/";
    private MovieServerApi movieServerApi;
    private Retrofit retrofit;

    public MovieApi(){
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

        movieServerApi = retrofit.create(MovieServerApi.class);
    }

    public void getMovie(String id, MutableLiveData<ApiResponse<Movie>> movieLiveData){
        Call<Movie> call = movieServerApi.getMovieById(id);
        call.enqueue(new Callback<Movie>() {
            @Override
            public void onResponse(Call<Movie> call, Response<Movie> response) {
                if(response.isSuccessful() && response.body() != null){
                    movieLiveData.postValue(new ApiResponse<>(response.body(), "Movie retrieved successfully", true));
                }else{
                    Log.e("MovieApi", "Error fetching movie. Response code: " + response.code());
                    movieLiveData.postValue(new ApiResponse<>(null, "Failed to fetch movie", false));
                }
            }

            @Override
            public void onFailure(Call<Movie> call, Throwable t) {
                Log.e("MovieApi", "Network error: " + t.getMessage());
                movieLiveData.postValue(new ApiResponse<>(null, "Network error", false));
            }
        });
    }
}
