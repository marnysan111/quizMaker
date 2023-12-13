import { Helmet } from "react-helmet"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import RoomList from './pages/rooms'

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>QuizMaker - TopPage</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
