import React, { useState, useEffect } from "react";
import axios from "axios";
import ArtworkCard from "../components/ArtworkCard";
import { Artwork } from "../types";

const BASE_URL = "https://api.artic.edu/api/v1/artworks";

const GalleryPage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedType, setSelectedType] = useState<string>("Painting");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  // 🖼 Categories with icons
  const artworkTypes = [
    { label: "🎨 Painting", value: "Painting" },
    { label: "🗿 Sculpture", value: "Sculpture" },
    { label: "🖨 Print", value: "Print" },
    { label: "✏️ Drawing & Watercolor", value: "Drawing and Watercolor" },
    { label: "🧵 Textile", value: "Textile" },
    { label: "📸 Photograph", value: "Photograph" },
    { label: "🏺 Decorative Arts", value: "Decorative Arts" },
    { label: "🏛 Architecture", value: "Architecture" },
  ];

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/search`, {
          params: {
            q: selectedType,
            limit: 30,
            fields: "id,title,image_id,artist_display,artwork_type_title",
          },
        });
        setArtworks(response.data.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, [selectedType]);

  // 🎨 Sorting logic
  const sortedArtworks = [...artworks].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    } else if (sortOrder === "desc") {
      return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
    } else if (sortOrder === "artist") {
      const artistA = (a.artist_display || "Unknown").toLowerCase();
      const artistB = (b.artist_display || "Unknown").toLowerCase();
      return artistA.localeCompare(artistB);
    }
    return 0;
  });

  return (
    <div className="home-container">
      <div className="home-overlay">
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
           Explore the Gallery by Category
        </h2>

        {/* 🔹 Category Blocks */}
        <div className="type-block-container">
          {artworkTypes.map((type) => (
            <div
              key={type.value}
              className={`type-block ${
                selectedType === type.value ? "active-type" : ""
              }`}
              onClick={() => setSelectedType(type.value)}
            >
              {type.label}
            </div>
          ))}
        </div>

        {/* 🔹 Sort Dropdown */}
        <div className="filter-bar">
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Sort A → Z (Title)</option>
            <option value="desc">Sort Z → A (Title)</option>
            <option value="artist">Sort by Artist Name</option>
          </select>
        </div>

        {/* 🔹 Artworks Grid */}
        <div className="gallery-grid">
          {sortedArtworks.length > 0 ? (
            sortedArtworks.map((a) => <ArtworkCard key={a.id} artwork={a} />)
          ) : (
            <p style={{ textAlign: "center", color: "#555" }}>
              No artworks found for {selectedType}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
