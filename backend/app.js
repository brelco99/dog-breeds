// Import required packages
const express = require('express');  // Express.js to handle HTTP requests
const cors = require('cors');        // CORS middleware to enable cross-origin requests
const axios = require('axios');      // Axios to make HTTP requests to external APIs

// Initialize the Express app and define the port
const app = express();
const PORT = 5000;

// Use the CORS middleware to allow cross-origin requests (useful for frontend requests from different domains)
app.use(cors());

// Define the base URL and API key for TheDogAPI (replace with your actual Pro API key)
const API_BASE = 'https://api.thedogapi.com/v1';
const API_KEY = 'dog-api-key'; // Your Pro API key

// Route to fetch all dog breeds with detailed information
app.get('/api/breeds', async (req, res) => {
  try {
    // Make a GET request to TheDogAPI to fetch breed data, including detailed info
    const response = await axios.get(`${API_BASE}/breeds`, {
      headers: { 'x-api-key': API_KEY },  // Include API key in request headers for authentication
    });

    // Return a simplified JSON object with selected fields (id, name, temperament, etc.)
    res.json(response.data.map((breed) => ({
      id: breed.id,
      name: breed.name,
      temperament: breed.temperament || 'Unknown',  // Default to 'Unknown' if temperament is not available
      life_span: breed.life_span || 'Unknown',    // Default to 'Unknown' if life span is not available
      breed_group: breed.breed_group || 'Unknown', // Default to 'Unknown' if breed group is not available
      image: breed.image?.url || '',              // Use optional chaining to get the image URL, fallback to empty string if not available
    })));
  } catch (error) {
    // Handle errors (e.g., failed to fetch breed data)
    res.status(500).json({ error: 'Failed to fetch breeds' });
  }
});

// Route to fetch detailed information about a specific breed by name
app.get('/api/breeds/:breedName', async (req, res) => {
  try {
    // Extract breed name from the URL parameters
    const { breedName } = req.params;

    // Fetch all breeds and find the one matching the breed name
    const response = await axios.get(`${API_BASE}/breeds`, {
      headers: { 'x-api-key': API_KEY },  // Include API key in request headers for authentication
    });

    // Find the breed in the response data (case insensitive comparison)
    const breed = response.data.find((b) => b.name.toLowerCase() === breedName.toLowerCase());

    if (breed) {
      // If the breed is found, return detailed information (name, temperament, life span, etc.)
      res.json({
        id: breed.id,
        name: breed.name,
        temperament: breed.temperament || 'Unknown',  // Default to 'Unknown' if no temperament is provided
        life_span: breed.life_span || 'Unknown',    // Default to 'Unknown' if life span is not available
        breed_group: breed.breed_group || 'Unknown', // Default to 'Unknown' if breed group is not available
        image: breed.image?.url || '',               // Use optional chaining for image URL, fallback to empty string
        description: breed.bred_for || 'No description available',  // Default description if not available
      });
    } else {
      // If breed is not found, return a 404 error with a message
      res.status(404).json({ error: 'Breed not found' });
    }
  } catch (error) {
    // Handle errors (e.g., failed to fetch breed details)
    res.status(500).json({ error: 'Failed to fetch breed details' });
  }
});

// Start the server on the specified port and log a message to confirm
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
