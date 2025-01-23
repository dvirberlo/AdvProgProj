package com.example.android_client.api;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.server.CategoryServerApi;
import com.example.android_client.models.Category;
import com.example.android_client.response.ApiResponse;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class CategoryApi {
    private static final String BASE_URL = "http://10.0.2.2:3000/api/";
    private CategoryServerApi categoryServerApi;
    private Retrofit retrofit;

    public CategoryApi(){
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        categoryServerApi = retrofit.create(CategoryServerApi.class);
    }
    
}
