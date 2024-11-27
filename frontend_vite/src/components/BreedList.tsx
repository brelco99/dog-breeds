import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Input,
  Text,
  ListRoot,
  ListItem,
  Heading,
} from "@chakra-ui/react";

interface Breed {
  id: number;
  name: string;
  image: string;
}

const BreedList: React.FC = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {

    axios.get("http://localhost:5000/api/breeds").then((response) => {
      setBreeds(response.data);
    });
  }, []);

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box
      p={4}
      maxW="600px"
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      {/* Title */}
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        Popular Dog Breeds
      </Heading>

      {/* Subheading */}
      <Text fontSize="lg" mb={6} textAlign="center" color="gray.500">
        Explore a variety of breeds and filter to find your favorite!
      </Text>

      {/* Search Input */}
      <Input
        placeholder="Filter breeds"
        value={filter}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFilter(e.target.value)}
        mb={4}
      />

      {/* Breed List */}
      {filteredBreeds.length > 0 ? (
        <ListRoot spacing={3} as="ul" w="100%">
          {filteredBreeds.map((breed) => (
            <ListItem
              key={breed.id}
              listStyleType='none'
              bg="gray.100"
              p={3}
              borderRadius="md"
              _hover={{ bg: "gray.200" }}
            >
              <Link to={`/breeds/${breed.name}`}>
                <Text fontWeight="bold">{breed.name}</Text>
              </Link>
            </ListItem>
          ))}
        </ListRoot>
      ) : (
        <Text>No breeds found</Text>
      )}
    </Box>
  );
};

export default BreedList;
