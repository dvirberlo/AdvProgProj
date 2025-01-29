package com.example.android_client.repository;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.MovieApi;
import com.example.android_client.api.MovieTokenApi;
import com.example.android_client.api.RecommendationsApi;
import com.example.android_client.models.Category;
import com.example.android_client.models.Movie;
import com.example.android_client.response.ApiResponse;

import java.util.List;
import java.util.Map;


public class RecommendationsRepository {
    private RecommendationsApi recommendationsApi;
    public RecommendationsRepository() {
        recommendationsApi = new RecommendationsApi();
    }

    public void getRecommendations(String movieId,MutableLiveData<ApiResponse<List<Movie>>> moviesLiveData) {
        recommendationsApi.getRecommendations(movieId,moviesLiveData);
    }
}