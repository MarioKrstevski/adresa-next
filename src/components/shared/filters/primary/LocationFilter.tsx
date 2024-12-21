import { useCallback, useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Fuse from "fuse.js";
import { useDebounceValue } from "usehooks-ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFilters } from "@/hooks/useFilters";
import { useSelectedFilter } from "@/hooks/useSelectedFilter";
import { useLocale, useTranslations } from "next-intl";
import {
  getAllMunicipalitiesWithPlacesTranslated,
  TranslatedOption,
  TranslatedOptionWithMaybePlaces,
} from "@/lib/data/macedonia/importantData";

type Tag = {
  label: string;
  value: string;
};

function BigVariant({ isOpen }: { isOpen: boolean }) {
  const focusedFilter = useSelectedFilter((store) => store.selectedFilter);
  const t = useTranslations();

  const setFocusedFilter = useSelectedFilter(
    (store) => store.setSelectedFilter,
  );
  const filters = useFilters((store) => store.filters);
  const updateFilters = useFilters((store) => store.updateFilters);

  const [location, setLocation] = useState("");
  const [debouncedLocation, setDebouncedFilterLocation] = useDebounceValue(
    filters.location,
    400,
  );
  //effect description
  useEffect(() => {
    // updateFilters({ location: debouncedLocation });
    setDebouncedFilterLocation(location);
  }, [location, setDebouncedFilterLocation]);

  useEffect(() => {
    // updateFilters({ location: debouncedLocation });
  }, [debouncedLocation]);

  const locale = useLocale();
  const getLocationDropdownOptions = useCallback(() => {
    const translatedPlaces = getAllMunicipalitiesWithPlacesTranslated(locale);
    const options = translatedPlaces.reduce((acc, municipality) => {
      acc.push({
        label: municipality.label,
        value: municipality.value,
      });
      if (municipality.places) {
        municipality.places.forEach((place) => {
          acc.push({
            label: `${municipality.label}, ${place.label}`,
            value: place.value,
          });
        });
      }
      return acc;
    }, [] as TranslatedOption[]);
    const fuse = new Fuse(options, {
      keys: ["label"],
    });
    const filteredOptions = fuse.search(debouncedLocation);
    console.log("fuse", filteredOptions);
    const results = filteredOptions.map((o) => o.item).slice(0, 6);
    return { options, translatedPlaces, fuseResults: results };
  }, [locale, debouncedLocation]);
  const locationDropdown = getLocationDropdownOptions();
  const [tags, setTags] = useState<Tag[]>(() => {
    return filters.location.split(",").map((value) => ({
      value: value,
      label:
        getLocationDropdownOptions().translatedPlaces.find(
          (o) => o.value === value,
        )?.label || "",
    }));
  });

  function handleUpdateTags(location: TranslatedOption) {
    const newTags = [...tags, location];
    setTags(newTags);
  }
  function handleRemoveTag(value: string) {
    const newTags = tags.filter((t) => t.value !== value);
    setTags(newTags);
    updateFilters({
      location: newTags.map((t) => t.value).join(","),
    });
  }

  //focus field on selection of the space around it for location
  // useEffect(() => {
  //   if (focusedFilter === "location") {
  //     document.getElementById("location")?.focus();
  //   }
  // }, [focusedFilter]);

  return (
    <div
      className={cn(
        "relative h-full min-h-[88px] w-full max-w-full rounded-xl border border-transparent bg-gray-100 pb-[6px] pl-[20px] pr-[19px] pt-[17px]",
        focusedFilter === "location" && "rounded-b-none",
        !focusedFilter && "",
      )}
      onClick={() => {
        setFocusedFilter("location");
        document.getElementById("location")?.focus();
      }}
    >
      <div
        className={cn(
          "flex h-[calc(100%_+2px)] flex-col gap-1.5 text-brand-dark-blue",
          focusedFilter === "location" && "rounded-b-none",
        )}
      >
        <label
          className="flex h-5 w-full items-center gap-2"
          htmlFor={"location"}
        >
          {<MapPin className="h-4 w-4" />} {t("common.filters.location.label")}
          <span className="text-sm">{filters.location}</span>
        </label>
        <div className="relative flex min-h-10 flex-wrap items-center text-sm">
          {tags.map((t) => {
            return (
              <div
                className="relative mr-2.5 mt-1 inline-flex h-10 items-center gap-2 rounded-md bg-slate-200 py-2 pl-2.5 pr-8 text-sm tracking-tight text-slate-900"
                key={t.value}
              >
                <span className="flex-grow overflow-hidden">{t.label}</span>

                <div
                  onClick={() => handleRemoveTag(t.value)}
                  className="absolute right-0 top-0 inline-flex h-full w-8 cursor-pointer items-center justify-center"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            );
          })}
          {/* line-height: 1; border: 0; height: 40px; padding: 0;
      flex-grow: 1; letter-spacing: -.32px; */}
          <input
            autoComplete="off"
            // className="h-8 w-full flex-grow rounded border-none bg-gray-50 p-1 px-4 leading-tight text-black outline-none"
            className="h-[40px] flex-grow border-none bg-transparent p-0 leading-tight outline-none"
            style={{
              width: 0,
              flexBasis: 0,
            }}
            name="location"
            id="location"
            placeholder={
              focusedFilter === "location"
                ? t("common.filters.location.notActivePlaceholder")
                : t("common.filters.location.emptyPlaceholder")
            }
            value={location}
            onChange={(e) => {
              // setDebouncedFilterLocation(e.target.value);
              // setDebouncedFilterLocation({ location: e.target.value });
              setLocation(e.target.value);
            }}
          />
          {focusedFilter === "location" && isOpen && (
            <ul className="absolute left-0 top-full z-[100] -ml-[22px] mt-[5px] max-h-[280px] w-[calc(100%_+_41px)] overflow-auto rounded-b-xl bg-white shadow-lg">
              {locationDropdown.fuseResults.map(
                (location: TranslatedOption) => (
                  <li
                    key={location.value}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded p-1 px-3 py-2 hover:bg-green-50",
                    )}
                    onClick={() => {
                      console.log(location.value);
                      setLocation(location.value);
                      updateFilters({
                        location: filters.location
                          ? `${filters.location},${location.value}`
                          : location.value,
                      });
                      handleUpdateTags(location);
                      setLocation("");
                    }}
                  >
                    <span>
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>{location.label}</span>
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

interface LocationFilterProps {
  variant: "homepage" | "search";
}
export default function LocationFilter({ variant }: LocationFilterProps) {
  const locationFilterDivRef = useRef(null);
  const focusedFilter = useSelectedFilter((store) => store.selectedFilter);
  const filters = useFilters((store) => store.filters);
  const setFocusedFilter = useSelectedFilter(
    (store) => store.setSelectedFilter,
  );
  const updateFilters = useFilters((store) => store.updateFilters);
  const [isOpen, setisOpen] = useState(false);

  //effect description
  useEffect(() => {
    // if (filters.location.length >= 0) {
    //   setisOpen(true);
    // } else {
    //   setisOpen(false);
    // }
  }, [filters.location]);
  const handleClickOutside = () => {
    setisOpen(false);
    setFocusedFilter("");
  };
  useOnClickOutside(locationFilterDivRef, handleClickOutside);
  return (
    <div
      ref={locationFilterDivRef}
      onClick={() => {
        setisOpen(true);
      }}
      className={cn(
        "location relative w-full flex-grow rounded-b-none border-b border-slate-200 pr-[220px] xl:w-auto xl:flex-1 xl:rounded-xl xl:border-b-0 xl:pr-0",
      )}
    >
      {/* <div>{isOpen ? "is" : "|"}</div> */}
      <div
        className={cn(
          "filters-field relative h-full w-full max-w-full rounded-r-xl rounded-bl-none rounded-tl-xl border-r border-gray-200 xl:rounded-xl xl:border-b",
          focusedFilter === "location" &&
            "z-[20] rounded-b-none border-b-white bg-white",
        )}
      >
        <Popover
          open={isOpen}
          onOpenChange={(nextState) => {
            if (nextState === true) {
              setisOpen(true);
            }
          }}
        >
          <PopoverTrigger asChild>
            {variant === "homepage" ? (
              <BigVariant isOpen={isOpen} />
            ) : (
              <div>small</div>
            )}
          </PopoverTrigger>
          <PopoverContent asChild>
            {/* <ul className="test relative flex max-h-[280px] w-full min-w-[418px] flex-col overflow-y-auto rounded bg-white p-2 text-sm shadow-lg">
              {locationDropdownOptions.map((location) => (
                <li
                  key={location}
                  className={cn(
                    "flex cursor-pointer gap-2 rounded p-1 hover:bg-green-50",
                    filters.propertyType === location &&
                      "bg-green-50 text-brand-dark-blue",
                  )}
                  onClick={() => {
                    updateFilters({ location });
                  }}
                >
                  <span>
                    <MapPin />
                  </span>
                  <span>{location}</span>
                </li>
              ))}
            </ul> */}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
