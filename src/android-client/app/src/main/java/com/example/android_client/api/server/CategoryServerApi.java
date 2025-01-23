package com.example.android_client.api.server;


import com.example.android_client.models.Category;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface CategoryServerApi {
    @GET("categories/{id}")
    Call<Category> getCategoryById(@Path("id") String id);

    @PATCH("categories/{id}")
    Call<Void> updateCategory(@Path("id") String id, Category category);

    @GET("categories")
    Call<List<Category>> getAllCategories();

    @POST("categories")
    Call<Category> createCategory(Category category);
}
