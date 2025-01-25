import { isDevMode } from "./devMode";

export const WebServerURL = isDevMode
  ? "http://localhost:3000"
  : window.location.origin;

export const TOKEN_ID_HEADER = "token-id";
