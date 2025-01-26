package com.example.android_client.adapters;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.example.android_client.R;
import com.example.android_client.activities.MovieDetails;
import com.example.android_client.models.Movie;

import java.util.ArrayList;
import java.util.List;

public class MoviesAdapter extends RecyclerView.Adapter<MoviesAdapter.MovieViewHolder> {

    private List<Movie> movies = new ArrayList<>();

    public void setMovies(List<Movie> movieList) {
        this.movies = movieList;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public MovieViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.movie_item, parent, false);
        return new MovieViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MovieViewHolder holder, int position) {
        Movie movie = movies.get(position);
        holder.bind(movie);

        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(holder.itemView.getContext(), MovieDetails.class);

            intent.putExtra("MOVIE_OBJ", movie);

            holder.itemView.getContext().startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return movies.size();
    }

    static class MovieViewHolder extends RecyclerView.ViewHolder {

        private final ImageView imageViewThumbnail;
        private final TextView textViewName;
        private final TextView textViewDescription;
        private final TextView textViewReleaseYear;
        private final TextView textViewRating;

        public MovieViewHolder(@NonNull View itemView) {
            super(itemView);
            imageViewThumbnail = itemView.findViewById(R.id.imageViewThumbnail);
            textViewName = itemView.findViewById(R.id.textViewName);
            textViewDescription = itemView.findViewById(R.id.textViewDescription);
            textViewReleaseYear = itemView.findViewById(R.id.textViewReleaseYear);
            textViewRating = itemView.findViewById(R.id.textViewRating);
        }

        public void bind(Movie movie) {
            textViewName.setText(movie.getName());
            textViewDescription.setText("Description: " + movie.getDescription());
            textViewReleaseYear.setText("Release Year: " + movie.getReleaseYear());
            textViewRating.setText("Rating: " + movie.getRating() + "/5");

            // Load thumbnail image using Glide
            Glide.with(itemView.getContext())
                    .load("http://10.0.2.2:3000" + movie.getThumbnailPath())
                    .placeholder(R.drawable.ic_search)
                    .into(imageViewThumbnail);
        }
    }
}