// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={{ backgroundColor: "#222", padding: "1rem", textAlign: "center" }}>
      <Link to="/" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/gallery" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>
        Gallery
      </Link>
    </nav>
  );
};

export default Navbar;