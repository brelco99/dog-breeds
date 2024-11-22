import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getBreeds = () => api.get('/breeds');
export const getBreedDetails = (breedName) => api.get(`/breeds/${breedName}`);
