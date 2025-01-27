package com.example.android_client.viewmodels;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.android_client.models.Category;
import com.example.android_client.models.Movie;
import com.example.android_client.repository.MovieOnRepository;
import com.example.android_client.repository.RecommendationsRepository;
import com.example.android_client.response.ApiResponse;

import java.util.List;

public class RecommandationsViewModel extends ViewModel {

    private RecommendationsRepository recommendationsRepository;

    private MutableLiveData<ApiResponse<List<Movie>>> moviesLiveData;

    public RecommandationsViewModel(){
        this.recommendationsRepository = new RecommendationsRepository();
        this.moviesLiveData = new MutableLiveData<>();
    }

    public MutableLiveData<ApiResponse<List<Movie>>> getRecommendationsData(){
        return moviesLiveData;
    }
    public void getRecommendations(String movieId){
        recommendationsRepository.getRecommendations(movieId,moviesLiveData);
    }
}
