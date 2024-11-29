"use client";
import { cn } from "@/lib/utils";
import { ChevronDown, Tag } from "lucide-react";
import { priceFilterOptions } from "@/lib/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelectedFilter } from "@/hooks/useSelectedFilter";
import { useFilters } from "@/hooks/useFilters";
import { Button } from "@/components/ui/button";
import { parseAsString, useQueryState } from "nuqs";
import { useTranslations } from "next-intl";

interface PriceFilterProps {
  variant: "homepage" | "search";
}
export default function PriceFilter({ variant }: PriceFilterProps) {
  const filters = useFilters((store) => store.filters);
  const updateFilters = useFilters((store) => store.updateFilters);
  const t = useTranslations();

  let [priceLow, setPriceLow] = useQueryState(
    "priceLow",
    parseAsString.withOptions({ shallow: false }).withDefault(""),
  );
  let [priceHigh, setPriceHigh] = useQueryState(
    "priceHigh",
    parseAsString.withOptions({ shallow: false }).withDefault(""),
  );
  const focusedFilter = useSelectedFilter((store) => store.selectedFilter);

  const setFocusedFilter = useSelectedFilter(
    (store) => store.setSelectedFilter,
  );

  if (variant === "homepage") {
    priceLow = filters.priceLow;
    priceHigh = filters.priceHigh;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {variant === "homepage" ? (
          <div
            className={cn(
              "h-[90px] w-[230px] overflow-visible border-b-0 border-r-0 border-slate-200 p-4 sm:border-b sm:border-r xl:border-t",
              focusedFilter === "price" && "z-10 rounded-t bg-white shadow-lg",
              !focusedFilter && "bg-gray-50",
            )}
            onClick={() => {
              setFocusedFilter("price");
            }}
          >
            <div className="">
              <div className="flex flex-col gap-1.5 text-brand-dark-blue">
                <label className="flex h-5 w-full items-center gap-2">
                  {<Tag className="h-4 w-4" />}{" "}
                  {t("common.filters.price.label")}
                </label>
                <div className="flex h-10 items-center text-sm">
                  {/* both are set */}
                  {priceLow && priceHigh && (
                    <span className="text-brand-dark-blue">
                      {priceLow} - {priceHigh} €
                    </span>
                  )}

                  {/* only from is set */}
                  {priceLow && !priceHigh && (
                    <span className="text-brand-dark-blue">
                      {t("common.filters.price.from")} {priceLow} €
                    </span>
                  )}

                  {/* only to is set */}
                  {!priceLow && priceHigh && (
                    <span className="text-brand-dark-blue">
                      {t("common.filters.price.upTo")} {priceHigh} €
                    </span>
                  )}
                  {/* nothing is set */}
                  {!priceLow && !priceHigh && (
                    <span className="tracking-tighter text-gray-400">
                      € {t("common.filters.price.from")} -{" "}
                      {t("common.filters.price.to")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : variant === "search" ? (
          <Button variant="outline">
            <span className="capitalize">
              {priceLow && priceHigh && (
                <span className="">
                  {priceLow} - {priceHigh} €
                </span>
              )}

              {/* only from is set */}
              {priceLow && !priceHigh && (
                <span className="">
                  {t("common.filters.price.from")} {priceLow} €
                </span>
              )}

              {/* only to is set */}
              {!priceLow && priceHigh && (
                <span className="">
                  {t("common.filters.price.upTo")} {priceHigh} €
                </span>
              )}
              {/* nothing is set */}
              {!priceLow && !priceHigh && (
                <span className="tracking-tighter">
                  {t("common.filters.price.label")}
                </span>
              )}
            </span>
            <ChevronDown width={20} className="ml-2" />{" "}
          </Button>
        ) : null}
      </PopoverTrigger>
      <PopoverContent asChild align="start">
        <div
          className={cn(
            "relative flex rounded px-1 shadow-lg",
            variant === "homepage" && "w-[458px]",
            variant === "search" && "w-[300px]",
          )}
        >
          <div
            className={cn(
              "rounded-bl bg-white py-3",
              variant === "homepage" && "w-[229px] px-5",
              variant === "search" && "w-[150px] px-2",
            )}
          >
            <div className="mb-1.5 focus-within:text-brand-dark-blue">
              <label htmlFor="price-from" className="text-xs">
                € {t("common.filters.price.from")}
              </label>
              <input
                className="w-full rounded border border-gray-300 p-1 px-4 text-black"
                name="price-from"
                id="price-from"
                type="text"
                placeholder="10,000"
                value={priceLow}
                onChange={(e) => {
                  if (variant === "homepage") {
                    updateFilters({
                      priceLow: e.target.value,
                    });
                  } else {
                    setPriceLow(e.target.value);
                  }
                }}
              />
            </div>
            <ul className="relative max-h-[175px] overflow-y-auto rounded rounded-t-none bg-white text-sm">
              {priceFilterOptions.map((price) => (
                <li
                  key={price}
                  className={cn(
                    "cursor-pointer rounded px-2 py-1 hover:bg-green-50",
                    priceLow === price && "bg-green-50 text-brand-dark-blue",
                    priceLow === "" &&
                      price === "Any" &&
                      "bg-green-50 text-brand-dark-blue",
                  )}
                  onClick={() => {
                    if (variant === "homepage") {
                      updateFilters({
                        priceLow: price === "Any" ? "" : price,
                      });
                    } else {
                      setPriceLow(price === "Any" ? "" : price);
                    }
                  }}
                >
                  {price === "Any" ? t("common.filters.price.any") : price}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={cn(
              "rounded-bl bg-white py-3",
              variant === "homepage" && "w-[229px] px-5",
              variant === "search" && "w-[150px] px-2",
            )}
          >
            <div className="mb-1.5 focus-within:text-brand-dark-blue">
              <label htmlFor="price-to" className="text-xs">
                € {t("common.filters.price.upTo")}
              </label>
              <input
                className="w-full rounded border border-gray-300 p-1 px-4 text-black"
                name="price-to"
                id="price-to"
                type="text"
                placeholder="10,000"
                value={priceHigh}
                onChange={(e) => {
                  if (variant === "homepage") {
                    updateFilters({
                      priceHigh: e.target.value,
                    });
                  } else {
                    setPriceHigh(e.target.value);
                  }
                }}
              />
            </div>
            <ul className="relative max-h-[175px] overflow-y-auto rounded rounded-t-none bg-white p-2 text-sm">
              {priceFilterOptions.map((price) => (
                <li
                  key={price}
                  className={cn(
                    "cursor-pointer rounded px-2 py-1 hover:bg-green-50",
                    priceHigh === price && "bg-green-50 text-brand-dark-blue",
                    priceHigh === "" &&
                      price === "Any" &&
                      "bg-green-50 text-brand-dark-blue",
                  )}
                  onClick={() => {
                    if (variant === "homepage") {
                      updateFilters({
                        priceHigh: price === "Any" ? "" : price,
                      });
                    } else {
                      setPriceHigh(price === "Any" ? "" : price);
                    }
                  }}
                >
                  {price === "Any" ? t("common.filters.price.any") : price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
