package com.example.android_client.activities;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;
import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.example.android_client.R;
import com.example.android_client.entities.PhotoHandler;
import com.example.android_client.models.User;
import com.example.android_client.viewmodels.UserViewModel;

public class SignUpActivity extends AppCompatActivity {
    private EditText editTextFirstName, editTextLastName, editTextPassword,
            editTextConfirmPassword, editTextUserName;
    private Button buttonUploadPhoto, buttonSignUp;
    private PhotoHandler photoHandler;
    private Bitmap resultBit;
    private UserViewModel userViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_sign_up);
        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);
        userViewModel.getRegisterData().observe(this,user -> {
            if(!user.isSuccess()){
                Toast toast = Toast.makeText(SignUpActivity.this,
                        user.getMessage(), Toast.LENGTH_LONG);
                toast.show();
                return;
            }
            Toast toast = Toast.makeText(SignUpActivity.this,
                    user.getMessage(), Toast.LENGTH_LONG);
            toast.show();

            startActivity(new Intent(this, SignInActivity.class));
            //remove this activity from the stack
            finish();
        });
        init();
        clickEvent();
    }

    private void init(){
        // Getting the elements from XML\
        ImageView regPhoto = findViewById(R.id.reg_photo);
        editTextFirstName = findViewById(R.id.editTextFirstName);
        editTextLastName = findViewById(R.id.editTextLastName);
        editTextPassword = findViewById(R.id.editTextPassword);
        editTextUserName = findViewById(R.id.editTextUserName);
        editTextConfirmPassword = findViewById(R.id.editTextConfirmPassword);
        buttonSignUp = findViewById(R.id.buttonSignUp);
        buttonUploadPhoto = findViewById(R.id.buttonUploadPhoto);
        photoHandler = new PhotoHandler(regPhoto,this);
    }

    private void clickEvent(){
        buttonSignUp.setOnClickListener(v -> signUpUser());
        buttonUploadPhoto.setOnClickListener(v -> photoHandler.checkPermissionAndOpenGallery());
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        photoHandler.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    // Handling the result of the photo
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Bitmap resultBitmap = photoHandler.onActivityResult(requestCode, resultCode, data);
        if (resultBitmap != null) {
            this.resultBit = resultBitmap;
        }
    }


    private void signUpUser() {
        // Get the text the user entered, trimming whitespace
        String firstName = editTextFirstName.getText().toString().trim();
        String lastName = editTextLastName.getText().toString().trim();
        String userName = editTextUserName.getText().toString().trim();
        String password = editTextPassword.getText().toString().trim();
        String rePassword = editTextConfirmPassword.getText().toString().trim();
        if (resultBit == null){
            Toast.makeText(this, "Photo is required.", Toast.LENGTH_SHORT).show();
            buttonUploadPhoto.requestFocus();
            return;
        }
        String profileImgUri = PhotoHandler.bitmapToUri(resultBit, this).toString();
        //user.setProfileImg(profileImgUri);
        String specialChars = "[!@#$%^&*(),.?\":{}|<>]";

        // Check first name length
        if (firstName.isEmpty()) {
            editTextFirstName.setError("First name is required");
            editTextFirstName.requestFocus();
            return;
        } else if (firstName.length() > 20) {
            editTextFirstName.setError("First name cannot be longer than 20 characters");
            editTextFirstName.requestFocus();
            return;
        }

        // Check last name length
        if (lastName.isEmpty()) {
            editTextLastName.setError("Last name is required");
            editTextLastName.requestFocus();
            return;
        } else if (lastName.length() > 20) {
            editTextLastName.setError("Last name cannot be longer than 20 characters");
            editTextLastName.requestFocus();
            return;
        }

        // Check username
        if (userName.isEmpty()) {
            editTextUserName.setError("Username is required");
            editTextUserName.requestFocus();
            return;
        } else if (userName.length() > 20) {
            editTextUserName.setError("Username cannot be longer than 20 characters");
            editTextUserName.requestFocus();
            return;
        }

        // Password requirements
        if (password.isEmpty()) {
            editTextPassword.setError("Password is required");
            editTextPassword.requestFocus();
            return;
        } else if (password.length() < 8 || password.length() > 20) {
            editTextPassword.setError("Password must be 8-20 characters long");
            editTextPassword.requestFocus();
            return;
        } else if (!password.matches(".*" + specialChars + ".*")) {
            editTextPassword.setError("Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)");
            editTextPassword.requestFocus();
            return;
        }

        // Confirm password
        if (rePassword.isEmpty()) {
            editTextConfirmPassword.setError("Please confirm your password");
            editTextConfirmPassword.requestFocus();
            return;
        }

        // Check if passwords match
        if (!password.equals(rePassword)) {
            editTextConfirmPassword.setError("Passwords do not match");
            editTextConfirmPassword.requestFocus();
            return;
        }

        User user = new User(firstName, lastName, userName, password,"user",profileImgUri);
        // All validations have passed
        userViewModel.addUser(this,user);

    }
}