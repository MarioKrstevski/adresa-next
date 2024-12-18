"use client";
import { Button } from "@/components/ui/button";
import { Repeat } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useTranslations } from "next-intl";

export default function ModeChangeButton() {
  const t = useTranslations();
  let [mode, setMode] = useQueryState(
    "mode",
    parseAsString.withOptions({ shallow: false }).withDefault("sale"),
  );
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className="border-brand-light-blue p-2 text-brand-light-blue hover:text-brand-dark-blue"
      onClick={() => {
        setMode(mode === "sale" ? "rent" : "sale");
      }}
    >
      {" "}
      <Repeat className="mr-2" size={16} />{" "}
      <span className="text-sm capitalize">
        {t(`common.filters.mode.${mode}`)}
      </span>
    </Button>
  );
}
