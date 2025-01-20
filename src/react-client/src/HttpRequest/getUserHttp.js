import { TOKEN_ID_HEADER, WebServerURL } from "../Constants/http";

export const getUserHttp = async (token, id) => {
  try {
    const response = await fetch(`${WebServerURL}/api/users/${id}`, {
      method: "GET",
      headers: {
        [TOKEN_ID_HEADER]: token,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed fetch:", error);
    return null;
  }
};
