"use client";
import {
  addListingAsFavorite,
  removeListingAsFavorite,
} from "@/actions/listings";
import { Button } from "@/components/ui/button";
import { isLoggedInClient } from "@/lib/utils";
import { Heart } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
export default function LikeListingButton({
  listingId,
  isFavorite,
}: {
  listingId: string;
  isFavorite: boolean;
}) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(isFavorite);
  return (
    <>
      <AlertDialog open={isAlertOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login needed</AlertDialogTitle>
            <AlertDialogDescription>
              This action requires you to be logged in first
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsAlertOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction>
              <Link href="/signin?redirect=/search">Sign in</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        onClick={async (e) => {
          const isLoggedIn = isLoggedInClient();
          if (!isLoggedIn) {
            setIsAlertOpen(true);
            return;
          }
          console.log("is liked");
          // probably show toast with error maybe?
          if (!isLiked) {
            const resp = await addListingAsFavorite(listingId);
            if (resp.success) {
              setIsLiked(true);
            }
          }
          if (isLiked) {
            const resp = await removeListingAsFavorite(listingId);
            if (resp.success) {
              setIsLiked(false);
            }
          }
        }}
        variant="ghost"
        className="w-10 h-10 px-0.5 text-brand-light-blue hover:text-brand-dark-blue"
      >
        <Heart fill={isLiked ? "blue" : "none"} />
      </Button>
    </>
  );
}
