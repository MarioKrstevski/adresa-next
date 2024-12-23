"use client";
import { useEffect, useLayoutEffect } from "react";
import "leaflet/dist/leaflet.css";
// import "react-leaflet-markercluster/dist/styles.min.css";
// import MarkerClusterGroup from "react-leaflet-markercluster";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Agency, Listing } from "@prisma/client";
import L, {
  Icon,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  divIcon,
  map,
} from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  LayerGroup,
  useMapEvent,
} from "react-leaflet";
import ListingMapCard from "./ListingMapCard";
import MapWithBounds from "./MapWithBounds";
import { useState, memo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Building, Compass, Ghost, MapPinCheck } from "lucide-react";
import { cn, displayPrice } from "@/lib/utils";
import { renderToStaticMarkup } from "react-dom/server";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import ZoomTracker from "./ZoomTracker";
import ActiveListing from "./ActiveListing";
import { useTranslations } from "next-intl";
import { getMapPinIcon } from "@/components/shared/map/helpers";
import { northMacedoniaCoordinates } from "@/lib/data/macedoniaOld/importantData";

const skopjeLatLng: LatLngExpression = [41.9990607, 21.342318];
const agencyLocation: LatLngExpression = [41.99564, 21.428277];

export default function SearchMap({
  listings,
  agency,
}: {
  listings: Listing[];
  agency?: Agency;
}) {
  const t = useTranslations();
  const [resultsFilters, setResultsFilters] = useState("");
  const [mapFilters, setMapFilters] = useState("");
  const [searchOnMove, setSearchOnMove] = useState(false);
  const [mapSearchedCounter, setMapSearchedCounter] = useState(0);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [zoom, setZoom] = useState(11);
  const mapRef = useRef<L.Map>(null);
  const popupRef = useRef<L.Popup>(null);
  const [selectedListingId, setSelectedListingId] = useState<number | null>(
    null,
  );

  const coordsArray = listings.reduce((acc, curr) => {
    if (curr.latitude && curr.longitude) {
      acc.push([curr.latitude, curr.longitude]);
    }
    return acc;
  }, [] as LatLngTuple[]);

  useLayoutEffect(() => {
    //@ts-ignore
    window.setSelectedListingId = setSelectedListingId;
  }, [selectedListingId]);

  function handleMapMove(
    target: "resultsFilters" | "mapFilters" | "both",
    coordinates: string,
  ) {
    if (target === "both") {
      setResultsFilters(coordinates);
      setMapFilters(coordinates);
      // setLastMapMoveCoordinates(coordinates);
    } else if (target === "resultsFilters") {
      setResultsFilters(coordinates);
      // setLastMapMoveCoordinates(coordinates);
    } else if (target === "mapFilters") {
      setMapFilters(coordinates);
    }
  }
  const mapMovedWithoutSearching = resultsFilters !== mapFilters;

  let timeoutId: NodeJS.Timeout | null = null;
  const mapCoords = coordsArray.length
    ? coordsArray.map((coords) => L.marker(coords))
    : [L.marker(northMacedoniaCoordinates)];
  // console.log(mapCoords);
  const featureGroup = L.featureGroup(mapCoords);

  let mapBounds: L.LatLngBoundsExpression | undefined = undefined;
  if (featureGroup.getBounds()) {
    mapBounds = featureGroup.getBounds();
  }

  const MapClickHandler = () => {
    useMapEvent("click", (e) => {
      setActiveListing(null);
    });
    return null;
  };

  return (
    <div className="order-2 mb-10 h-[300px] shrink-0 overflow-hidden border md:h-[380px] lg:sticky lg:top-[150px] lg:z-20 lg:h-[calc(100vh_-_150px)] lg:w-2/5">
      <div id="search-page-map" className="relative mb-10 h-full w-full">
        <aside className="absolute left-0 right-0 top-0 z-[1050] h-0 w-full text-center">
          <div
            className={cn(
              "mt-2 inline-block rounded-md bg-white shadow",
              !mapMovedWithoutSearching && "px-3.5 py-2.5",
            )}
          >
            {mapMovedWithoutSearching ? (
              <Button
                variant={"ghost"}
                onClick={() => {
                  setMapSearchedCounter((prev) => prev + 1);
                }}
              >
                <Compass className="mr-2" /> {t("map.searchInArea")}
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="search-on-pan"
                  checked={searchOnMove}
                  onCheckedChange={(newState: boolean) => {
                    setSearchOnMove(newState);
                  }}
                />
                <Label className="font-semibold" htmlFor="search-on-pan">
                  {t("map.searchAsMove")}
                </Label>
              </div>
            )}
          </div>
        </aside>
        <aside className="absolute bottom-[42px] left-2 z-[1050]">
          <ActiveListing listing={activeListing} />
        </aside>
        <aside className="absolute bottom-0 left-0 z-[1050]">
          <div className="rounded-tr-md bg-white px-2.5 py-1.5 text-xs shadow-lg md:text-sm">
            {t("map.viewProperties", {
              listingsLength: listings.length,
            })}
          </div>
        </aside>

        <MapContainer
          // center={mapCenter.getCenter()}
          // zoom={11}
          key={`map-${mapSearchedCounter}`}
          ref={mapRef}
          bounds={mapBounds}
          boundsOptions={{ padding: [30, 30], animate: true }}
          style={{ height: "100%", width: "100%" }}
        >
          <ZoomTracker onZoomChange={setZoom} />

          {/* <MapWithBounds
            mapSearchedCounter={mapSearchedCounter}
            searchOnMove={searchOnMove}
            handleMapMove={handleMapMove}
          /> */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          <LayerGroup>
            {listings
              .toSorted((a, b) => (a.isPaidPromo ? -1 : 1))
              .map((listing, idx) => {
                if (!listing.latitude || !listing.longitude) {
                  return null;
                }
                const location: LatLngExpression = [
                  listing.latitude,
                  listing.longitude,
                ];

                return [
                  <Marker
                    icon={getMapPinIcon(
                      "S",
                      listing.locationPrecision,
                      zoom,
                      listing.isPaidPromo,
                      selectedListingId === listing.id,
                      listing,
                      idx,
                    )}
                    key={listing.id}
                    position={location}
                    eventHandlers={{
                      click: (e) => {
                        setActiveListing(listing);
                      },
                    }}
                  ></Marker>,
                  // <Circle
                  //   key={`circle-${listing.id}`}
                  //   center={location}
                  //   radius={4}
                  //   pathOptions={{ color: "red" }}
                  // />,
                ];
              })}

            {agency && (
              <Marker
                position={agencyLocation}
                icon={
                  new Icon({
                    iconUrl:
                      "https://cdn-icons-png.flaticon.com/512/8/8214.png",
                    iconSize: [32, 32],
                  })
                }
              ></Marker>
            )}
          </LayerGroup>
        </MapContainer>
      </div>
    </div>
  );
}
