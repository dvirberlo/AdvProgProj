package com.example.android_client.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.android_client.R;
import com.example.android_client.models.Movie;
import com.bumptech.glide.Glide;

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
    // we use View to set our own Movie holder , we want it to look like we define in the xml
    public MovieViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.movie_item, parent, false);
        return new MovieViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MovieViewHolder holder, int position) {
        Movie movie = movies.get(position);
        holder.bind(movie);
    }

    @Override
    public int getItemCount() {
        return movies.size();
    }

    static class MovieViewHolder extends RecyclerView.ViewHolder {

        private ImageView imageViewThumbnail;
        private TextView textViewName;
        private TextView textViewDescription;
        private TextView textViewReleaseYear;
        private TextView textViewRating;

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
            textViewDescription.setText("Description:"+movie.getDescription());
            textViewReleaseYear.setText("Release Year: " + movie.getReleaseYear());
            textViewRating.setText("Rating: " + movie.getRating() + "/5");
            Glide.with(itemView.getContext())
                    .load("http://10.0.2.2:3000" +movie.getThumbnailPath())
                    .placeholder(R.drawable.ic_search)
                    .into(imageViewThumbnail);
        }
    }
}
