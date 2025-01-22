package com.example.android_client.dao;

import android.content.Context;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import com.example.android_client.models.Movie;
import com.example.android_client.models.User;
import com.example.android_client.dao.MovieDao;

@Database(entities = {User.class, Movie.class}, version = 3, exportSchema = false)
@TypeConverters(ConvertersDB.class)
public abstract class AppDB extends RoomDatabase {
    public abstract MovieDao movieDao();

    private static volatile AppDB instance;
    public static AppDB getInstance(final Context context) {
        if (instance == null)
            synchronized (AppDB.class) {
                if (instance == null)
                    instance = Room.databaseBuilder(context.getApplicationContext(),
                                    AppDB.class, "appDB")
                            .fallbackToDestructiveMigration()
                            .allowMainThreadQueries()
                            .build();

            }
        return instance;
    }
}