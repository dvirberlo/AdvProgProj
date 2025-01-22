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

    public void getCategoryById(String id, MutableLiveData<ApiResponse<Category>> categoryData) {
        Call<Category> call = categoryServerApi.getCategoryById(id);
        call.enqueue(new Callback<Category>() {
            @Override
            public void onResponse(Call<Category> call, Response<Category> response) {
                if(response.isSuccessful()){
                    categoryData.postValue(new ApiResponse<>(response.body(), null, true));
                }else{
                    categoryData.postValue(new ApiResponse<>(null, "Cannot get category", false));
                }
            }

            @Override
            public void onFailure(Call<Category> call, Throwable t) {
                categoryData.postValue(new ApiResponse<>(null, "Cannot get category", false));
            }
        });
    }

    public void createCategory(Category category, MutableLiveData<ApiResponse<Category>> categoryData) {
        Call<Category> call = categoryServerApi.createCategory(category);
        call.enqueue(new Callback<Category>() {
            @Override
            public void onResponse(Call<Category> call, Response<Category> response) {
                if(response.isSuccessful()){
                    categoryData.postValue(new ApiResponse<>(response.body(), "Category created", true));
                }else{
                    categoryData.postValue(new ApiResponse<>(null, "Cannot create category", false));
                }
            }

            @Override
            public void onFailure(Call<Category> call, Throwable t) {
                categoryData.postValue(new ApiResponse<>(null, "Cannot create category", false));
            }
        });
    }

    public void updateCategory(String id, Category category, MutableLiveData<ApiResponse<Category>> categoryData) {
        Call<Void> call = categoryServerApi.updateCategory(id, category);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    categoryData.postValue(new ApiResponse<>(null, "Category updated", true));
                }else{
                    categoryData.postValue(new ApiResponse<>(null, "Cannot update category", false));
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                categoryData.postValue(new ApiResponse<>(null, "Cannot update category", false));
            }
        });
    }

    public void deleteCategory(String id, MutableLiveData<ApiResponse<Category>> categoryData) {
        Call<Void> call = categoryServerApi.deleteCategory(id);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    categoryData.postValue(new ApiResponse<>(null, "Category deleted", true));
                }else{
                    categoryData.postValue(new ApiResponse<>(null, "Cannot delete category", false));
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                categoryData.postValue(new ApiResponse<>(null, "Cannot delete category", false));
            }
        });
    }
}
