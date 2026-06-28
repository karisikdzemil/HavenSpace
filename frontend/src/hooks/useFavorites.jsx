import { useAuth } from "./useAuth";
import { API_BASE_URL } from "../config/api";

export const useFavorites = () => {
  const { user, token, isAuthenticated, refreshUser } = useAuth();

  const isFavorite = (propertyId) =>
    !!user?.favorites?.some((fav) => (fav._id || fav) === propertyId);

  const toggleFavorite = async (propertyId) => {
    if (!isAuthenticated) {
      return { ok: false, requiresAuth: true };
    }

    try {
      const result = await fetch(`${API_BASE_URL}/api/favorites/${propertyId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await result.json();

      if (!result.ok) {
        return { ok: false, message: data.message };
      }

      refreshUser({ ...user, favorites: data.favorites });
      return { ok: true, isFavorite: data.isFavorite };
    } catch {
      return { ok: false, message: "Server connection failed." };
    }
  };

  return { isFavorite, toggleFavorite };
};
