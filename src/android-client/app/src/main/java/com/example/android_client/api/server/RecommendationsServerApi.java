package com.example.android_client.api.server;

import com.example.android_client.models.Movie;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface RecommendationsServerApi {

    @GET("movies/{id}/recommend")
    Call<List<Movie>> getRecommendations(@Path("id") String movieId);
}
