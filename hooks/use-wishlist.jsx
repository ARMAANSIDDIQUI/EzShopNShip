"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { fetchProducts } from "@/lib/dummy-data";

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlist() {
      try {
        const savedWishlistIds = JSON.parse(localStorage.getItem("wishlist") || "[]");
        if (savedWishlistIds.length > 0) {
          // Fetch the products corresponding to the saved IDs.
          const allProducts = await fetchProducts();
          const itemsFromStorage = savedWishlistIds
            .map(id => allProducts.find(p => p.id === id))
            .filter(Boolean); // Filter out any undefined items if IDs don't match
          setWishlistItems(itemsFromStorage);
        }
      } catch (e) {
        console.error("Failed to load wishlist from localStorage", e);
      } finally {
        setLoading(false);
      }
    }

    loadWishlist();
  }, []);

  useEffect(() => {
    if (!loading) {
      const ids = wishlistItems.map(item => item.id);
      localStorage.setItem("wishlist", JSON.stringify(ids));
    }
  }, [wishlistItems, loading]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const isItemInWishlist = prevItems.some(item => item.id === product.id);
      if (!isItemInWishlist) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
