// context/WishlistContext.jsx
// Provides global wishlist state backed by localStorage.
// Wrap your app with <WishlistProvider> to use useWishlist() anywhere.

import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);

const STORAGE_KEY = 'pricepulse_wishlist';

export function WishlistProvider({ children }) {
  // Initialise from localStorage so data survives page refresh
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  // Keep localStorage in sync whenever wishlist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Check if a product is already wishlisted (match by url or name)
  const isWishlisted = (product) =>
    wishlist.some((p) => (p.productUrl || p.url) === (product.productUrl || product.url));

  // Toggle: add if absent, remove if present
  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      isWishlisted(product)
        ? prev.filter((p) => (p.productUrl || p.url) !== (product.productUrl || product.url))
        : [...prev, product]
    );
  };

  const removeFromWishlist = (product) => {
    setWishlist((prev) =>
      prev.filter((p) => (p.productUrl || p.url) !== (product.productUrl || product.url))
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
