package com.example.android_client.api.server;
import com.example.android_client.response.MoviesResponse;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
public interface SearchServerApi {
    @GET("movies/search/{query}")
    Call<MoviesResponse> search(@Path("query") String query);


}