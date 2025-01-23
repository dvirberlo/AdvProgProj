package com.example.android_client.viewmodels;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.android_client.models.Movie;
import com.example.android_client.repository.MovieRepository;
import com.example.android_client.response.ApiResponse;

public class MovieViewModel extends ViewModel {
    private MovieRepository movieRepository;

    private MutableLiveData<ApiResponse<Movie>> movieData;
    private MutableLiveData<ApiResponse<Movie>> movieActionData;

    public MovieViewModel(){
        this.movieRepository = new MovieRepository();
        this.movieData = new MutableLiveData<>();
        this.movieActionData = new MutableLiveData<>();
    }

    public MutableLiveData<ApiResponse<Movie>> getMovieData(){
        return movieData;
    }
    public MutableLiveData<ApiResponse<Movie>> getMovieActionData(){
        return movieActionData;
    }
    public void getMovieById(String id){
        movieRepository.getMovieById(id, movieData);
    }
    public void createMovie(Context context, Movie movie){
        movieRepository.createMovie(context, movie, movieActionData);
    }
    public void updateMovie(String id, Movie movie){
        movieRepository.updateMovie(id, movie, movieActionData);
    }
    public void deleteMovie(String id){
        movieRepository.deleteMovie(id, movieActionData);
    }
}
