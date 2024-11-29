"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Link } from "@/i18n/routing";
import LocationFilter from "./primary/LocationFilter";
import PropertyTypeFilter from "./primary/PropertyTypeFilter";
import PriceFilter from "./primary/PriceFilter";
import SurfaceFilter from "./primary/SurfaceFilter";
import ModeFilter from "./primary/ModeFilter";
import { useSelectedFilter } from "@/hooks/useSelectedFilter";
import { useTranslations } from "next-intl";

export default function SearchFilter() {
  const t = useTranslations();
  const focusedFilter = useSelectedFilter((store) => store.selectedFilter);

  return (
    <section className="mx-5 flex w-full max-w-7xl flex-col gap-1 overflow-x-auto rounded-3xl border border-slate-300 bg-white/30 p-6 px-5 backdrop-blur">
      <ModeFilter variant="homepage" />
      <div
        className={cn(
          "relative mt-1.5 flex w-full flex-wrap rounded-xl bg-slate-50 xl:h-[90px]",
          focusedFilter === "location" && "rounded-bl-none",
        )}
      >
        <LocationFilter variant="homepage" />
        <PropertyTypeFilter variant="homepage" />
        <PriceFilter variant="homepage" />
        <SurfaceFilter variant="homepage" />

        <div className="flex w-full max-w-[205px] items-center justify-center">
          <Link href={"/search"}>
            <Button
              size={"lg"}
              className="h-12 w-full px-4 py-0.5 text-lg font-semibold uppercase"
            >
              {t("common.buttons.search")} <Search className="ml-3" size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
