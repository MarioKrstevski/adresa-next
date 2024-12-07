"use client";
import ListingActions from "./ListingActions";
import { cn, displayPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { SerializedListing } from "@/lib/types";
import { Listing } from "@prisma/client";
export default function StickyControls({ listing }: { listing: Listing }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollThreshold = 300; // Adjust this value
    if (window.scrollY > scrollThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section
      className={cn(
        "left-0 right-0 top-0 z-[500] flex h-20 items-center overflow-hidden bg-white py-2.5 shadow-md",
        isVisible ? "fixed opacity-100" : "hidden opacity-0",
      )}
    >
      <div className="flex w-full px-5">
        <div className="relative flex w-full flex-1 flex-shrink flex-nowrap items-center pl-[80px]">
          <div className="absolute left-0 h-20 w-[72px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={listing.mainImage || "/assets/missing-image2.jpg"}
              className="relateive h-full w-full object-cover object-center"
              loading="lazy"
              alt="Main image small"
            />
          </div>
          <div className="flex-shrink-0 flex-grow-0">
            <strong className="block capitalize">
              {listing.type}, {listing.area}m²
            </strong>
            <span className="block text-xs">{listing.address}</span>
          </div>
          <div className="flex-1 flex-shrink pl-[8%]">
            <div className="font-semibold">
              <span>{displayPrice(listing.price)}</span>
            </div>
          </div>
        </div>
        <ListingActions listing={listing} />
      </div>
    </section>
  );
}
