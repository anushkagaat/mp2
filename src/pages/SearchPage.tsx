import React, { useState, useEffect } from "react";
import { searchArtworks } from "../api";
import ArtworkCard from "../components/ArtworkCard";
import { Artwork } from "../types";

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("art");
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [artType, setArtType] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const artworkTypes = [
    "all",
    "Painting",
    "Print",
    "Sculpture",
    "Drawing and Watercolor",
    "Textile",
    "Photograph",
    "Decorative Arts",
    "Architecture",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const results = await searchArtworks(query, artType);
      setArtworks(results);
    };
    fetchData();
  }, [query, artType]);

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
        <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
          Search the Art Institute Collection
        </h2>

        <input
          type="text"
          placeholder="Search artworks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="filter-bar">
          <select value={artType} onChange={(e) => setArtType(e.target.value)}>
            {artworkTypes.map((type) => (
              <option key={type} value={type}>
                {type === "all" ? "All Types" : type}
              </option>
            ))}
          </select>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Sort A → Z (Title)</option>
            <option value="desc">Sort Z → A (Title)</option>
            <option value="artist">Sort by Artist Name</option>
          </select>
        </div>

        <div className="gallery-grid">
          {sortedArtworks.length > 0 ? (
            sortedArtworks.map((a) => <ArtworkCard key={a.id} artwork={a} />)
          ) : (
            <p style={{ textAlign: "center", color: "#555" }}>
              No artworks found for this filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
