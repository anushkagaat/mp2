// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import "./App.css";
import GalleryPage from "./pages/GalleryPage";

const App: React.FC = () => (
  <Router>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/gallery">Gallery</Link>
    </nav>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/artwork/:id" element={<DetailPage />} />
    </Routes>
  </Router>
);

export default App;
