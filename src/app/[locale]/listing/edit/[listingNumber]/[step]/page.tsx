import { redirect } from "@/i18n/routing";
import prismadb from "@/lib/db";
import ListingEditForm from "./ListingEditForm";
import { Step, steps } from "./types";
import { getCurrentUser } from "@/lib/sessions";
import { ListingWithRelations } from "@/types/listing.types";
import { getLocale } from "next-intl/server";

type Params = Promise<{ listingNumber: string; step: string }>;

export default async function EditListingPage({ params }: { params: Params }) {
  const { listingNumber, step: requestedStep } = await params;

  const locale = await getLocale();
  const stepExists = steps.find(
    (step: Step) => step.uniquePath === requestedStep,
  );
  const { user, agency, account } = await getCurrentUser();

  if (!account || isNaN(Number(listingNumber))) {
    redirect({ href: "/", locale: locale });
  }

  const listing: ListingWithRelations | null =
    await prismadb.listing.findUnique({
      where: {
        listingNumber: Number(listingNumber),
      },
      include: {
        agency: true,
        user: true,
        commercial: true,
        residential: true,
        land: true,
        other: true,
        listingFeatures: {
          include: {
            feature: true,
          },
        },
        favoritedBy: true,
        professionalPromotion: true,
      },
    });

  if (!listing) {
    redirect({ href: "/404", locale: locale });
    return <div>Listing not found</div>;
  }

  // Total mismatch
  if (listing?.agencyId && user) {
    return <div>You don&apost own this one |change on launch| a</div>;
  }
  if (listing?.userId && agency) {
    return <div>You don&apost own this one |change on launch| b</div>;
  }
  // Correct User Type but not his listing
  if (listing?.agencyId && agency?.id !== listing.agencyId) {
    return <div>You don&apost own this one |change on launch| c</div>;
  }
  // Correct User Type but not his listing
  if (listing?.userId && user?.id !== listing.userId) {
    return <div>You don&apost own this one |change on launch| d</div>;
  }

  if (!stepExists) {
    redirect({
      href: `/listing/edit/${listingNumber}/${steps[0].uniquePath}`,
      locale: locale,
    });
  }

  const allCategoryFeatures = await prismadb.feature.findMany({
    where: {
      applicableTypes: {
        has: listing.category,
      },
    },
  });
  return (
    <div className="flex gap-2 p-2">
      <ListingEditForm
        loadedListing={listing}
        requestedStep={requestedStep}
        allCategoryFeatures={allCategoryFeatures}
      />
    </div>
  );
}
