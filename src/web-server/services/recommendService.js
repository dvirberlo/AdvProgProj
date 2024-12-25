const net = require('net'); 



const addWatch = async (userId, movieId) => {
    return new Promise(async (resolve, reject) => {
        // Format the messages to be sent to the C++ server
        const postMessage = `POST ${userId} ${movieId}`;
        const patchMessage = `PATCH ${userId} ${movieId}`;

        //generic function to handle communication with the server
        const sendRequest = (message) => {
            return new Promise((resolve, reject) => {
                const client = new net.Socket();

                client.connect(8080, '127.0.0.1', () => {
                    // Send the message to the server
                    client.write(message + '\n');
                });

                // Listen for data (server response)
                client.on('data', (data) => {
                    const response = data.toString();

                    // Check if the response indicates failure
                    if (response.includes('404')) {
                        // If POST fails, try PATCH
                        resolve(false);
                    } else {
                        resolve(response);
                        client.destroy(); 
                    }
                });

                // Handle errors
                client.on('error', (err) => {
                    reject(err);  
                    client.destroy();
                });
            });
        };

        try {
            // First, try POST request
            let response = await sendRequest(postMessage);
            if (response === false) {
                // If POST fails, try PATCH
                response = await sendRequest(patchMessage);
            }
            resolve(response);  // Return the final response
        } catch (err) {
            reject(err);  
        }
    });
};

module.exports = { addWatch };

const net = require('net');

const getRecommendations = async (userId, movieId) => {
    return new Promise((resolve, reject) => {
        // Format the GET message to be sent to the C++ server
        const getMessage = `GET ${userId} ${movieId}`;

        // Create a TCP client (socket)
        const client = new net.Socket();
        
        // Connect to the C++ server on localhost:8080
        client.connect(8080, '127.0.0.1', () => {
            // Send the GET request to the server
            client.write(getMessage + '\n');
        });

        // Listen for data (server response)
        client.on('data', (data) => {
            // Resolve the promise with the server's response
            resolve(data.toString());  
            client.destroy();  // Close the connection after receiving the response
        });

        // Handle errors
        client.on('error', (err) => {
            console.error('Error occurred:', err);
            reject(err);  // Reject the promise if there was an error
            client.destroy();  // Close the connection
        });
    });
};

module.exports = { getRecommendations };