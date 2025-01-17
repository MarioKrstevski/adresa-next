"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Listing } from "@prisma/client";
import { UploadButton } from "@/lib/uploadthing";
import { useTranslations } from "next-intl";

import ImagesPreview from "./ImagesPreview";
import { attachImagesToListing } from "@/server/actions/listing.actions";
import { UploadedFileData } from "uploadthing/types";
import { UploadedImageData } from "@/types/listing.types";
import { Button } from "@/components/ui/button";

export default function Step6({ listing }: { listing: Listing }) {
  const t = useTranslations("listing.new.progress.steps.media");
  const [ytLink, setYtLink] = useState(listing.videoLink || "");
  const [images, setImages] = useState<UploadedImageData[]>(
    listing.images ? (listing.images as UploadedImageData[]) : [],
  );
  // console.log("2images: ", images);
  // console.log("2images: ", JSON.stringify(images));
  // console.log("2listing: ", listing.images);
  // console.log("2listing: ", JSON.stringify(listing.images));
  const ytLinkRegex =
    /^(?:https?:\/\/)?(?:(?:www|m)\.)?((?:youtube\.com|youtu.be)\/(?:watch\?v=)?)([\w\-_]+)(?:\?[^#]*)?$/;

  const [left, right] = ytLink.split("v=");
  const validYtLink =
    left.startsWith("https://www.youtube.com/watch?") && right.length === 11;

  return (
    <div className="w-full min-w-[526px] p-2">
      <input type="string" className="hidden" defaultValue="6" name="step" />
      <input
        type="hidden"
        className="hidden"
        value={JSON.stringify(images)}
        name="images"
      />

      <h2 className="text-lg">{t("title")}</h2>
      <Separator className="my-2 mt-4" />
      <div className="flex flex-col justify-between">
        <span className="text-sm text-gray-500">
          *{t("uploadHighResolution")}
        </span>
        <span className="my-3 text-sm font-semibold text-gray-500">
          {images.length}/15 {t("uploaded")} | <span>{t("controls")} </span>
        </span>
      </div>

      <div className="w-max">
        <UploadButton
          content={{
            button: () => {
              return <span>{t("chooseFiles")}</span>;
            },
            allowedContent: () => {
              return <span>{t("allowedContent")}</span>;
            },
          }}
          endpoint="listingImagesUpload"
          onClientUploadComplete={async (res) => {
            console.log("Files: ", res);
            const imagesAttachingToListing = await attachImagesToListing(
              [
                ...images,
                ...res.map((file) => {
                  const imageData: UploadedImageData = {
                    url: file.url,
                    name: file.name,
                    size: file.size,
                    key: file.key,
                    lastModified: file.lastModified,
                    appUrl: file.appUrl,
                    customId: file.customId,
                    type: file.type,
                    fileHash: file.fileHash,
                  };

                  return imageData;
                }),
              ],
              listing.listingNumber,
            );

            console.log("imagesAttachingToListing: ", imagesAttachingToListing);

            if (imagesAttachingToListing.success) {
              setImages([
                ...images,
                ...res.map((file) => {
                  const imageData: UploadedImageData = {
                    url: file.url,
                    name: file.name,
                    size: file.size,
                    key: file.key,
                    lastModified: file.lastModified,
                    appUrl: file.appUrl,
                    customId: file.customId,
                    type: file.type,
                    fileHash: file.fileHash,
                  };

                  return imageData;
                }),
              ]);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

      <ImagesPreview images={images} setImages={setImages} listing={listing} />

      <div className="mt-4 flex flex-col gap-2">
        <Label htmlFor="videoLink">{t("youtubeLink")}</Label>
        <span className="text-xs text-gray-500">{t("youtubeLinkExample")}</span>
        <Input
          id="videoLink"
          name="videoLink"
          pattern={ytLinkRegex.source}
          placeholder={t("youtubeLinkPlaceholder")}
          value={ytLink}
          onChange={(e) => {
            setYtLink(e.target.value);
          }}
        />
        {ytLink && validYtLink && (
          <iframe
            width="320"
            height="185"
            src={`https://www.youtube.com/embed/${ytLink.split("v=")[1]}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
