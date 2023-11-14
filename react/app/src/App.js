import { Helmet } from "react-helmet"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Room from './pages/room'

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>QuizMaker - TopPage</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
