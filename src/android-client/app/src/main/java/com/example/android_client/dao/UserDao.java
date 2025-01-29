package com.example.android_client.dao;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

import com.example.android_client.models.User;

@Dao
public interface UserDao {
    @Query("SELECT * FROM user WHERE _id = :id")
    User getById(String id);

    @Insert
    void insert(User user);
}
