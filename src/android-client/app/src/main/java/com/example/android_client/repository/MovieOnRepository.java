package com.example.android_client.repository;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.MovieApi;
import com.example.android_client.api.MovieTokenApi;
import com.example.android_client.models.Category;
import com.example.android_client.models.Movie;
import com.example.android_client.response.ApiResponse;

import java.util.List;
import java.util.Map;


public class MovieOnRepository {
    private MovieTokenApi movieTokenApi;
    public MovieOnRepository() {
        movieTokenApi = new MovieTokenApi();
    }

    public void getMovies(MutableLiveData<ApiResponse<List<Category>>> moviesLiveData) {
        movieTokenApi.getMovies(moviesLiveData);
    }
}