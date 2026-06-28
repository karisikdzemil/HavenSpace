export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const isAbsoluteUrl = (value) => /^https?:\/\//.test(value);

// Avatars and property images are now stored as full Cloudinary URLs.
// Older records (uploaded before the Cloudinary migration) still hold
// relative paths pointing at the backend's local /assets static route,
// so both forms need to keep working.
export const avatarUrl = (avatar) => {
  if (!avatar) return "";
  return isAbsoluteUrl(avatar) ? avatar : `${API_BASE_URL}/assets/${avatar}`;
};

export const propertyImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return isAbsoluteUrl(imagePath) ? imagePath : `${API_BASE_URL}/${imagePath}`;
};
