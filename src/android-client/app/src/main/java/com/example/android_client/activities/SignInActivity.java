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
            startActivity(new Intent(this, SignUpActivity.class));
        });

        userLogInViewModel.getUser();
    }

//        userLogInViewModel.getUser();
    }

//    private void clickEvent(){
//        buttonSignIn.setOnClickListener(v -> signUpUser());
//    }


//    private void signUpUser() {
//        // Get the text the user entered, trimming whitespace
//        String userName = editTextUserName.getText().toString().trim();
//        String password = editTextPassword.getText().toString().trim();
//        String specialChars = "[!@#$%^&*(),.?\":{}|<>]";
//        // Check username
//        if (userName.isEmpty()) {
//            editTextUserName.setError("Username is required");
//            editTextUserName.requestFocus();
//            return;
//        } else if (userName.length() > 20) {
//            editTextUserName.setError("Username cannot be longer than 20 characters");
//            editTextUserName.requestFocus();
//            return;
//        }
//
//        // Password requirements
//        if (password.isEmpty()) {
//            editTextPassword.setError("Password is required");
//            editTextPassword.requestFocus();
//            return;
//        } else if (password.length() < 8 || password.length() > 20) {
//            editTextPassword.setError("Password must be 8-20 characters long");
//            editTextPassword.requestFocus();
//            return;
//        } else if (!password.matches(".*" + specialChars + ".*")) {
//            editTextPassword.setError("Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)");
//            editTextPassword.requestFocus();
//            return;
//        }
//        // until here we check the correctness in the android client now i need to verify in the server
//
//    }

//    private void createUser(String firstName, String lastName, String userName, String password, String role){
//        User user = new User(firstName, lastName, userName, password, role);
//        WebServiceApi apiService = RetroFitClient.getClient().create(WebServiceApi.class);
////        Call<Void> call = apiService.createUser(user);
//       // call.enqueue(new Callback<Void>() {
//            @Override
//            public void onResponse(Call<Void> call, Response<Void> response) {
//                if(response.isSuccessful()){
//                    Log.d(TAG, "User created successfully");
//                    Toast.makeText(MainActivity.this, "User created successfully", Toast.LENGTH_SHORT).show();
//                    // Optionally, navigate to another activity or clear the form
//                } else {
//                    Log.e(TAG, "Failed to create user: " + response.code());
//                    Toast.makeText(MainActivity.this, "Failed to create user: " + response.code(), Toast.LENGTH_SHORT).show();
//                }
//            }
//
//            @Override
//            public void onFailure(Call<Void> call, Throwable t) {
//                Log.e(TAG, "Error: " + t.getMessage(), t);
//                Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
//            }
//        });
    // }
//}