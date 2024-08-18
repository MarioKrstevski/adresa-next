import { Listing } from "./types";

export const listings: Listing[] = [
  {
    id: "id1",
    mainImage: "/assets/demo-property-bg.png",
    imagesCount: 15,
    type: "Apartment",
    area: 60,
    oldPrice: 55000,
    price: 50000,
    mode: "sale",
    tags: ["new", "featured"],
    location: "Skope, Centar",
    postedAt: "1 Jun 2024",
    agency: {
      logo: "/assets/agency-logo.png",
      slug: "slug",
    },
    features: {
      bathroom: 2,
      ac: 1,
      garage: 1,
    },
    description:
      "Se prodava 113m2 stan so 3 spalni i 3 kupatila vo Kapistec vo nova zgrada zavrsena 2024 godina. Stanot se naogja na visoko prizemje i moze da se koristi za ziveenje, no i kako kancelariski prostor..Vo zadniot del od zgradata ima platforma vo prodolzetok na stanot na koja moze da se napravi golema terasa/dvor.",
    isLiked: true,
    isPaidPromo: true,
  },
  {
    id: "id2",
    mainImage: "/assets/demo-property-bg.png",
    imagesCount: 15,
    type: "Apartment",
    area: 60,
    oldPrice: null,
    price: 50000,
    mode: "sale",
    tags: ["new", "featured"],
    location: "Skope, Centar",
    postedAt: "1 Jun 2024",
    user: {
      logo: "/assets/agency-logo.png",
      id: "someid",
    },
    features: {},
    description:
      "Se prodava 113m2 stan so 3 spalni i 3 kupatila vo Kapistec vo nova zgrada zavrsena 2024 godina. Stanot se naogja na visoko prizemje i moze da sekoristi za ziveenje, no i kako kancelariski prostor..Vo zadniot del od zgradata ima platforma vo prodolzetok na stanot na koja moze da se napravi golema terasa/dvor.",
    isLiked: false,
    isPaidPromo: false,
  },
  {
    id: "id3",
    mainImage: "/assets/demo-property-bg.png",
    imagesCount: 15,
    type: "Apartment",
    area: 60,
    oldPrice: 55000,
    price: 50000,
    mode: "sale",
    tags: ["new", "featured"],
    location: "Skope, Centar",
    postedAt: "1 Jun 2024",
    agency: {
      logo: "/assets/agency-logo.png",
      slug: "slug",
    },
    features: {},
    description:
      "Se prodava 113m2 stan so 3 spalni i 3 kupatila vo Kapistec vo nova zgrada zavrsena 2024 godina. Stanot se naogja na visoko prizemje i moze da se koristi za ziveenje, no i kako kancelariski prostor..Vo zadniot del od zgradata ima platforma vo prodolzetok na stanot na koja moze da se napravi golema terasa/dvor.",
    isLiked: false,
    isPaidPromo: false,
  },
  // come up with 5 more listings
  {
    id: "id4",
    mainImage: "/assets/demo-property-bg.png",
    imagesCount: 15,
    type: "Apartment",
    area: 60,
    oldPrice: 55000,
    price: 50000,
    mode: "sale",
    tags: ["new", "featured"],
    location: "Skope, Centar",
    postedAt: "1 Jun 2024",
    agency: {
      logo: "/assets/agency-logo.png",
      slug: "slug",
    },
    features: {},
    description:
      "Se prodava 113m2 stan so 3 spalni i 3 kupatila vo Kapistec vo nova zgrada zavrsena 2024 godina. Stanot se naogja na visoko prizemje i moze da se koristi za ziveenje, no i kako kancelariski prostor..Vo zadniot del od zgradata ima platforma vo prodolzetok na stanot na koja moze da se napravi golema terasa/dvor.",
    isLiked: false,
    isPaidPromo: false,
  },
  {
    id: "id5",
    mainImage: "/assets/demo-property-bg.png",
    imagesCount: 15,
    type: "Apartment",
    area: 60,
    oldPrice: 55000,
    price: 50000,
    mode: "sale",
    tags: ["new", "featured"],
    location: "Skope, Centar",
    postedAt: "1 Jun 2024",
    agency: {
      logo: "/assets/agency-logo.png",
      slug: "slug",
    },
    features: {},
    description:
      "Se prodava 113m2 stan so 3 spalni i 3 kupatila vo Kapistec vo nova zgrada zavrsena 2024 godina. Stanot se naogja na visoko prizemje i moze da se koristi za ziveenje, no i kako kancelariski prostor..Vo zadniot del od zgradata ima platforma vo prodolzetok na stanot na koja moze da se napravi golema terasa/dvor.",
    isLiked: false,
    isPaidPromo: false,
  },
];
