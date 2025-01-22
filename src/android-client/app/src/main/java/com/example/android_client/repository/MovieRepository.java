package com.example.android_client.repository;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.MovieApi;
import com.example.android_client.models.Movie;
import com.example.android_client.response.ApiResponse;

public class MovieRepository {

    private MovieApi movieApi;

    public MovieRepository(){
        movieApi = new MovieApi();
    }

    public void getMovieById(String id, MutableLiveData<ApiResponse<Movie>> movieLiveData){
        movieApi.getMovieById(id, movieLiveData);
    }
    public void createMovie(Context context, Movie movie, MutableLiveData<ApiResponse<Movie>> movieLiveData){
        movieApi.createMovie(context, movie, movieLiveData);
    }
    public void updateMovie(String id, Movie movie, MutableLiveData<ApiResponse<Movie>> movieLiveData){
        movieApi.updateMovie(id, movie, movieLiveData);
    }
    public void deleteMovie(String id, MutableLiveData<ApiResponse<Movie>> movieLiveData){
        movieApi.deleteMovie(id, movieLiveData);
    }
}
