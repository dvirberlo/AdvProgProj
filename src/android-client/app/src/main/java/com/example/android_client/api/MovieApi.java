package com.example.android_client.api;

import android.content.Context;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.server.MovieServerApi;
import com.example.android_client.entities.FileUtils;
import com.example.android_client.models.Movie;
import com.example.android_client.response.ApiResponse;
import com.google.gson.Gson;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

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

    public void getMovieById(String id, MutableLiveData<ApiResponse<Movie>> movieLiveData){
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

    public void createMovie(Context context, Movie movie, MutableLiveData<ApiResponse<Movie>> movieLiveData){
        RequestBody name = RequestBody.create(movie.getName(), okhttp3.MediaType.parse("text/plain"));
        RequestBody description = RequestBody.create(movie.getDescription(), okhttp3.MediaType.parse("text/plain"));
        RequestBody releaseYear = RequestBody.create(String.valueOf(movie.getReleaseYear()), okhttp3.MediaType.parse("text/plain"));
        RequestBody rating = RequestBody.create(String.valueOf(movie.getRating()), okhttp3.MediaType.parse("text/plain"));
        RequestBody length = RequestBody.create(String.valueOf(movie.getLength()), okhttp3.MediaType.parse("text/plain"));
        List<RequestBody> categories = movie.getCategories().stream()
                .map(category -> RequestBody.create(category, MultipartBody.FORM))
                .collect(Collectors.toList());
        RequestBody filePath = RequestBody.create(movie.getFilePath(), okhttp3.MediaType.parse("text/plain"));
        RequestBody thumbnailPath = RequestBody.create(movie.getThumbnailPath(), okhttp3.MediaType.parse("text/plain"));

        File movieFileFile;
        try {
            movieFileFile = FileUtils.getFileFromUri(context, Uri.parse(movie.getFilePath()));
        } catch (IOException e) {
            e.printStackTrace();
            // Handle error
            return;
        }
        RequestBody movieFilePart = RequestBody.create(MediaType.parse("multipart/form-data"), movieFileFile);
        MultipartBody.Part movieFile = MultipartBody.Part.createFormData("movieFile", movieFileFile.getName(), movieFilePart);

        File thumbnailFileFile;
        try {
            thumbnailFileFile = FileUtils.getFileFromUri(context, Uri.parse(movie.getThumbnailPath()));
        } catch (IOException e) {
            e.printStackTrace();
            // Handle error
            return;
        }
        RequestBody thumbnailFilePart = RequestBody.create(MediaType.parse("multipart/form-data"), thumbnailFileFile);
        MultipartBody.Part thumbnailFile = MultipartBody.Part.createFormData("thumbnailFile", thumbnailFileFile.getName(), thumbnailFilePart);


        Call<Movie> call = movieServerApi.createMovie(name, description, releaseYear, rating, length, categories, movieFile, thumbnailFile);
//        Call<Movie> call = movieServerApi.createMovie(movie, movieFile, thumbnailFile);
        call.enqueue(new Callback<Movie>() {
            @Override
            public void onResponse(Call<Movie> call, Response<Movie> response) {
                if(response.isSuccessful()){
                    movieLiveData.postValue(new ApiResponse<>(response.body(), "Movie created successfully", true));
                }else{
                    Log.e("MovieApi", "Error creating movie. Response code: " + response.code());
                    movieLiveData.postValue(new ApiResponse<>(null, "Failed to create movie", false));
                }
            }

            @Override
            public void onFailure(Call<Movie> call, Throwable t) {
                Log.e("MovieApi", "Network error: " + t.getMessage());
                movieLiveData.postValue(new ApiResponse<>(null, "Network error", false));
            }
        });
    }

    public void updateMovie(String id, Movie movie, MutableLiveData<ApiResponse<Movie>> movieLiveData) {
        Call<Void> call = movieServerApi.updateMovie(id, movie);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    movieLiveData.postValue(new ApiResponse<>(null, "Movie updated", true));
                }else{
                    Log.e("MovieApi", "Error updating movie. Response code: " + response.code());
                    movieLiveData.postValue(new ApiResponse<>(null, "Failed to update movie", false));
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.e("MovieApi", "Network error: " + t.getMessage());
                movieLiveData.postValue(new ApiResponse<>(null, "Network error", false));
            }
        });
    }

    public void deleteMovie(String id, MutableLiveData<ApiResponse<Movie>> movieLiveData) {
        Call<Void> call = movieServerApi.deleteMovie(id);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    movieLiveData.postValue(new ApiResponse<>(null, "Movie deleted", true));
                }else{
                    Log.e("MovieApi", "Error deleting movie. Response code: " + response.code());
                    movieLiveData.postValue(new ApiResponse<>(null, "Failed to delete movie", false));
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.e("MovieApi", "Network error: " + t.getMessage());
                movieLiveData.postValue(new ApiResponse<>(null, "Network error", false));
            }
        });
    }
}
