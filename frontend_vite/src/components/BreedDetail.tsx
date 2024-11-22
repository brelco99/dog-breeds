import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Heading, Image, Text, Spinner, Stack } from "@chakra-ui/react";

// Interface to define the structure of a Breed object
interface Breed {
  id: number;
  name: string;
  description?: string; // Optional description field
  temperament: string;
  life_span: string;
  breed_group: string;
  image: string; // Added image field directly fetched from the backend
}

const BreedDetail: React.FC = () => {
  // Get the breed name from the URL parameters
  const { breedName } = useParams<{ breedName: string }>();

  // State to hold the breed details fetched from the backend
  const [breed, setBreed] = useState<Breed | null>(null);
  // State to indicate loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to store any error message
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch breed details when the component mounts or the breedName changes
  useEffect(() => {
    setLoading(true); // Start loading
    setError(null); // Clear any previous errors

    // Fetch breed details from the backend
    axios
      .get(`http://localhost:5000/api/breeds/${breedName}`)
      .then((response) => {
        if (response.data) {
          setBreed(response.data); // Save the breed details in state
        } else {
          setError("Breed not found."); // Handle case where breed is not found
        }
      })
      .catch(() => {
        setError("Failed to fetch breed details."); // Handle any network or server errors
      })
      .finally(() => {
        setLoading(false); // Stop loading once the request completes
      });
  }, [breedName]); // Re-run the effect whenever breedName changes

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  // Display an error message if something went wrong
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Text fontSize="lg" color="red.500">
          {error}
        </Text>
      </Box>
    );
  }

  // Display a fallback message if the breed is not found
  if (!breed) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Text fontSize="lg" color="red.500">
          Breed not found.
        </Text>
      </Box>
    );
  }

  // Main content for displaying breed details and the breed image
  return (
    <Box p={4} maxW="800px" mx="auto" boxShadow="lg" borderRadius="md" bg="gray.50">
      <Stack spacing={4}>
        <Heading as="h1" size="2xl" textAlign="center">{breed.name}</Heading>
        <Image
          src={breed.image || "https://via.placeholder.com/400"}
          alt={breed.name}
          borderRadius="md"
          boxShadow="md"
          maxH="400px"
          mx="auto"
        />
        <Text fontSize="md" color="gray.600">
          <strong>Temperament:</strong> {breed.temperament}
        </Text>
        <Text fontSize="md" color="gray.600">
          <strong>Life Span:</strong> {breed.life_span}
        </Text>
        <Text fontSize="md" color="gray.600">
          <strong>Breed Group:</strong> {breed.breed_group}
        </Text>
        <Text fontSize="lg" color="gray.700">{breed.description || 'No description available.'}</Text>
      </Stack>
    </Box>
  );
};

export default BreedDetail;
