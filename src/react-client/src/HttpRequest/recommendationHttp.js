import { TOKEN_ID_HEADER, WebServerURL } from "../Constants/http";

export const getRecommendations = async (token, movieId) => {
  try {
    const response = await fetch(
      `${WebServerURL}/api/movies/${movieId}/recommend`,
      {
        method: "GET",
        headers: {
          [TOKEN_ID_HEADER]: token,
        },
      }
    );
    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // serialize the response to json
    const data = await response.json();
    // return json data
    return data;
  } catch (error) {
    console.error("Failed fetch:", error);
    return null;
  }
};

export const postWatch = async (token, movieId) => {
  try {
    const response = await fetch(
      `${WebServerURL}/api/movies/${movieId}/recommend`,
      {
        method: "POST",
        headers: {
          [TOKEN_ID_HEADER]: token,
        },
      }
    );
    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // return the response status
    return response.status;
  } catch (error) {
    console.error("Failed failed:", error);
    return null;
  }
};
