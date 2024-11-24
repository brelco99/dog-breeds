import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Breed {
  id: number;
  name: string;
  image: string;
  description: string;
}

const BreedDetail: React.FC = () => {
  const { breedName } = useParams<{ breedName: string }>();
  const [breed, setBreed] = useState<Breed | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/breeds/${breedName}`)
      .then((response) => {
        setBreed(response.data);
      });
  }, [breedName]);

  if (!breed) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{breed.name}</h2>
      <img src={breed.image} alt={breed.name} />
      <p>{breed.description}</p>
    </div>
  );
};

export default BreedDetail;
