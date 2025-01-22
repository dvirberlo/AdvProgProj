package com.example.android_client.repository;

import androidx.lifecycle.MutableLiveData;

import com.example.android_client.api.CategoryApi;
import com.example.android_client.models.Category;
import com.example.android_client.response.ApiResponse;

public class CategoryRepository {
    private CategoryApi categoryApi;

    public CategoryRepository() {
        categoryApi = new CategoryApi();
    }

    public void getCategoryById(String id, MutableLiveData<ApiResponse<Category>> categoryData) {
        categoryApi.getCategoryById(id, categoryData);
    }
    public void createCategory(Category category, MutableLiveData<ApiResponse<Category>> categoryData) {
        categoryApi.createCategory(category, categoryData);
    }
    public void updateCategory(String id, Category category, MutableLiveData<ApiResponse<Category>> categoryData) {
        categoryApi.updateCategory(id, category, categoryData);
    }
    public void deleteCategory(String id, MutableLiveData<ApiResponse<Category>> categoryData) {
        categoryApi.deleteCategory(id, categoryData);
    }
}
