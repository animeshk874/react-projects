import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import MemoryMatchingGame from './components/MemoryMatchingGame/MemoryMatchingGame';
import { GameProvider } from './Providers/GameProvider/GameProvider';
import { WebAR } from './components/WebAR/WebAR';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/memory-matching' element={<GameProvider><MemoryMatchingGame /></GameProvider>} />
            <Route path='/web-ar' element={<WebAR></WebAR>} />
            <Route path='/' element={<Navigate to={'/memory-matching'} />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
