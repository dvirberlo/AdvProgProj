package com.example.android_client.models;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

import java.util.List;

@Entity
public class Category {
    @PrimaryKey
    @SerializedName("_id")
    @NonNull
    private String _id;

    @SerializedName("name")
    private String name;

    @SerializedName("promoted")
    private boolean promoted;

    @Ignore
    @SerializedName("movies") // This maps to a JSON field for movies
    private List<Movie> movies; // List of movies in the category

    public Category(String name, boolean promoted) {
        this._id = "";
        this.name = name;
        this.promoted = promoted;
        this.movies = null;
    }
    public Category(String name, boolean promoted, List<Movie> movies) {
        this._id = "";
        this.name = name;
        this.promoted = promoted;
        this.movies = movies;
    }

    @Override
    public String toString() {
        return "Category{" +
                "_id='" + _id + '\'' +
                ", name='" + name + '\'' +
                ", promoted=" + promoted +
                ", movies=" + movies +
                '}';
    }

    @NonNull
    public String get_id() {
        return _id;
    }

    public void set_id(@NonNull String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isPromoted() {
        return promoted;
    }

    public void setPromoted(boolean promoted) {
        this.promoted = promoted;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }
}
