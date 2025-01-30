package com.example.android_client.activities;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.text.SpannableStringBuilder;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.example.android_client.R;
import com.example.android_client.models.Movie;

public class MovieDetailsActivity extends AppCompatActivity {

    @SuppressLint("SetTextI18n")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movie_details);

        // Initialize the views
        TextView movieTitleTextView = findViewById(R.id.movie_title);
        TextView movieDescriptionTextView = findViewById(R.id.movie_description);
        TextView movieYearTextView = findViewById(R.id.movie_year);
        ImageView movieImageView = findViewById(R.id.movie_image);
        Button closeButton = findViewById(R.id.close_button);

        // Retrieve the Movie object from the Intent
        Movie movie = (Movie) getIntent().getSerializableExtra("MOVIE_OBJ");

        // Check if the movie is not null before setting the details in the UI
        if (movie != null) {
            // Set title, apply bold style
            movieTitleTextView.setText(styleText("", movie.getName(), true));

            // Set description with "Description:" label, apply bold style to label
            movieDescriptionTextView.setText(styleText("Description: ", movie.getDescription(), true));

            // Set year with "Year:" label, apply bold style to label
            movieYearTextView.setText(styleText("Year: ", String.valueOf(movie.getReleaseYear()), true));

            // Set rating
            setRating(movie.getRating());
            String imagePath = movie.getThumbnailPath();
            Glide.with(this).load("http://10.0.2.2:3000" + imagePath).into(movieImageView);


        }

        // Set click listener for Close button to finish the activity
        closeButton.setOnClickListener(view -> finish());
        Button watchNowButton = findViewById(R.id.watch_now_button);

        watchNowButton.setOnClickListener(view -> {
            Intent intent = new Intent(MovieDetailsActivity.this, MovieWatchActivity.class);
            intent.putExtra("MOVIE_URL", movie.getFilePath());
            intent.putExtra("MOVIE_ID", movie.get_id());
            startActivity(intent);
        });
    }
    private SpannableStringBuilder styleText(String label, String text, boolean isBold) {
        SpannableStringBuilder spannableStringBuilder = new SpannableStringBuilder(label);

        // Apply bold styling to the label if required
        if (isBold) {
            spannableStringBuilder.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD), 0, label.length(), 0);
        }

        // Append the actual text
        spannableStringBuilder.append(text);

        return spannableStringBuilder;
    }

    // Helper method to set the star rating
    private void setRating(int rating) {
        ImageView[] stars = new ImageView[5];
        stars[0] = findViewById(R.id.star1);
        stars[1] = findViewById(R.id.star2);
        stars[2] = findViewById(R.id.star3);
        stars[3] = findViewById(R.id.star4);
        stars[4] = findViewById(R.id.star5);

        // Set the stars based on the rating
        for (int i = 0; i < stars.length; i++) {
            if (i < rating) {
                // Show a filled star
                stars[i].setVisibility(View.VISIBLE);
                stars[i].setImageResource(R.drawable.star);
            } else {
                // Hide the remaining stars
                stars[i].setVisibility(View.INVISIBLE);
            }
        }
    }
}
