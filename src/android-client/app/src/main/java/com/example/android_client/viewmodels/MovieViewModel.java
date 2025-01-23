package com.example.android_client.viewmodels;

import android.app.Application;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.android_client.models.Movie;
import com.example.android_client.repository.MovieRepository;
import com.example.android_client.response.ApiResponse;

public class MovieViewModel extends ViewModel {
    private MovieRepository movieRepository;

    private MutableLiveData<ApiResponse<Movie>> movieData;

    public MovieViewModel(){
        this.movieRepository = new MovieRepository();
        this.movieData = new MutableLiveData<>();
    }

    public MutableLiveData<ApiResponse<Movie>> getMovieData(){
        return movieData;
    }
    public void getMovie(String id){
        movieRepository.getMovie(id,movieData);
    }
}
