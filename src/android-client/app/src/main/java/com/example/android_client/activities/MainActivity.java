package com.example.android_client.activities;
import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;


import com.example.android_client.activities.home.HomeActivity;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, HomePageNonLogIn.class);

        startActivity(intent);
        // remove main activity from activity stack
        finish();
    }
}
