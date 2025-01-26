package com.example.android_client.activities;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.android_client.R;
import com.example.android_client.adapters.CategoryAdapter;
import com.example.android_client.adapters.MovieAdapter;
import com.example.android_client.viewmodels.MovieOnViewModel;
import com.example.android_client.viewmodels.RecommandationsViewModel;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.MediaItem;
import com.google.android.exoplayer2.ui.PlayerView;

public class MovieWatchActivity extends AppCompatActivity {

    private ExoPlayer exoPlayer;
    private PlayerView exoPlayerView;
    private boolean isFullscreen = false; // Track fullscreen state
    private Button fullscreenButton;
    private RecommandationsViewModel recommandationsViewModel;
    private MovieAdapter movieAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.movie_watch_activity);

        // Initialize Views
        exoPlayerView = findViewById(R.id.exoPlayerView);
        RecyclerView recyclerViewRecommendedMovies = findViewById(R.id.recyclerViewRecommendedMovies);
        fullscreenButton = findViewById(R.id.fullscreenButton);

        // Setup ExoPlayer
        exoPlayer = new ExoPlayer.Builder(this).build();
        exoPlayerView.setPlayer(exoPlayer);

        String movieUrl = "http://10.0.2.2:3000"+getIntent().getStringExtra("MOVIE_URL");
        if (movieUrl != null) {
            MediaItem mediaItem = MediaItem.fromUri(movieUrl);
            exoPlayer.setMediaItem(mediaItem);
            exoPlayer.prepare();
            exoPlayer.play();
        }
        // Setup RecyclerView for recommended movies
        recyclerViewRecommendedMovies.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        String movieID = getIntent().getStringExtra("MOVIE_ID");
        recommandationsViewModel = new ViewModelProvider(this).get(RecommandationsViewModel.class);
        recommandationsViewModel.getRecommendationsData().observe(this,recommends -> {
            if(!recommends.isSuccess()){
                Toast toast = Toast.makeText(MovieWatchActivity.this,
                        recommends.getMessage(), Toast.LENGTH_LONG);
                toast.show();
                return;
            }
            Toast toast = Toast.makeText(MovieWatchActivity.this,
                    recommends.getMessage(), Toast.LENGTH_LONG);
            toast.show();
            movieAdapter = new MovieAdapter(recommends.getData(),this);
            recyclerViewRecommendedMovies.setAdapter(movieAdapter);
        });
        recommandationsViewModel.getRecommendations(movieID);

        // Fullscreen Button Logic
        fullscreenButton.setOnClickListener(view -> toggleFullscreen());
    }

    private void toggleFullscreen() {
        if (isFullscreen) {
            // Exit fullscreen
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            exoPlayerView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE); // Show UI
            isFullscreen = false;
        } else {
            // Enter fullscreen
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            exoPlayerView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION); // Hide UI
            isFullscreen = true;
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (exoPlayer != null) {
            exoPlayer.release(); // Release resources
        }
    }
}
