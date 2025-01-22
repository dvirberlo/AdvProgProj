package com.example.android_client.models;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

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

    public Category(String name, boolean promoted) {
        this._id = "";
        this.name = name;
        this.promoted = promoted;
    }

    @Override
    public String toString() {
        return "Category{" +
                "_id='" + _id + '\'' +
                ", name='" + name + '\'' +
                ", promoted=" + promoted +
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
}
