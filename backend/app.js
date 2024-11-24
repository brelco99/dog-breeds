const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());

const API_BASE = 'https://api.thedogapi.com/v1';

app.get('/api/breeds', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/breeds`);
    res.json(response.data.map((breed) => ({
      id: breed.id,
      name: breed.name,
      image: breed.image?.url || '',
    })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch breeds' });
  }
});

app.get('/api/breeds/:breedName', async (req, res) => {
  try {
    const { breedName } = req.params;
    const response = await axios.get(`${API_BASE}/breeds`);
    const breed = response.data.find((b) => b.name.toLowerCase() === breedName.toLowerCase());

    if (breed) {
      res.json({
        id: breed.id,
        name: breed.name,
        image: breed.image?.url || '',
        description: breed.bred_for || 'No description available',
      });
    } else {
      res.status(404).json({ error: 'Breed not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch breed details' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
