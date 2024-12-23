"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useLocale, useTranslations } from "next-intl";
import TransactionTypeSwitchButton from "./TransactionTypeSwitchButton";
import { PropertyCategory } from "@prisma/client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { extractFromUrl } from "@/lib/filters";
import { PropertyTransactionType } from "@prisma/client";
import {
  getMunicipalityOptionsTranslated,
  getMunicipalityPlacesTranslated,
} from "@/lib/data/macedonia/importantData";

export default function ListingsListTitle() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();

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

  if (!Array.isArray(location)) {
    location = [location];
  }

  const muniTranslated = getMunicipalityOptionsTranslated(locale);

  const locationLabel = location
    .map((place: string) => {
      const municipality = muniTranslated.find((m) => m.value === place)?.label;
      return municipality;
    })
    .join(", ");
  const title = `${t(`common.filters.category.${category}`)} ${t("common.words.for")} ${t(`common.filters.mode.${transactionType}`).toLowerCase()}:${locationLabel}`;

  return (
    <div className="flex items-start justify-between">
      <h3 className="mb-3.5 mt-2.5 text-xl font-medium md:text-2xl">{title}</h3>
      <div className="mt-2.5">
        <TransactionTypeSwitchButton />
      </div>
    </div>
  );
}
