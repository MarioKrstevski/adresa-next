"use client";
import { RadioGroupDemo } from "@/components/shared/RadioGroupDemo";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const propertyCategoryOptions = [
  "resitendial",
  "commercial",
  "land",
  "other",
];

type PropertyCategory = (typeof propertyCategoryOptions)[number];

const propertyTypeOptions: Record<PropertyCategory, string[]> = {
  residential: [
    "apartment",
    "studio flat",
    "maisonette",
    "detached house",
    "villa",
    "loft",
    "bungalow",
    "building",
    "apartment complex",
    "farm",
    "houseboat",
    "other categories",
  ],
  commercial: [
    "office",
    "store",
    "warehouse",
    "industrial space",
    "craft space",
    "hotel",
    "business building",
    "showroom",
    "other categories",
  ],
  land: ["land plot", "parcel", "island", "other categories"],
  other: [
    "garage",
    "business",
    "prefabricated",
    "detachable",
    "air",
    "other categories",
  ],
};
const saleIntent = ["sale", "rent"];
export default function Step1() {
  const [propertyCategory, setPropertyCategory] =
    useState("apartment");
  return (
    <div className="p-2">
      <h2 className="text-lg">Basic information</h2>
      <Separator className="my-2 mt-4" />
      <RadioGroupDemo
        title="Property Category"
        values={propertyCategoryOptions}
        onChange={function (value: string) {
          setPropertyCategory(value);
        }}
      />

      <RadioGroupDemo
        defaultValue="resitendial"
        title="Property Type"
        values={propertyTypeOptions[propertyCategory]}
        onChange={function (value: string) {
          // setPropertyCategory(value);
        }}
      />

      <RadioGroupDemo
        title="Property Type"
        values={saleIntent}
        onChange={function (value: string) {
          // setPropertyCategory(value);
        }}
      />
    </div>
  );
}
