import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import GalleryPage from "./pages/GalleryPage";
import DetailPage from "./pages/DetailPage";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/mp2">
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/artwork/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
