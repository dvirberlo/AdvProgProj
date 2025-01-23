package com.example.android_client.response;

import com.example.android_client.models.Movie;
import java.util.List;

public class MoviesResponse {
    private List<Movie> movies;

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }
}
