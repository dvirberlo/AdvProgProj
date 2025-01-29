package com.example.android_client.viewmodels;

import android.app.Application;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.android_client.models.Category;
import com.example.android_client.models.Movie;
import com.example.android_client.repository.MovieOnRepository;
import com.example.android_client.repository.MovieRepository;
import com.example.android_client.response.ApiResponse;

import java.util.List;
import java.util.Map;

public class MovieOnViewModel extends ViewModel {
    private MovieOnRepository movieOnRepository;

    private MutableLiveData<ApiResponse<List<Category>>> moviesLiveData;

    public MovieOnViewModel(){
        this.movieOnRepository = new MovieOnRepository();
        this.moviesLiveData = new MutableLiveData<>();
    }

    public MutableLiveData<ApiResponse<List<Category>>> getMovieData(){
        return moviesLiveData;
    }
    public void getMovies(){
        movieOnRepository.getMovies(moviesLiveData);
    }
}
