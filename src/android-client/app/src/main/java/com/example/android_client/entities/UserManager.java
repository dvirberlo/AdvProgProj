package com.example.android_client.entities;
import com.example.android_client.models.User;

public class UserManager {
    private static UserManager instance;
    private boolean isLoggedIn = false;

    private User user;
    private String token;

    private String userId;

    private UserManager() {

    }

    public static synchronized UserManager getInstance() {
        if (instance == null) {
            instance = new UserManager();
        }
        return instance;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public String getToken(){return this.token;}
    public void setToken(String token){
        this.token=token;
    }


    public boolean isLoggedIn() {
        return isLoggedIn;
    }

    public void login() {
        isLoggedIn = true;
    }

    public void logout() {
        isLoggedIn = false;
        token="";
        user = null;
        userId ="";
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}