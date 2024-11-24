import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BreedList from "./components/BreedList";
import BreedDetail from "./components/BreedDetail";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Dog Breeds App</h1>
        <Routes>
          <Route path="/" element={<BreedList />} />
          <Route path="/breeds/:breedName" element={<BreedDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
