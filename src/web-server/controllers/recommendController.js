const e = require('express');
const recommendService = require('../services/recommendService');
const getRecommendations = async (req, res) => {
    // Retrieve the Token-ID from the headers
    const userId = req.headers['token-id']; 

    // Check if Token-ID exists in the headers
    if (!userId) {
        return res.status(400).json({ error: 'Token-ID header is missing' });
    }

    // If Token-ID is valid, return the message
    res.json({ message: `getRecommendations for user ${userId}` });
};

const addWatch = async (req, res) => {
    try {
        // Retrieve the Token-ID from the headers
        const userId = req.headers['token-id'];  

        // Check if Token-ID exists in the headers
        if (!userId) {
            return res.status(400).json({ error: 'Token-ID header is missing' });
        }
        //check that the token-id is in the mongo database?

        // Call the addWatch function from the service layer
        const addWatchResponse = await recommendService.addWatch(userId, req.params.id);

        // Handle different response codes based on the server's response
        if (addWatchResponse === "201 Created\n") {
            return res.status(201).json({ message: `Added movie ${req.params.id} to the watch list for user ${userId}` });
        } else if (addWatchResponse === "204 No Content\n") {
            return res.status(204).json();
        } else if (addWatchResponse === "400 Bad Request\n") {
            return res.status(400).json();
        } else if (addWatchResponse === "404 Not Found\n") {
            return res.status(404).json();
        }

        // If an unknown response is received, send a generic error
        return res.status(500).json({ error: 'Unexpected response from server' });

    } catch (error) {
        console.error('Error occurred while adding watch:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {getRecommendations, addWatch}; 