package com.example.android_client.repository;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.MovieApi;
import com.example.android_client.models.Movie;
import com.example.android_client.response.ApiResponse;

public class MovieRepository {

    private MovieApi movieApi;

    public MovieRepository(){
        movieApi = new MovieApi();
    }

    public void getMovie(String id, MutableLiveData<ApiResponse<Movie>> movieLiveData){
        movieApi.getMovie(id,movieLiveData);
    }
}
