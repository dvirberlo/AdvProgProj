package com.example.android_client.viewmodels;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import com.example.android_client.models.Movie;
import com.example.android_client.repository.SearchRepository;
import com.example.android_client.response.ApiResponse;
import java.util.List;

public class SearchViewModel extends ViewModel {
    private SearchRepository searchRepository;
    private MutableLiveData<ApiResponse<List<Movie>>> moviesLiveData = new MutableLiveData<>();

    public SearchViewModel() {
        searchRepository = new SearchRepository();
    }

    public LiveData<ApiResponse<List<Movie>>> getMovies(){
        return moviesLiveData;
    }

    public void search(String query) {
        searchRepository.search(query, moviesLiveData);
    }
}
