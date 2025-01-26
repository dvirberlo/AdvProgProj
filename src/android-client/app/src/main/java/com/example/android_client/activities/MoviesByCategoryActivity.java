package com.example.android_client.activities;

import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.android_client.R;
import com.example.android_client.adapters.CategoryAdapter;
import com.example.android_client.models.Category;
import com.example.android_client.models.Movie;
import com.example.android_client.viewmodels.MovieOnViewModel;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.MediaItem;
import com.google.android.exoplayer2.ui.PlayerView;

import java.util.List;
import java.util.Random;

public class MoviesByCategoryActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private PlayerView exoPlayerView;
    private ExoPlayer exoPlayer;
    private CategoryAdapter categoryAdapter;
    private MovieOnViewModel movieOnViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movies_by_category);

        // Initialize Views
        recyclerView = findViewById(R.id.recyclerViewCategories);
        exoPlayerView = findViewById(R.id.exoPlayerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Initialize ExoPlayer
        exoPlayer = new ExoPlayer.Builder(this).build();
        exoPlayerView.setPlayer(exoPlayer);

        // Fetch and display data
        movieOnViewModel = new ViewModelProvider(this).get(MovieOnViewModel.class);
        movieOnViewModel.getMovieData().observe(this, movies -> {
            if (!movies.isSuccess()) {
                Toast.makeText(this, movies.getMessage(), Toast.LENGTH_LONG).show();
                return;
            }

            // Set up the category adapter
            categoryAdapter = new CategoryAdapter(movies.getData(), this);
            recyclerView.setAdapter(categoryAdapter);

            // Randomize and display a movie in the ExoPlayer
            randomizeAndPlayMovie(movies.getData());
        });

        // Trigger movie data fetching
        movieOnViewModel.getMovies();
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
    protected void onDestroy() {
        super.onDestroy();
        if (exoPlayer != null) {
            exoPlayer.release();
        }
    }
}
