// export const dynamic = "force-static";
export const revalidate = 60;

// export const metadata = {
//   title: "Listing Details",
//   description: "View property listing details",
//   openGraph: {
//     title: "Listing Details",
//     description: "View property listing details",
//   },
// };

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { AirVentIcon, Heart, Percent } from "lucide-react";
import MiniContactForm from "./_components/MiniContactForm";
import RevealButton from "@/components/shared/RevealButton";
import { displayArea, displayDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/db";
import {
  ListingDescriptions,
  ListingTitles,
  ListingWithRelations,
  listingWithRelationsInclude,
  UploadedImageData,
} from "@/types/listing.types";
import ListingBreadcrumbs from "./_components/ListingBreadcrumbs";
import { Link, redirect } from "@/i18n/routing";
import ListingActions from "./_components/ListingActions";
import ListingImages from "./_components/ListingImages";
import FeaturesTable from "./_components/FeaturesTable";
import { getLocale, getTranslations } from "next-intl/server";

import StickyControls from "./_components/StickyControls";

import MapLocationPreview from "@/components/shared/MapLocationPreviewClient";
import PriceDisplay from "./_components/PriceDisplay";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import PublisherInfo from "./_components/PublisherInfo";
import { Listing } from "@prisma/client";
import { getMunicipalityPlacesTranslated } from "@/lib/data/macedonia/importantData";
import ListingFeatures from "./_components/ListingFeatures";
import { ExpandableDescription } from "./_components/ExpandableDescription";
import { Metadata } from "next";
import {
  getListing,
  registerListingView,
} from "@/server/actions/listing.actions";
import { headers } from "next/headers";
import CalculateMortgageButton from "./_components/CalculateMortgageButton";
import ImportantFeatures from "./_components/ImportantFeatures";
import BackButton from "./_components/BackButton";
import RecentlyViewedListingHandler from "./_components/RecentlyViewedListingHandler";

interface SingleListingPageProps {
  params: Promise<{
    listingNumber: string;
  }>;
}

export async function generateMetadata({
  params,
}: SingleListingPageProps): Promise<Metadata> {
  const { listingNumber } = await params;
  const listing = await getListing(Number(listingNumber)); // Your listing fetch function
  const locale = await getLocale();
  const images = listing.images as UploadedImageData[];
  const title = listing[`${locale}Title` as keyof ListingTitles] || "";

  return {
    title: `${title} - ${listing.price}€`,
    description: `${listing.area}m² ${listing.transactionType} in ${listing.municipality}, ${listing.place}`,
    openGraph: {
      title: `${title} - ${listing.price}€`,
      description: `${listing.area}m² ${listing.transactionType} in ${listing.municipality}, ${listing.place}`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/listing/${listing.listingNumber}`,
      images: [
        {
          url: images[0]?.url || "", // First image or default
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
  };
}

export default async function SingleListingPage({
  params,
}: SingleListingPageProps) {
  const { listingNumber } = await params;

  // console.log("listingNumber", listingNumber);
  if (isNaN(Number(listingNumber))) {
    return <div>Not a listing number</div>;
  }
  const locale = await getLocale();
  const headersList = await headers();

  const listing = (await prismadb.listing.findUnique({
    where: { listingNumber: Number(listingNumber) },
    include: listingWithRelationsInclude,
  })) as Listing | null;

  if (!listing) {
    redirect({ href: "/404", locale: locale });
    return null;
  }

  await registerListingView(listing.id, {
    headersList,
    locale,
  });
  // Increment view count

  // Log or process the IP address and locale

  const t = await getTranslations();
  const lwr = listing as ListingWithRelations;

  // console.log("Listing", listing);
  // console.log("Listing", {
  //   cateogry: common.property.category,
  //   tType: listing.transactionType,
  //   // lF: lwr.listingFeatures,
  // });
  const { municipality, places } = getMunicipalityPlacesTranslated(
    listing.municipality,
    locale,
  );

  const currentMunicipalityLabel = municipality?.label;
  const currentPlaceLabel = places?.find(
    (place) => place.value === listing.place,
  )?.label;

  let description =
    listing[`${locale}Description` as keyof ListingDescriptions] || "";
  let title = listing[`${locale}Title` as keyof ListingTitles] || "";

  const fullAddress = `${currentMunicipalityLabel}, ${currentPlaceLabel}, ${listing.address}`;
  const pinPopupText = `${t(`common.property.type.${listing.type}`)}, ${displayArea(listing.area)}, ${currentPlaceLabel}, ${currentMunicipalityLabel}, `;
  // const rawListing = await getListing(listingNumber);
  // const listing = serializeDates(rawListing);
  // const publisherData = extractPublisherData(listing);

  return (
    <article className="">
      <RecentlyViewedListingHandler listing={listing} />
      {/* Above Images Breadcrumbs and Action Buttons */}
      <section className="px-0 py-4">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 md:flex-row">
          <BackButton />
          <ListingBreadcrumbs listing={listing} />
          <ListingActions listing={listing} />
        </div>
      </section>

      {/* Sticky Header */}
      <StickyControls listing={listing} />
      {/* Images */}
      <section className="mx-auto w-full px-5 lg:max-w-7xl">
        <ListingImages listing={listing} />
      </section>
      {/* Main section with Info */}
      <section className="mx-auto w-full px-5 lg:max-w-7xl">
        <div className="flex flex-wrap">
          {/* Listing Main */}
          <div className="flex-1 md:pr-2.5 lg:pr-12">
            {/* Main Info - Title - Address Phone */}
            <div className="flex pb-5 pt-9 md:py-9">
              <div className="flex-1 pr-2 md:pr-7">
                <h1 className="text-xl font-medium md:text-3xl">{title}</h1>
                <p className="pt-2 text-sm tracking-tight md:text-base">
                  {fullAddress}
                </p>
              </div>
              <div className="max-w-[230px] flex-shrink-0 flex-grow-0">
                <span className="float-right mb-3">
                  <RevealButton
                    variant="outline"
                    usecase="phone"
                    value={
                      lwr.user?.phone || lwr.agency?.contactPersonPhone || ""
                    }
                  />
                </span>
                <p className="mt-2.5 text-sm">
                  {t("common.property.metadata.posted")}{" "}
                  {displayDate(listing.publishedAt)}
                </p>
              </div>
            </div>

            {/* Price and Buttons - Interactions */}
            <div className="flex items-center justify-between">
              {/* Features Highlight - some imporant features mentioned */}
              <ImportantFeatures listing={listing} />
              <PriceDisplay listing={listing} />
            </div>

            {/* Mortgages Options */}
            <Separator className="my-3 bg-slate-400" />
            <div className="my-4 flex flex-wrap items-center justify-center gap-4 lg:flex-nowrap lg:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/halkbank-logo.png" alt="Halkbank" />
              <span>{t("common.property.mortgage.options")}</span>
              <CalculateMortgageButton />
            </div>
            <Separator className="my-3 bg-slate-400" />

            {/* Description */}
            <div className="my-7">
              <h3 className="mb-3 text-lg font-semibold">
                {t("common.property.description")}
              </h3>
              <ExpandableDescription
                text={description}
                maxHeight={130}
                className="text-lg text-gray-700 duration-1000"
              />
            </div>

            <Separator className="my-3 bg-slate-400" />

            {/* Characteristics */}
            <div className="my-7">
              <h3 className="mb-3 text-lg font-semibold">
                {t("common.property.characteristics")}
              </h3>
              <div>
                <FeaturesTable listing={listing} />
                <ListingFeatures listing={listing} />
              </div>
            </div>
            <Separator className="my-3 bg-slate-400" />

            {/* Map Location */}
            <div>
              <h3 className="text-lg font-semibold">
                {t("common.property.location")}
              </h3>
              <p className="my-2.5 text-xl font-light">{fullAddress}</p>
              <MapLocationPreview
                listing={listing}
                pinPopupText={pinPopupText}
              />
            </div>
            <Separator className="my-3 bg-slate-400" />
            {/* Mortgage Calculator */}
            <MortgageCalculator initialPrice={listing.price || 0} />
            {/* Publisher  */}
            <div className="my-6">
              <h3 className="mb-3 text-lg font-semibold">
                {t("common.property.publisher")}
              </h3>
              <PublisherInfo agency={lwr.agency} user={lwr.user} />
            </div>
          </div>
          {/* Listing Sidebar */}
          <div className="w-full max-w-full flex-shrink-0 pt-9 md:w-[330px] lg:w-[380px]">
            <MiniContactForm listing={listing} />
          </div>
        </div>
        {/* Publisher (Agency) Details */}
        {/* <div className="mt-10 flex flex-wrap md:mt-14"></div> */}
      </section>
    </article>
  );
}
