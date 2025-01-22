package com.example.android_client.response;
public class TokenResponse {

    private String token;
    private String _id;


    public TokenResponse(String token , String userId){
        this.token = token;
        this._id = userId;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String get_id() {
        return _id;
    }

    public void setUserId(String userId) {
        this._id = userId;
    }


}