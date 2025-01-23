package com.example.android_client.activities;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.example.android_client.R;
import com.example.android_client.entities.UserManager;
import com.example.android_client.request.LoginRequest;
import com.example.android_client.viewmodels.UserLogInViewModel;
import com.example.android_client.viewmodels.UserViewModel;

public class SignInActivity extends AppCompatActivity {
    private EditText editTextPassword, editTextUserName;
    private Button buttonSignIn;
    private UserViewModel userViewModel;
    private UserLogInViewModel userLogInViewModel;

    private static final String TAG = "SignInActivity";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_sign_in);
        init();
    }

    private void init(){
        userViewModel =new  ViewModelProvider(this).get(UserViewModel.class);

        // Getting the elements from XML\
        editTextPassword = findViewById(R.id.editTextPassword);
        editTextUserName = findViewById(R.id.editTextUserName);
        buttonSignIn = findViewById(R.id.buttonSignIn);
        buttonSignIn.setOnClickListener(v -> loginUser());

    }



    private void loginUser() {

        String username = editTextUserName.getText().toString();
        String password = editTextPassword.getText().toString();

        LoginRequest loginRequest = new LoginRequest(username, password);
        userViewModel.loginUser(this,loginRequest);

        userViewModel.getTokenData().observe(this, tokenResponse -> {

            if (!tokenResponse.isSuccess()) {
                Toast.makeText(SignInActivity.this, tokenResponse.getMessage(), Toast.LENGTH_LONG).show();
                return;
            }
            UserManager.getInstance().setToken(tokenResponse.getData().getToken());
            // set the manger token field to be the response
            UserManager.getInstance().setUserId(tokenResponse.getData().get_id());
            //mark the user has signed in
            UserManager.getInstance().login();
            Toast.makeText(SignInActivity.this, tokenResponse.getMessage(), Toast.LENGTH_LONG).show();
            // we did it
            getUser();
        });

    }



    private void getUser() {
        userLogInViewModel = new ViewModelProvider(this).get(UserLogInViewModel.class);
        userLogInViewModel.getUserData().observe(this, user -> {
            if (!user.isSuccess()) {
                Toast.makeText(SignInActivity.this, user.getMessage(), Toast.LENGTH_LONG).show();
                return;
            }
            UserManager.getInstance().setUser(user.getData());

            //startActivity(new Intent(this, SignUpActivity.class));
        });

        //userLogInViewModel.getUser();

            // need to change to move the home page
            startActivity(new Intent(this, SignUpActivity.class));
            //remove this activity from the stack
            finish();
        });

        userLogInViewModel.getUser();


    }

    }



