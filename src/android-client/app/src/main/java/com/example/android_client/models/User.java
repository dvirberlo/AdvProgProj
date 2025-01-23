package com.example.android_client.models;

import com.google.gson.annotations.SerializedName;

public class User {
    @SerializedName("firstName")
    private String firstName;

    @SerializedName("lastName")
    private String lastName;

    @SerializedName("username")
    private String username;

    @SerializedName("password")
    private String password;

    @SerializedName("role")
    private String role;
    @SerializedName("image")
    private String image; // Changed to String to match Mongoose schema

    // Constructors, getters, and setters remain the same
    public User(String firstName, String lastName, String username, String password, String role,String image) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.role = role;
        this.image=image;
    }


    public String getImage() {
        return this.image;
    }

    public void setImage(String profileImg) {
        this.image = profileImg;
    }

    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getRole() { return role; }

    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; }

}

