// pages/WishlistPage.jsx
// Displays all wishlisted products. Each card shows image, title,
// price, platform, and a remove button.

import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatCurrency';
import { TrashIcon, HeartIcon } from '@heroicons/react/24/solid';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

const PLATFORM_STYLES = {
  Amazon:   'bg-orange-500/20 text-orange-300 border-orange-400/30',
  Flipkart: 'bg-blue-500/20   text-blue-300   border-blue-400/30',
  eBay:     'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
  Etsy:     'bg-rose-500/20   text-rose-300   border-rose-400/30',
};

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="page-dark min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <HeartIcon className="h-7 w-7 text-red-400" />
          <h1 className="text-2xl font-black text-white tracking-tight">My Wishlist</h1>
          {wishlist.length > 0 && (
            <span className="ml-1 bg-red-500/20 text-red-300 border border-red-400/30
                             text-xs font-bold px-2.5 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          )}
        </div>

        {/* Empty state */}
        {wishlist.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <HeartIcon className="h-16 w-16 text-white/10 mb-4" />
            <h2 className="text-xl font-bold text-white/60 mb-2">Your wishlist is empty</h2>
            <p className="text-white/40 text-sm mb-6">
              Hit the ❤️ on any product to save it here.
            </p>
            <Link
              to="/"
              className="btn-gradient text-white text-sm font-semibold px-6 py-2.5 rounded-xl"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Product grid */}
        {wishlist.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {wishlist.map((product, idx) => {
              const title      = product.name || product.title || 'Unknown Product';
              const productUrl = product.productUrl || product.url || '#';
              const badgeStyle = PLATFORM_STYLES[product.platform] || PLATFORM_STYLES.Amazon;

              return (
                <div
                  key={productUrl + idx}
                  className="product-card relative flex flex-col rounded-2xl overflow-hidden"
                >
                  {/* Platform badge */}
                  <div className={`absolute top-3 right-3 z-10 text-xs font-semibold
                                   px-2.5 py-1 rounded-full border ${badgeStyle}`}>
                    {product.platform}
                  </div>

                  {/* Image */}
                  <div className="h-44 overflow-hidden bg-white/5">
                    <img
                      src={product.image || `https://placehold.co/400x300/1e1b4b/94a3b8?text=${encodeURIComponent(product.platform || 'Product')}`}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/400x300/1e1b4b/94a3b8?text=${encodeURIComponent(product.platform || 'Product')}`;
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-4 gap-3">
                    <h3 className="text-sm font-semibold text-white/90 line-clamp-2 leading-snug">
                      {title}
                    </h3>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                      <span className="text-xl font-black text-white tracking-tight">
                        {formatCurrency(product.price)}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* View deal */}
                        <a
                          href={productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-deal-btn flex items-center gap-1 text-xs font-semibold
                                     px-3 py-1.5 rounded-xl text-white btn-gradient"
                        >
                          Deal
                          <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                        </a>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromWishlist(product)}
                          aria-label="Remove from wishlist"
                          className="flex items-center justify-center w-7 h-7 rounded-full
                                     bg-red-500/15 hover:bg-red-500/30 transition-colors duration-200"
                        >
                          <TrashIcon className="h-3.5 w-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
