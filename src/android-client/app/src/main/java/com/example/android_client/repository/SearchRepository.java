package com.example.android_client.repository;
import androidx.lifecycle.MutableLiveData;
import com.example.android_client.api.SearchApi;
import com.example.android_client.models.Movie;
import com.example.android_client.response.ApiResponse;

import java.util.List;

public class SearchRepository {
    private SearchApi searchApi;



    public SearchRepository(){
        searchApi = new SearchApi();
    }
    public void search(String query,MutableLiveData<ApiResponse<List<Movie>>>moviesLiveData ){
        searchApi.search(query,moviesLiveData);

    }
}
