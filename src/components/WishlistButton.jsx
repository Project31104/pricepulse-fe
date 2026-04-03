// components/WishlistButton.jsx
// Heart toggle button — red when wishlisted, outline when not.
// Accepts the full product object as a prop.

import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistButton({ product, className = '' }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [animate, setAnimate] = useState(false);

  const wishlisted = isWishlisted(product);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimate(true);
    toggleWishlist(product);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`flex items-center justify-center w-8 h-8 rounded-full
                  transition-all duration-200 shadow-md
                  ${wishlisted
                    ? 'bg-red-500/30 hover:bg-red-500/50 ring-1 ring-red-400/60'
                    : 'bg-black/50 hover:bg-black/70 ring-1 ring-white/20'}
                  ${animate ? 'scale-125' : 'scale-100'}
                  ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth={2}
        className="h-4 w-4 transition-colors duration-200"
        stroke={wishlisted ? '#f87171' : '#fb7185'}
        fill={wishlisted ? '#f87171' : 'none'}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935
             0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1
             3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
}
