import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BreedList from './components/BreedList.tsx';
import BreedDetail from './components/BreedDetail.tsx';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<BreedList />} />
      <Route path="/breeds/:breedName" element={<BreedDetail />} />
    </Routes>
  </Router>
);

export default App;
