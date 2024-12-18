"use client";

import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import { ChevronDown, House } from "lucide-react";
import { propertyTypes } from "@/lib/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelectedFilter } from "@/hooks/useSelectedFilter";
import { propertyTypeValues } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/hooks/useFilters";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface PropertyTypeFilterProps {
  variant: "homepage" | "search";
}
export default function PropertyTypeFilter({
  variant,
}: PropertyTypeFilterProps) {
  const filters = useFilters((store) => store.filters);
  const updateFilters = useFilters((store) => store.updateFilters);
  const t = useTranslations();
  const focusedFilter = useSelectedFilter((store) => store.selectedFilter);

  const [isOpen, setIsOpen] = useState(false);

  const setFocusedFilter = useSelectedFilter(
    (store) => store.setSelectedFilter,
  );
  let [propertyType, setPropertyType] = useQueryState("propertyType", {
    shallow: false,
  });

  if (variant === "homepage") {
    propertyType = filters.propertyType;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {variant === "homepage" ? (
          // BIG VARIANT
          <div
            className={cn(
              "h-[90px] w-[185px] overflow-visible rounded-bl-xl border-b-0 border-slate-200 p-4 sm:border-b xl:rounded-bl-none xl:border-t smaller:border-r",
              focusedFilter === "property-type" &&
                "relative z-20 rounded-t border-b-white bg-white shadow-lg",
              !focusedFilter && "bg-gray-50",
            )}
            onClick={() => {
              setFocusedFilter("property-type");
            }}
          >
            <div className="">
              <div className="flex flex-col gap-1.5 text-brand-dark-blue">
                <label
                  className="flex h-5 w-full items-center gap-2"
                  htmlFor={"property-type"}
                >
                  {<House className="h-4 w-4" />}
                  {t("common.filters.propertyType.label")}
                </label>
                <div className="flex h-10 items-center text-sm">
                  {(propertyType &&
                    t(`common.filters.propertyType.${propertyType}`)) || (
                    <span className="text-gray-400">
                      {t("common.filters.propertyType.emptyPlaceholder")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="h-8 px-1 py-0.5 md:h-10 md:px-2 md:py-1"
            onClick={() => {
              console.log(propertyType);
            }}
          >
            <span className="capitalize">
              {propertyType
                ? t(`common.filters.propertyType.${propertyType}`)
                : t("common.filters.propertyType.label")}
            </span>
            <ChevronDown width={20} className="h-4 w-4 md:ml-2 md:h-5 md:w-5" />{" "}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent asChild align="start" className="testt">
        <ul className="relative rounded bg-white p-2 text-sm shadow-lg">
          {propertyTypes.map((type: propertyTypeValues) => (
            <li
              key={type}
              className={cn(
                "cursor-pointer rounded px-2 py-1 hover:bg-green-50",
                propertyType === type && "bg-green-50 text-brand-dark-blue",
              )}
              onClick={() => {
                if (variant === "homepage") {
                  updateFilters({
                    propertyType: type,
                  });
                } else {
                  setPropertyType(type);
                }
                setIsOpen(false);
              }}
            >
              {t(`common.filters.propertyType.${type}`)}
            </li>
          ))}
        </ul>
      </PopoverContent>{" "}
    </Popover>
  );
}
