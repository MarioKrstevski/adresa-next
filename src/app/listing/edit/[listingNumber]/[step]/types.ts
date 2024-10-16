export interface FormData {}

export type StepStatus = {
  [key: string]: "completed" | "incomplete" | "in-progress" | "none";
};
export type Step = {
  title: string;
  description: string;
  fieldsMentioned: string[];
  uniquePath: string;
};

export const steps: Step[] = [
  {
    title: "Property Type",
    description: "Select the category",
    fieldsMentioned: ["category"],
    uniquePath: "category",
  },
  {
    title: "Location",
    description: "Enter your district and place",
    fieldsMentioned: ["location"],
    uniquePath: "location",
  },
  {
    title: "Main characteristics",
    description: "Set the price, area size and key features",
    fieldsMentioned: ["bedrooms", "bathrooms", "area", "price"],
    uniquePath: "characteristics",
  },
  {
    title: "Additional features & heating",
    description: "Fill in heating details and other information",
    fieldsMentioned: ["features", "heating"],
    uniquePath: "features",
  },
  {
    title: "Description",
    description: "Describe the property in detail",
    fieldsMentioned: ["description"],
    uniquePath: "description",
  },
  {
    title: "Photos and Video",
    description: "Add photos and video of the property",
    fieldsMentioned: ["photos", "video"],
    uniquePath: "media",
  },
  {
    title: "Contact Details",
    description: "Enter contact details",
    fieldsMentioned: ["contact"],
    uniquePath: "contact",
  },
  {
    title: "Publish listing",
    description: "Complete and publish your listing",
    fieldsMentioned: [],
    uniquePath: "publish",
  },
];
