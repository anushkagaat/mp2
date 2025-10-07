// src/types.ts
export interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_display: string;
  date_display?: string;
  medium_display?: string;
  dimensions?: string;
  department_title?: string;
  artwork_type_title?: string;
  credit_line?: string;
}