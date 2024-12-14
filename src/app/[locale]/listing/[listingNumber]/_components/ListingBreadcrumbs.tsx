"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getMunicipalityPlaces,
  municipalitiesOptions,
} from "@/lib/data/macedoniaOld/importantData";

import {
  getMunicipalitiesOptions,
  getMunicipalityOptionsTranslated,
  getMunicipalityPlacesTranslated,
} from "@/lib/data/macedonia/importantData";
import { Listing } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function ListingBreadcrumbs({ listing }: { listing: Listing }) {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const municipalitiesOptions = getMunicipalityOptionsTranslated(locale);

  const placesOptions = listing.municipality
    ? getMunicipalityPlacesTranslated(listing.municipality, locale).places
    : [];

  const currentPlace = placesOptions?.find((p) => p.value === listing.place);

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-0.5 md:gap-0.5">
        {/* <BreadcrumbItem className="text-xs">
          <BreadcrumbLink href="/">
            {t("listing.breadcrumbs.home")}
          </BreadcrumbLink>
        </BreadcrumbItem> */}
        {/* <BreadcrumbSeparator /> */}
        <BreadcrumbItem className="text-xs">
          <BreadcrumbLink href={`/search?mode=${listing.transactionType}`}>
            {t("common.filters.mode." + listing.transactionType)}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="text-xs">
          <Select
            value={listing.municipality || ""}
            onValueChange={(value) => {
              router.push(
                `/search?mode=${listing.transactionType}&municipality=${value}`,
              );
            }}
          >
            <SelectTrigger className="h-auto border-0 p-0 text-xs hover:no-underline [&>span]:p-0">
              <SelectValue placeholder={t("common.filters.location.label")} />
            </SelectTrigger>
            <SelectContent>
              {municipalitiesOptions.map((municipality) => (
                <SelectItem key={municipality.value} value={municipality.value}>
                  {municipality.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </BreadcrumbItem>
        {currentPlace && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-xs">
              <Select
                value={listing.place || ""}
                onValueChange={(value) => {
                  router.push(
                    `/search?mode=${listing.transactionType}&municipality=${listing.municipality}&place=${value}`,
                  );
                }}
              >
                <SelectTrigger className="h-auto border-0 p-0 text-xs hover:no-underline [&>span]:p-0">
                  <SelectValue
                    placeholder={t("common.filters.location.label")}
                  />
                </SelectTrigger>
                <SelectContent>
                  {placesOptions.map((place) => (
                    <SelectItem key={place.value} value={place.value}>
                      {place.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
