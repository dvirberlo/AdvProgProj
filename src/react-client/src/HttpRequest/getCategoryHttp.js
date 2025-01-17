export const getCategoryHttp = async (token, categoryId) => {
  try {
    // http get request to the server
    // should change the hard coded port to env variable
    const response = await fetch(
      `http://localhost:3000/api/categories/${categoryId}`,
      {
        method: "GET",
        headers: {
          "token-id": token,
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
    console.error("Failed to fetch movie details:", error);
    return null;
  }
};
