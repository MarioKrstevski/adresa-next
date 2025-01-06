"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Listing,
  PropertyCategory,
  PropertyTransactionType,
} from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getMunicipalityOptionsTranslated,
  getMunicipalityPlacesTranslated,
} from "@/lib/data/macedonia/importantData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { extractFromUrl, replaceFilterInUrl } from "@/lib/filters";

export default function SearchBreadcrumbs({
  listings,
}: {
  listings: Listing[];
}) {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let [transactionType, setTransactionType] = useState<PropertyTransactionType>(
    // TODO: This doesn't set the default value correctly
    () =>
      extractFromUrl(pathname, "transactionType") as PropertyTransactionType,
  );

  let [category, setCategory] = useState<PropertyCategory>(
    () => extractFromUrl(pathname, "category") as PropertyCategory,
  );

  let [location, setLocation] = useState<string | string[]>(
    () => extractFromUrl(pathname, "location") as string | string[],
  );

  if (Array.isArray(location)) {
    return null;
  }

  let municipalityFromUrl = "";
  let placeFromUrl = "";
  if (location.startsWith("1")) {
    municipalityFromUrl = location;
  } else if (location.startsWith("2")) {
    municipalityFromUrl = `100${location[1]}${location[2]}`;
    placeFromUrl = location;
  }

  const { municipality, places } = getMunicipalityPlacesTranslated(
    municipalityFromUrl,
    locale,
  );
  const currentMunicipality = municipality?.value;
  const currentPlace = places?.find((p) => p.value === placeFromUrl)?.value;
  const municipalitiesOptions = getMunicipalityOptionsTranslated(locale);
  const listing = listings[0];

  return (
    <div className="py-3 text-sm">
      <Breadcrumb>
        <BreadcrumbList className="gap-1 sm:gap-1">
          <BreadcrumbItem className="text-xs">
            {/* <BreadcrumbLink href={`/search?mode=${transactionType}`}> */}
            {t("common.filters.mode." + transactionType)}
            {/* </BreadcrumbLink> */}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-xs">
            <Select
              value={currentMunicipality}
              onValueChange={(value) => {
                if (pathname) {
                  const newPath = replaceFilterInUrl(
                    pathname,
                    "location",
                    value,
                    searchParams,
                  );
                  router.push(newPath);
                }
              }}
            >
              <SelectTrigger className="h-auto border-0 p-0 text-xs hover:no-underline [&>span]:p-0">
                <SelectValue placeholder={t("common.filters.location.label")} />
              </SelectTrigger>
              <SelectContent>
                {municipalitiesOptions.map((municipality) => (
                  <SelectItem
                    key={municipality.value}
                    value={municipality.value}
                  >
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
                  value={currentPlace}
                  onValueChange={(value) => {
                    if (pathname) {
                      const newPath = replaceFilterInUrl(
                        pathname,
                        "location",
                        value,
                        searchParams,
                      );
                      router.push(newPath);
                    }
                  }}
                >
                  <SelectTrigger className="h-auto border-0 p-0 text-xs hover:no-underline [&>span]:p-0">
                    <SelectValue
                      placeholder={t("common.filters.location.label")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {places.map((place) => (
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
    </div>
  );
}
