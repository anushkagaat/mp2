// src/components/ArtworkCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Artwork } from "../types";

interface Props {
  artwork: Artwork;
}

const ArtworkCard: React.FC<Props> = ({ artwork }) => {
  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
    : "https://via.placeholder.com/400x400?text=No+Image";

  return (
    <div className="artwork-card">
      <Link to={`/artwork/${artwork.id}`}>
        <img src={imageUrl} alt={artwork.title} />
        <h3>{artwork.title}</h3>
        <p>{artwork.artist_display}</p>
      </Link>
    </div>
  );
};

export default ArtworkCard;
