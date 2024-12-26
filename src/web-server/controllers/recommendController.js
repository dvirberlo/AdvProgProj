const e = require('express');
const recommendService = require('../services/recommendService');
// Controller function to get recommendations
const getRecommendations = async (req, res) => {
    try {
        const userId = req.headers['token-id'];
        // Check if Token-ID exists in the headers
        if (!userId) {
            return res.status(400).json({error : 'Token-ID header is missing'});
        }

        const recommendations = await recommendService.getRecommendations(userId, req.params.id);

        if (recommendations.startsWith("200 OK\n")) {
            // Remove '200 OK\n' and any following newlines
            const cleanedResponse = recommendations.replace(/^200 OK\n\n?/, '').trim();
            return res.status(200).json({recommendation : `${cleanedResponse}`});
        } else if (recommendations == "400 Bad Request\n") {
            return res.status(400).json();
        } else if (recommendations == "404 Not Found\n") {
            return res.status(404).json();
        }
        return res.status(500).json({error : 'Unexpected response from server'});
    } catch (error) {
        console.error('Error in getRecommendations controller:', error);
        return res.status(500).json({error : 'Internal server error'});
    }
};

const addWatch = async (req, res) => {
    try {
        const userId = req.headers['token-id'];

        // Check if Token-ID exists in the headers
        if (!userId) {
            return res.status(400).json({error : 'Token-ID header is missing'});
        }

        // Call the addWatch function from the service layer
        const addWatchResponse = await recommendService.addWatch(userId, req.params.id);

        // Handle different response codes based on the server's response
        if (addWatchResponse === "201 Created\n") {
            return res.status(201).json({message : `Added movie ${req.params.id} to the watch list for user ${userId}`});
        } else if (addWatchResponse === "204 No Content\n") {
            return res.status(204).json();
        } else if (addWatchResponse === "400 Bad Request\n") {
            return res.status(400).json();
        } else if (addWatchResponse === "404 Not Found\n") {
            return res.status(404).json();
        }

        // If an unknown response is received, send a generic error
        return res.status(500).json({error : 'Unexpected response from server'});

    } catch (error) {
        console.error('Error occurred while adding watch:', error);
        return res.status(500).json({error : 'Internal server error'});
    }
};

module.exports = {
    getRecommendations,
    addWatch
};