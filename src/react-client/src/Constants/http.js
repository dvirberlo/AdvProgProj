const isDevelopment = process.env.NODE_ENV === "development";

export const WebServerURL = isDevelopment
  ? "http://localhost:3000"
  : window.location.origin;

export const TOKEN_ID_HEADER = "token-id";
