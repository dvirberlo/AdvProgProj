package com.example.android_client.models;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import com.example.android_client.dao.ConvertersDB;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

@Entity
@TypeConverters(ConvertersDB.class)
public class Movie implements Serializable {
    @PrimaryKey
    @SerializedName("_id")
    @NonNull
    private String _id;
    @SerializedName("name")
    private String name;
    @SerializedName("description")
    private String description;
    @SerializedName("releaseYear")
    private int releaseYear;
    @SerializedName("rating")
    private int rating;
    @SerializedName("length")
    private int length;
    @SerializedName("categories")
    private List<String> categories;
    @SerializedName("filePath")
    private String filePath;
    @SerializedName("thumbnailPath")
    private String thumbnailPath;

    public Movie(String name, String description, int releaseYear, int rating, int length, List<String> categories, String filePath, String thumbnailPath) {
        this._id = "";
        this.name = name;
        this.description = description;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.length = length;
        this.categories = categories;
        this.filePath = filePath;
        this.thumbnailPath = thumbnailPath;
    }

    @NonNull
    @Override
    public String toString() {
        return "Movie{" +
                "_id='" + _id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", releaseYear=" + releaseYear +
                ", rating=" + rating +
                ", length=" + length +
                ", categories=" + categories +
                ", filePath='" + filePath + '\'' +
                ", thumbnailPath='" + thumbnailPath + '\'' +
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getThumbnailPath() {
        return thumbnailPath;
    }

    public void setThumbnailPath(String thumbnailPath) {
        this.thumbnailPath = thumbnailPath;
    }
}

