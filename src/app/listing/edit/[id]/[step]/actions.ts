"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import prismadb from "@/lib/db";

async function editType(formData: FormData) {
  const type = formData.get("type");
  if (typeof type !== "string") {
    return {
      error: "Invalid type",
      success: false,
    };
  }

  const listingId = formData.get("listingId")! as string;
  const listing = await prismadb.listing.findUnique({
    where: {
      id: listingId!,
    },
  });

  if (!listing) {
    return {
      error: "Listing not found",
      success: false,
    };
  }

  if (listing.type !== type) {
    await prismadb.listing.update({
      where: {
        id: listingId,
      },
      data: {
        type,
      },
    });

    return {
      success: true,
    };
  }
}
async function editLocation(formData: FormData) {
  const manucipality = formData.get("manucipality");
  const place = formData.get("place");
  const district = formData.get("district");
  const address = formData.get("address");
  const longitude = formData.get("longitude");
  const latitude = formData.get("latitude");

  if (
    typeof manucipality !== "string" ||
    typeof place !== "string" ||
    typeof district !== "string" ||
    typeof address !== "string" ||
    typeof longitude !== "string" ||
    typeof latitude !== "string"
  ) {
    return {
      error: "Invalid Inputs",
      success: false,
    };
  }

  const listingId = formData.get("listingId")! as string;
  const listing = await prismadb.listing.findUnique({
    where: {
      id: listingId!,
    },
  });

  if (!listing) {
    return {
      error: "Listing not found",
      success: false,
    };
  }

  await prismadb.listing.update({
    where: {
      id: listingId,
    },
    data: {
      manucipality,
      place,
      district,
      address,
      longitude: Number(longitude),
      latitude: Number(latitude),
    },
  });

  return {
    success: true,
  };
}
async function editCharacteristics(formData: FormData) {}
async function editFeatures(formData: FormData) {}
async function editDescription(formData: FormData) {}
async function editMedia(formData: FormData) {}
async function editContactDetails(formData: FormData) {}
async function editPublishing(formData: FormData) {
  // cookies().delete("listingId");
  // redirect("/");
}
export async function editListing(formData: FormData) {
  console.log("Editing listing", formData);

  const step = formData.get("step");

  if (
    typeof step !== "string" ||
    Number(step) < 0 ||
    Number(step) > 8
  ) {
    return {
      error: "Invalid step",
      success: false,
    };
  }
  const listingId = formData.get("listingId");

  if (typeof listingId !== "string") {
    return {
      error: "Missing listing ID",
      success: false,
    };
  }

  switch (Number(step)) {
    case 1:
      editType(formData);
      break;
    case 2:
      editLocation(formData);
      break;
    case 3:
      editCharacteristics(formData);
      break;
    case 4:
      editFeatures(formData);
      break;
    case 5:
      editDescription(formData);
      break;
    case 6:
      editMedia(formData);
      break;
    case 7:
      editContactDetails(formData);
      break;
    case 8:
      editPublishing(formData);
      break;
    default:
      break;
  }
}
