import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import MemoryMatchingGame from './components/MemoryMatchingGame/MemoryMatchingGame';
import { GameProvider } from './components/GameProvider/GameProvider';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/memory-matching' element={<GameProvider><MemoryMatchingGame /></GameProvider>} />
            <Route path='/' element={<Navigate to={'/memory-matching'} />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
