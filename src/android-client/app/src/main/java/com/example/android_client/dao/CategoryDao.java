package com.example.android_client.dao;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.example.android_client.models.Category;

import java.util.List;

@Dao
public interface CategoryDao {
    @Query("SELECT * FROM category")
    List<Category> getAll();

    @Query("SELECT * FROM category WHERE _id = :id")
    Category getById(String id);

    @Query("SELECT * FROM category WHERE name = :name")
    Category getByName(String name);

    @Query("SELECT * FROM category WHERE promoted = :promoted")
    List<Category> getByPromoted(boolean promoted);

    @Insert
    void insert(Category category);

    @Update
    void update(Category category);

    @Delete
    void delete(Category category);
}
