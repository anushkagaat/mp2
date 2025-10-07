import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArtworkById } from "../api";
import { Artwork } from "../types";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const navigate = useNavigate(); // ✅ define navigate here

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArtworkById(Number(id));
      if (data) setArtwork(data);
      else setArtwork(null);
    };
    fetchData();
  }, [id]);

  // ✅ define goToArtwork INSIDE the component, so it has access to navigate
  const goToArtwork = async (newId: number) => {
    const data = await getArtworkById(newId);
    if (data) {
      navigate(`/artwork/${newId}`);
    } else {
      alert("Artwork not available, skipping to next one...");
      navigate(`/artwork/${newId + 1}`);
    }
  };

  if (artwork === null)
    return (
      <div className="detail-container">
        <button onClick={() => navigate(-1)}>← Back</button>
        <p style={{ textAlign: "center", color: "crimson" }}>
          ❌ Artwork not found or unavailable.
        </p>
      </div>
    );

  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : "https://via.placeholder.com/800x800?text=No+Image";

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>{artwork.title}</h2>
      <img src={imageUrl} alt={artwork.title} />

      <div className="artwork-details">
        <p><strong>Artist:</strong> {artwork.artist_display || "Unknown"}</p>
        <p><strong>Date:</strong> {artwork.date_display || "N/A"}</p>
        <p><strong>Medium:</strong> {artwork.medium_display || "N/A"}</p>
        <p><strong>Dimensions:</strong> {artwork.dimensions || "N/A"}</p>
        <p><strong>Department:</strong> {artwork.department_title || "N/A"}</p>
        <p><strong>Type:</strong> {artwork.artwork_type_title || "N/A"}</p>
        <p><strong>Credit Line:</strong> {artwork.credit_line || "N/A"}</p>
      </div>

      {/* ✅ Use our goToArtwork function */}
      <div style={{ marginTop: "1.5rem" }}>
        <button onClick={() => goToArtwork(Number(id) - 1)}>← Prev</button>
        <button onClick={() => goToArtwork(Number(id) + 1)} style={{ marginLeft: "1rem" }}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
