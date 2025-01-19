import { TOKEN_ID_HEADER, WebServerURL } from "../Constants/http";

export const getMoviesHttp = async (token) => {
  try {
    // http get request to the server
    // should change the hard coded port to env variable
    const response = await fetch(`${WebServerURL}/api/movies`, {
      method: "GET",
      headers: {
        [TOKEN_ID_HEADER]: token,
      },
    });
    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // serialize the response to json
    const data = await response.json();
    // return json data
    return data;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return null;
  }
};
