// src/api.ts
import axios from "axios";

const BASE_URL = "https://api.artic.edu/api/v1";
export const searchArtworks = async (query: string, type?: string) => {
  const response = await axios.get(`${BASE_URL}/artworks/search`, {
    params: {
      q: query,
      limit: 100,
      fields:
        "id,title,image_id,artist_display,artwork_type_title,department_title",
    },
  });

  let data = response.data.data;

  if (type && type.toLowerCase() !== "all") {
    const selectedType = type.toLowerCase();

    data = data.filter((a: any) => {
      const artType = (a.artwork_type_title || "").toLowerCase();
      const dept = (a.department_title || "").toLowerCase();
      const combined = `${artType} ${dept}`;

      // 🎨 PAINTING
      if (selectedType.includes("paint")) {
        return artType.includes("paint") || (artType === "" && dept.includes("paint"));
      }

      // 🖨 PRINT
      if (selectedType.includes("print")) {
        return artType.includes("print") || (artType === "" && dept.includes("print"));
      }

      // ✏️ DRAWING / WATERCOLOR
      if (
        selectedType.includes("drawing") ||
        selectedType.includes("watercolor") ||
        selectedType.includes("water colour")
      ) {
        return (
          artType.includes("drawing") ||
          artType.includes("watercolor") ||
          artType.includes("water colour") ||
          (artType === "" && dept.includes("drawing"))
        );
      }

      // 🧵 TEXTILE
      if (
        selectedType.includes("textile") ||
        selectedType.includes("fabric") ||
        selectedType.includes("tapestry")
      ) {
        return (
          artType.includes("textile") ||
          artType.includes("fabric") ||
          artType.includes("tapestry") ||
          artType.includes("cloth") ||
          (artType === "" && dept.includes("textile"))
        );
      }

      // 🗿 SCULPTURE — the powerful, all-inclusive version
      if (selectedType.includes("sculpt")) {
        return (
          // ✅ Catch any known 3D / sculpture type keywords
          artType.includes("sculpt") ||
          artType.includes("3d") ||
          artType.includes("object") ||
          artType.includes("installation") ||
          artType.includes("statue") ||
          artType.includes("relief") ||
          artType.includes("figurine") ||
          artType.includes("ceramic") ||
          artType.includes("bronze") ||
          artType.includes("stone") ||
          artType.includes("metalwork") ||
          // ✅ Fallback: department clues (but avoid “Painting and Sculpture”)
          (artType === "" &&
            (dept.includes("sculpture") ||
              dept.includes("three-dimensional") ||
              dept.includes("ceramic") ||
              dept.includes("metalwork") ||
              dept.includes("object")) &&
            !dept.includes("painting"))
        );
      }

      // 📸 PHOTOGRAPH
      if (selectedType.includes("photo")) {
        return (
          artType.includes("photo") ||
          artType.includes("photograph") ||
          artType.includes("photography") ||
          dept.includes("photography")
        );
      }

      // 🏛 DECORATIVE / ARCHITECTURE / DESIGN
      if (
        selectedType.includes("decorative") ||
        selectedType.includes("architecture") ||
        selectedType.includes("design")
      ) {
        return (
          artType.includes("decorative") ||
          artType.includes("architecture") ||
          artType.includes("design") ||
          (artType === "" && dept.includes(selectedType))
        );
      }

      // Default fallback
      return combined.includes(selectedType);
    });
  }

  return data;
};



export const getArtworkById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/artworks/${id}`, {
      params: {
        fields:
          "id,title,image_id,artist_display,date_display,medium_display,dimensions,department_title,artwork_type_title,credit_line",
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching artwork:", error.message);
    return null; // return null instead of throwing
  }
};
