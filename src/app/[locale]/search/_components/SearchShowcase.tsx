"use client";
import {
  ArrowDown,
  Bath,
  Bed,
  Crown,
  ImageIcon,
  LampFloor,
  MapPin,
} from "lucide-react";

import { Link } from "@/i18n/routing";
import { displayPrice } from "@/lib/utils";
import ImagesCarousel from "./ImagesCarousel";
import LikeListingButton from "./LikeListingButton";
import { cn, displayDate } from "@/lib/utils";

import {
  ListingWithFavoritedBy,
  UploadedImageData,
} from "@/types/listing.types";
import { useTranslations } from "next-intl";
import { Listing, User } from "@prisma/client";
interface SearchShowcaseProps {
  listing: Listing;
  images: UploadedImageData[];
  description: string;
}
export default function SearchShowcase({
  listing,
  images,
  description,
}: SearchShowcaseProps) {
  const t = useTranslations("common");

  return (
    <li
      key={listing.id}
      className={cn("")}
      onMouseOver={() =>
        window &&
        // @ts-ignore
        window.setSelectedListingId &&
        // @ts-ignore
        window.setSelectedListingId(listing.id)
      }
      onMouseLeave={() =>
        // @ts-ignore
        window &&
        // @ts-ignore
        window.setSelectedListingId &&
        // @ts-ignore
        window.setSelectedListingId(null)
      }
    >
      <article className="mb-5 w-full">
        <div
          className={cn(
            "group relative flex w-full overflow-hidden rounded-lg border border-solid bg-white shadow drop-shadow transition-all ease-linear hover:shadow-xl",
            listing.isPaidPromo && "border border-orange-500",
          )}
        >
          <figure className="relative mx-auto my-0 block">
            <div className="pointer-events-none absolute left-0 top-0 z-50 hidden w-full items-center overflow-hidden px-3.5 py-2.5 group-hover:flex">
              <div className="flex items-center gap-1.5 text-white">
                <ImageIcon size={14} />
                <span className="font-bold">{images.length}</span>
              </div>
              <div></div>
            </div>
            <div className="h-[240px] w-[260px]">
              <ImagesCarousel images={images} height={240} width={260} />
            </div>
            <figcaption className="hidden">
              {t("listing.type", { type: listing.type })}, {listing.area}
              m²
            </figcaption>
          </figure>
          <div className="relative flex-1 px-5 pb-2.5 pt-3.5">
            <div className="flex h-full flex-col justify-between">
              <div className="relative mb-2 max-w-full">
                <h3 className="mb-1.5 overflow-hidden text-lg font-medium leading-6">
                  <span className="capitalize">
                    {t("listing.type", { type: listing.type })}
                  </span>
                  , {listing.area}m²
                </h3>
                <h3 className="mb-2.5 overflow-hidden text-xs leading-5">
                  {listing.municipality || t("listing.defaultMunicipality")}
                </h3>
                <p className="mb-2.5 line-clamp-2 overflow-hidden text-xs leading-5">
                  {description}
                </p>

                <div className="flex items-center gap-6">
                  <ul className="flex gap-1.5">
                    <li
                      title={t("listing.features.floor")}
                      className="flex items-center text-xs tracking-tighter"
                    >
                      <LampFloor width={17} height={17} className="mr-1" />
                      <span>
                        <span className="mr-0.5 text-sm font-medium">
                          {/* {listing.livingRooms} */}
                        </span>
                      </span>
                    </li>
                    <li
                      title={t("listing.features.bedrooms")}
                      className="flex items-center text-xs tracking-tighter"
                    >
                      <Bed width={17} height={17} className="mr-1" />
                      <span>
                        <span className="mr-0.5 text-sm font-medium">
                          {/* {listing.bedrooms} */}
                        </span>
                        {t("listing.features.bedroomsAbbr")}
                      </span>
                    </li>
                    <li
                      title={t("listing.features.bathrooms")}
                      className="flex items-center text-xs tracking-tighter"
                    >
                      <Bath width={17} height={17} className="mr-1" />
                      <span>
                        <span className="mr-0.5 text-sm font-medium">
                          {/* {listing.bathrooms} */}
                        </span>
                        {t("listing.features.bathroomsAbbr")}
                      </span>
                    </li>
                  </ul>
                  <p className="text-xs">
                    <span className="text-gray-500">
                      {t("listing.updated")}:{" "}
                    </span>
                    <time dateTime={displayDate(listing.updatedAt) || ""}>
                      {displayDate(listing.updatedAt) || ""}
                    </time>
                  </p>
                </div>
              </div>
              <div className="mt-auto max-w-full">
                <div className="mb-1.5 flex items-center">
                  <p className="text-xl font-bold leading-4 tracking-tighter">
                    {displayPrice(listing.price)}
                  </p>
                  {listing.previousPrice &&
                    listing.previousPrice > (listing.price ?? 0) && (
                      <div className="flex items-center">
                        <ArrowDown
                          className="lowered-price ml-2.5 mr-1"
                          stroke="green"
                        />
                        <span className="text-sm text-gray-400 line-through">
                          €{displayPrice(listing.previousPrice)}
                        </span>
                      </div>
                    )}
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1">
                    {listing.isPaidPromo && (
                      <span
                        title={t("listing.labels.featured")}
                        className="inline-block items-center gap-1.5 rounded border p-0.5 text-xs shadow-sm"
                      >
                        <Crown size={16} />
                      </span>
                    )}

                    {listing.locationPrecision === "exact" && (
                      <span
                        title={t("listing.labels.exactLocation")}
                        className="inline-block items-center gap-1.5 rounded border p-0.5 text-xs shadow-sm"
                      >
                        <MapPin size={16} />
                      </span>
                    )}
                  </div>
                  <div className="invisible relative z-10 ml-auto group-hover:visible">
                    <ul className="flex gap-1">
                      {/* <li>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 px-0.5 text-brand-light-blue hover:text-brand-dark-blue"
                    title={t("listing.actions.hide")}
                  >
                    <EyeOff className="h-5 w-5" />
                  </Button>
                </li> */}

                      <li>
                        <LikeListingButton listingId={listing.id} />
                      </li>
                      {/* <li>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 px-0.5 text-brand-light-blue hover:text-brand-dark-blue"
                    title={t("listing.actions.contact")}
                  >
                    <Mail />
                  </Button>
                </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Link
              tabIndex={-1}
              target="_blank"
              key={listing.id}
              className="absolute inset-0 z-0"
              href={"/listing/" + listing.listingNumber}
            ></Link>
          </div>
        </div>
      </article>
    </li>
  );
}