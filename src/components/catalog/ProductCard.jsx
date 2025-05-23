import Image from "next/image";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// SVG components remain the same
const EmptyStarSvg = () => (
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
    <path
      d="M5.72557 4.99195L7.45725 1.50381C7.67952 1.05602 8.32179 1.05602 8.54405 1.50381L10.2757 4.99195L14.1483 5.55475C14.6452 5.62696 14.8432 6.23424 14.4835 6.58257L11.6818 9.29584L12.343 13.1289C12.4279 13.6212 11.9083 13.9965 11.4637 13.764L8.00065 11.9533L4.53763 13.764C4.09305 13.9965 3.57338 13.6212 3.65829 13.1289L4.31949 9.29584L1.51782 6.58257C1.1581 6.23424 1.35613 5.62696 1.853 5.55475L5.72557 4.99195Z"
      stroke="#494791"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilledStarSvg = () => (
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
    <path
      d="M5.72557 4.99195L7.45725 1.50381C7.67952 1.05602 8.32179 1.05602 8.54405 1.50381L10.2757 4.99195L14.1483 5.55475C14.6452 5.62696 14.8432 6.23424 14.4835 6.58257L11.6818 9.29584L12.343 13.1289C12.4279 13.6212 11.9083 13.9965 11.4637 13.764L8.00065 11.9533L4.53763 13.764C4.09305 13.9965 3.57338 13.6212 3.65829 13.1289L4.31949 9.29584L1.51782 6.58257C1.1581 6.23424 1.35613 5.62696 1.853 5.55475L5.72557 4.99195Z"
      fill="#494791"
      stroke="#494791"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RedCircleSvg = () => (
  <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
    <circle cx="4" cy="4.5" r="4" fill="#EC3535" />
  </svg>
);

const OrangeCircleSvg = () => (
  <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
    <circle cx="4" cy="4.5" r="4" fill="#FF7C40" />
  </svg>
);

const GreenCircleSvg = () => (
  <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
    <circle cx="4" cy="4.5" r="4" fill="#3A9B25" />
  </svg>
);

const GrayCircleSvg = () => (
  <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
    <circle cx="4" cy="4.5" r="4" fill="#717171" />
  </svg>
);

export default function ProductCard({ product = {} }) {
  const [activeImage, setActiveImage] = useState(0);
  const galleryRef = useRef(null);

  // Create star rating display
  const renderStars = () => {
    const rating = parseFloat(product?.stars || 0);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="text-blue-800">
          {i <= rating ? <FilledStarSvg /> : <EmptyStarSvg />}
        </span>
      );
    }
    return stars;
  };

  // Format price
  const displayPrice = product?.price ? `$${parseFloat(product.price).toFixed(2)}` : "$35.99";

  const stock = parseInt(product.stock, 10);
  let stockCircle;
  let stockMessage;
  let stockStyle;
  if (stock === 0) {
    stockMessage = "Sold out";
    stockCircle = <GrayCircleSvg />;
    stockStyle = "text-[#717171]";
  } else if (stock <= 5) {
    stockMessage = `Very low stock(1-5 units)`;
    stockCircle = <RedCircleSvg />;
    stockStyle = "text-[#EC3535]";
  } else if (stock <= 10) {
    stockMessage = `Low stock (6-10 units)`;
    stockCircle = <OrangeCircleSvg />;
    stockStyle = "text-[#FF7C40]";
  } else {
    stockMessage = `In stock (>11)`;
    stockCircle = <GreenCircleSvg />;
    stockStyle = "text-[#3A9B25]";
  }

  const goToPrevImage = () => {
    if (activeImage > 0) {
      scrollToImage(activeImage - 1);
    }
  };

  const goToNextImage = () => {
    if (activeImage < 2) {
      scrollToImage(activeImage + 1);
    }
  };

  // Setup scroll listener to update active image indicator
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleScroll = () => {
      const scrollPosition = gallery.scrollLeft;
      const imageWidth = gallery.clientWidth;
      const imageIndex = Math.round(scrollPosition / imageWidth);
      setActiveImage(imageIndex);
    };

    gallery.addEventListener("scroll", handleScroll);
    return () => gallery.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to a specific image
  const scrollToImage = (index) => {
    if (galleryRef.current) {
      galleryRef.current.scrollTo({
        left: index * galleryRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <article className="flex flex-col w-60">
        <div className="relative h-48 w-full mb-2">
          {/* Image gallery container - hiding scrollbar */}
          <div
            ref={galleryRef}
            className="flex overflow-x-scroll snap-x snap-mandatory h-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Individual images */}
            <div className="min-w-full h-full flex-shrink-0 relative snap-center">
              <Image src="/FirstPlaceholder.svg" alt={product?.name || "Product"} fill className="object-contain" />
            </div>
            <div className="min-w-full h-full flex-shrink-0 relative snap-center">
              <Image src="/SecondPlaceholder.svg" alt={product?.name || "Product"} fill className="object-contain" />
            </div>
            <div className="min-w-full h-full flex-shrink-0 relative snap-center">
              <Image src="/ThirdPlaceholder.svg" alt={product?.name || "Product"} fill className="object-contain" />
            </div>
          </div>

          {/* Left click area */}
          <div
            className="absolute left-0 top-0 w-1/4 h-full cursor-pointer z-10"
            onClick={(e) => {
              e.preventDefault();
              goToPrevImage();
            }}
            aria-label="Previous image"
          />

          {/* Right click area */}
          <div
            className="absolute right-0 top-0 w-1/4 h-full cursor-pointer z-10"
            onClick={(e) => {
              e.preventDefault();
              goToNextImage();
            }}
            aria-label="Next image"
          />

          {/* Navigation lines */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-0.5">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToImage(index);
                }}
                className={`w-20 h-1 transition-colors ${activeImage === index ? "bg-[#494791]" : "bg-gray-300"}`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Product Card Details */}
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 min-h-[3.5rem]">
            {(product?.name || "PRODUCT NAME").toUpperCase()}
          </h3>

          {/* Stars and Reviews */}
          <div className="flex items-center mt-1 h-5">
            {renderStars()}
            <span className="ml-1 text-sm">({product?.reviews?.length || 0})</span>
          </div>

          {/* Price */}
          <p className="text-xl font-bold mt-2 h-7">{displayPrice}</p>

          {/* Stock status */}
          <p className={`flex flex-row flex-nowrap items-center gap-2 text-sm ${stockStyle} h-5`}>
            {stockCircle}
            {stockMessage}
          </p>

          {/* Add to cart button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic here
            }}
            className="mt-4 w-full border-2 border-[#494791] text-[#494791] text-center py-2 text-base font-medium hover:bg-gray-100 transition h-10"
          >
            ADD TO CART
          </button>
        </div>
      </article>
    </Link>
  );
}
