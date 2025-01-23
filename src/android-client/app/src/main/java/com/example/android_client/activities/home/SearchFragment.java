package com.example.android_client.activities.home;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.android_client.adapters.MoviesAdapter;
import com.example.android_client.databinding.FragmentSearchBinding;
import com.example.android_client.models.Movie;
import com.example.android_client.response.ApiResponse;
import com.example.android_client.viewmodels.SearchViewModel;
import java.util.List;

public class SearchFragment extends Fragment {

    private FragmentSearchBinding binding;
    private EditText etSearchBar;
    private Button btnSearch;
    // holds the list of movies we scroll using this one
    private RecyclerView recyclerViewMovies;
    private MoviesAdapter moviesAdapter;
    private SearchViewModel searchViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentSearchBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        init();
        observersInit();
    }

    private void init() {
        etSearchBar = binding.etSearchBar;
        btnSearch = binding.btnSearch;
        recyclerViewMovies = binding.recyclerViewMovies;
        moviesAdapter = new MoviesAdapter();
        recyclerViewMovies.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerViewMovies.setAdapter(moviesAdapter);
        searchViewModel = new ViewModelProvider(this).get(SearchViewModel.class);
        btnSearch.setOnClickListener(v -> {
            String query = etSearchBar.getText().toString().trim();
            if (!query.isEmpty()) {
                searchViewModel.search(query);
                //clears the old data
                recyclerViewMovies.setVisibility(View.GONE);
            } else {
                Toast.makeText(getContext(), "Please enter a search query", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void observersInit(){
        searchViewModel.getMovies().observe(getViewLifecycleOwner(), new Observer<ApiResponse<List<Movie>>>() {
            @Override
            public void onChanged(ApiResponse<List<Movie>> apiResponse) {
                if(apiResponse.isSuccess()){
                    List<Movie> movies = apiResponse.getData();
                    if(movies != null && !movies.isEmpty()){
                        moviesAdapter.setMovies(movies);
                        recyclerViewMovies.setVisibility(View.VISIBLE);
                    } else {
                        recyclerViewMovies.setVisibility(View.GONE);
                        Toast.makeText(getContext(), "No movies found for your search.", Toast.LENGTH_SHORT).show();
                    }
                } else {
                    recyclerViewMovies.setVisibility(View.GONE);
                    Toast.makeText(getContext(), apiResponse.getMessage(), Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}
