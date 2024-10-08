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

interface PropertyTypeFilterProps {
  variant: "homepage" | "search";
}
export default function PropertyTypeFilter({
  variant,
}: PropertyTypeFilterProps) {
  const filters = useFilters((store) => store.filters);
  const updateFilters = useFilters((store) => store.updateFilters);
  const focusedFilter = useSelectedFilter(
    (store) => store.selectedFilter
  );
  const setFocusedFilter = useSelectedFilter(
    (store) => store.setSelectedFilter
  );
  let [propertyType, setPropertyType] = useQueryState(
    "propertyType",
    {
      shallow: false,
    }
  );

  if (variant === "homepage") {
    propertyType = filters.propertyType;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {variant === "homepage" ? (
          // BIG VARIANT
          <div
            className={cn(
              "p-4  border-r border-r-black overflow-visible h-[90px] w-[185px] ",
              focusedFilter === "property-type" &&
                "shadow-lg bg-white rounded-t z-10",
              !focusedFilter && "bg-gray-50 "
            )}
            onClick={() => {
              setFocusedFilter("property-type");
            }}
          >
            <div className="">
              <div className="flex flex-col gap-1.5 text-brand-dark-blue">
                <label
                  className="h-5 flex w-full gap-2 items-center"
                  htmlFor={"property-type"}
                >
                  {<House size={22} />} {"Property Type"}
                </label>
                <div className="text-sm h-10 flex items-center">
                  {propertyType || (
                    <span className="text-gray-400">Home</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Button variant="outline">
            <span className="capitalize">
              {propertyType || "Property Type"}
            </span>
            <ChevronDown width={20} className="ml-2" />{" "}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent asChild align="start">
        <ul className="w-[184px] p-2  relative text-sm  bg-white rounded shadow-lg">
          {propertyTypes.map((type: propertyTypeValues) => (
            <li
              key={type}
              className={cn(
                "px-2 py-1 hover:bg-green-50 cursor-pointer rounded",
                propertyType === type &&
                  "bg-green-50 text-brand-dark-blue"
              )}
              onClick={() => {
                if (variant === "homepage") {
                  updateFilters({
                    propertyType: type.toLowerCase(),
                  });
                } else {
                  setPropertyType(type.toLowerCase());
                }
              }}
            >
              {type}
            </li>
          ))}
        </ul>
      </PopoverContent>{" "}
    </Popover>
  );
}
