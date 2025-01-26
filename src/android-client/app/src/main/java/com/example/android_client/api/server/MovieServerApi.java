package com.example.android_client.api.server;

import com.example.android_client.models.Category;
import com.example.android_client.models.Movie;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface MovieServerApi {
    @GET("movies/{id}")
    Call<Movie> getMovieById(@Path("id") String id);

    @PATCH("movies/{id}")
    Call<Void> updateMovie(@Path("id") String id, Movie movie);

    @DELETE("movies/{id}")
    Call<Void> deleteMovie(@Path("id") String id);

    @GET("movies")
    Call<List<Category>> getMovies();
    @Multipart
    @POST("movies")
    Call<Movie> createMovie(
            @Part("name") RequestBody name,
            @Part("description") RequestBody description,
            @Part("releaseYear") RequestBody releaseYear,
            @Part("rating") RequestBody rating,
            @Part("length") RequestBody length,
            @Part("categories") List<RequestBody> categories,
            @Part MultipartBody.Part movieFile,
            @Part MultipartBody.Part thumbnailFile
    );


}
