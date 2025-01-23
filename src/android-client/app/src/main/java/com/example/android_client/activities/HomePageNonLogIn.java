package com.example.android_client.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.android_client.R;

public class HomePageNonLogIn extends AppCompatActivity {
    private Button buttonSignInHomePageNoLog;
    private Button buttonSignUpHomePageNoLog;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_home_page_non_log_in);
        init();
    }

    private void init(){
        // find the elements
        buttonSignInHomePageNoLog=findViewById(R.id.buttonSignInHomePageNoLog);
        buttonSignUpHomePageNoLog=findViewById(R.id.buttonSignUpHomePageNoLog);
        buttonSignInHomePageNoLog.setOnClickListener(v -> SignInPage());
        buttonSignUpHomePageNoLog.setOnClickListener(v -> SignUpPage());

    }
    private void SignInPage(){
        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
        //we can remove this page from the stack of activities : i think we should not allow the user to return to some pages like login sign up after the did them
        finish();
    }
    private void SignUpPage(){
        Intent intent = new Intent(this, SignUpActivity.class);
        startActivity(intent);
        //we can remove this page from the stack of activities : i think we should not allow the user to return to some pages like login sign up after the did them
        finish();
    }


}