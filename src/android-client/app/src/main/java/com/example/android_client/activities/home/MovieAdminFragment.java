package com.example.android_client.activities.home;

import static android.app.Activity.RESULT_OK;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.example.android_client.R;
import com.example.android_client.databinding.FragmentMovieAdminBinding;
import com.example.android_client.models.Movie;
import com.example.android_client.viewmodels.MovieViewModel;

import java.util.List;

public class MovieAdminFragment extends Fragment {

    private FragmentMovieAdminBinding binding;
    private MovieViewModel movieViewModel;
    private Uri movieFileUri, thumbnailFileUri;

    private final ActivityResultLauncher<Intent> selectMovieLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                    movieFileUri = result.getData().getData();
                }
            });

    private final ActivityResultLauncher<Intent> selectThumbnailLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                    Uri selectedUri = result.getData().getData();
                    thumbnailFileUri = selectedUri;
                }
            });


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentMovieAdminBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        movieViewModel = new ViewModelProvider(this).get(MovieViewModel.class);

        binding.thumbnailFileButton.setOnClickListener(v -> {
            binding.thumbnailFileButton.setError(null);
            Intent intent = new Intent(Intent.ACTION_PICK);
            intent.setDataAndType(android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
            selectThumbnailLauncher.launch(intent);
        });

        binding.movieFileButton.setOnClickListener(v -> {
            binding.movieFileButton.setError(null);
            Intent intent = new Intent(Intent.ACTION_PICK);
            intent.setDataAndType(android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI, "video/*");
            selectMovieLauncher.launch(intent);
        });

        binding.submitMovieButton.setOnClickListener(v -> {
            if (binding.id.getText().toString().isEmpty())
                this.createMovie();
            else this.updateMovie();
        });

        binding.deleteMovieButton.setOnClickListener(v -> this.deleteMovie());

        movieViewModel.getMovieActionData().observe(getViewLifecycleOwner(), movie -> {
            if (movie != null) {
                binding.id.setText("");
                binding.name.setText("");
                binding.description.setText("");
                binding.releaseYear.setText("");
                binding.rating.setText("");
                binding.length.setText("");
                binding.categories.setText("");
                movieFileUri = null;
                thumbnailFileUri = null;
                Toast.makeText(getContext(), movie.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        return root;
    }

    private Movie getValidatedMovie(){
        String name = binding.name.getText().toString();
        if (name.isEmpty()) {
            binding.name.setError(getString(R.string.required));
            return null;
        }
        String description = binding.description.getText().toString();
        if (description.isEmpty()) {
            binding.description.setError(getString(R.string.required));
            return null;
        }
        if (movieFileUri == null) {
            binding.movieFileButton.setError(getString(R.string.required));
            return null;
        }
        if (thumbnailFileUri == null) {
            binding.thumbnailFileButton.setError(getString(R.string.required));
            return null;
        }
        if (binding.releaseYear.getText().toString().isEmpty()) {
            binding.releaseYear.setError(getString(R.string.required));
            return null;
        }
        int releaseYear = Integer.parseInt(binding.releaseYear.getText().toString());
        if (binding.rating.getText().toString().isEmpty()) {
            binding.rating.setError(getString(R.string.required));
            return null;
        }
        int rating = Integer.parseInt(binding.rating.getText().toString());
        if (binding.length.getText().toString().isEmpty()) {
            binding.length.setError(getString(R.string.required));
            return null;
        }
        int length = Integer.parseInt(binding.length.getText().toString());
        if (binding.categories.getText().toString().isEmpty()) {
            binding.categories.setError(getString(R.string.required));
            return null;
        }
        List<String> categories = List.of(binding.categories.getText().toString().split(","));
        return new Movie(name, description, releaseYear, rating, length, categories, movieFileUri.toString(), thumbnailFileUri.toString());
    }

    private void createMovie() {
        Movie movie = getValidatedMovie();
        if (movie == null) return;
        movieViewModel.createMovie(getContext(), movie);
    }

    private void updateMovie() {
        Movie movie = getValidatedMovie();
        String id = binding.id.getText().toString();
        if (movie == null) return;
        movieViewModel.updateMovie(id, movie);
    }

    private void deleteMovie() {
        String id = binding.id.getText().toString();
        if (id.isEmpty()) {
            binding.id.setError(getString(R.string.required));
            return;
        }
        movieViewModel.deleteMovie(id);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}