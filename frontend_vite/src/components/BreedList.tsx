import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    <div>
      <input
        type="text"
        placeholder="Filter breeds"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredBreeds.map((breed) => (
          <li key={breed.id}>
            <Link to={`/breeds/${breed.name}`}>{breed.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreedList;
