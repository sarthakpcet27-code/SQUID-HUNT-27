import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { RoundSelectionPage } from './pages/RoundSelectionPage';
import { RoundPage } from './pages/RoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rounds" element={<RoundSelectionPage />} />
        <Route path="/round/:id" element={<RoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
