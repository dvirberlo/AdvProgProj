package com.example.android_client.activities.home;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.android_client.R;
import com.example.android_client.adapters.CategoryAdapter;
import com.example.android_client.databinding.FragmentHomeBinding;
import com.example.android_client.entities.UserManager;
import com.example.android_client.models.Category;
import com.example.android_client.models.Movie;
import com.example.android_client.models.User;
import com.example.android_client.viewmodels.MovieOnViewModel;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.MediaItem;
import com.google.android.exoplayer2.ui.PlayerView;

import java.util.List;
import java.util.Random;

public class HomeFragment extends Fragment {

    private RecyclerView recyclerView;
    private PlayerView exoPlayerView;
    private ExoPlayer exoPlayer;
    private CategoryAdapter categoryAdapter;
    private MovieOnViewModel movieOnViewModel;

    private FragmentHomeBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentHomeBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        setupUserProfile();

        // Initialize Views
        recyclerView = binding.recyclerViewCategories;
        exoPlayerView = binding.exoPlayerView;
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        // Initialize ExoPlayer
        exoPlayer = new ExoPlayer.Builder(getContext()).build();
        exoPlayerView.setPlayer(exoPlayer);

        // Fetch and display data
        movieOnViewModel = new ViewModelProvider(this).get(MovieOnViewModel.class);
        movieOnViewModel.getMovieData().observe(getViewLifecycleOwner(), movies -> {
            if (!movies.isSuccess()) {
                Toast.makeText(getContext(), movies.getMessage(), Toast.LENGTH_LONG).show();
                return;
            }

            // Set up the category adapter
            categoryAdapter = new CategoryAdapter(movies.getData(), getContext());
            recyclerView.setAdapter(categoryAdapter);

            // Randomize and display a movie in the ExoPlayer
            randomizeAndPlayMovie(movies.getData());
        });

        // Trigger movie data fetching
        movieOnViewModel.getMovies();

        return root;
    }

    private void randomizeAndPlayMovie(List<Category> categories) {
        if (categories == null || categories.isEmpty()) return;

        // Randomize a category
        Random random = new Random();
        Category randomCategory = categories.get(random.nextInt(categories.size()));

        if (randomCategory.getMovies() == null || randomCategory.getMovies().isEmpty()) return;

        // Randomize a movie from the selected category
        Movie randomMovie = randomCategory.getMovies().get(random.nextInt(randomCategory.getMovies().size()));

        // Play the randomized movie
        playMovie("http://10.0.2.2:3000"+randomMovie.getFilePath());
    }

    private void playMovie(String videoUrl) {
        if (videoUrl == null || videoUrl.isEmpty()) return;

        MediaItem mediaItem = MediaItem.fromUri(videoUrl);
        exoPlayer.setMediaItem(mediaItem);
        exoPlayer.prepare();
        exoPlayer.play();
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
        if (exoPlayer != null) {
            exoPlayer.release();
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (exoPlayer != null) {
            exoPlayer.release();
        }
    }
    private void setupUserProfile() {
        // Get user from UserManager
        User user = UserManager.getInstance().getUser();

        if (user != null) {
            // Set user name
            binding.userNameText.setText(user.getUsername());
            String imagePath = user.getImage();

            Glide.with(this).load("http://10.0.2.2:3000" + imagePath).into(binding.userProfileImage);

        }
    }
}