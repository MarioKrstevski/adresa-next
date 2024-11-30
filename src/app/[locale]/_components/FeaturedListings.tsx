import React from "react";
import { ScanSearch } from "lucide-react";
import ContentCarousel from "./ContentCarousel";
import prismadb from "@/lib/db";
import RecentlyViewedListingCard from "./RecentlyViewedListingCard";
import { getTranslations } from "next-intl/server";

export default async function FeaturedListings() {
  const t = await getTranslations();
  const listings = await prismadb.listing.findMany({
    take: 6,
  });
  return (
    <ContentCarousel
      icon={<ScanSearch className="h-7 w-7" />}
      title={t("home.sections.lastSearches")}
      items={listings}
      renderItem={(listing) => <RecentlyViewedListingCard listing={listing} />}
      contentClasses="" // Example height
      carouselItemContainerClasses="min-w-[336px]"
      carouselItemClasses="h-full"
    />
  );
}
