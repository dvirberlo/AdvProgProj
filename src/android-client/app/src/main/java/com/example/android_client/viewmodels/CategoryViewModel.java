package com.example.android_client.viewmodels;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.android_client.models.Category;
import com.example.android_client.repository.CategoryRepository;
import com.example.android_client.response.ApiResponse;

public class CategoryViewModel extends ViewModel {
    private CategoryRepository categoryRepository;

    private MutableLiveData<ApiResponse<Category>> categoryData;

    public CategoryViewModel() {
        categoryRepository = new CategoryRepository();
        categoryData = new MutableLiveData<>();
    }

    public MutableLiveData<ApiResponse<Category>> getCategoryData() {
        return categoryData;
    }

    public void getCategoryById(String id) {
        categoryRepository.getCategoryById(id, categoryData);
    }
    public void createCategory(Category category) {
        categoryRepository.createCategory(category, categoryData);
    }
    public void updateCategory(String id, Category category) {
        categoryRepository.updateCategory(id, category, categoryData);
    }
    public void deleteCategory(String id) {
        categoryRepository.deleteCategory(id, categoryData);
    }
}
