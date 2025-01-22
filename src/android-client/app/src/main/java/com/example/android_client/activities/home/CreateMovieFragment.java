package com.example.android_client.activities.home;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.example.android_client.databinding.FragmentCreateMovieBinding;
import com.example.android_client.viewmodels.MovieViewModel;

public class CreateMovieFragment extends Fragment {

    private FragmentCreateMovieBinding binding;
    private MovieViewModel movieViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentCreateMovieBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        movieViewModel = new ViewModelProvider(this).get(MovieViewModel.class);

        movieViewModel.getMovieData().observe(getViewLifecycleOwner(), movie -> {
            Log.d("CreateMovieFragment", "Movie data changed" + movie.getData());
//            binding.movieTitle.setText(movie.getTitle());
//            binding.movieDescription.setText(movie.getDescription());
//            binding.movieRating.setText(movie.getRating());
//            binding.movieReleaseDate.setText(movie.getReleaseDate());
        });
        movieViewModel.getMovie("678ec096ee756629c87a8537");

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}