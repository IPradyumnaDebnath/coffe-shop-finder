import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "helpers/axios";
import { WithLoader } from "components/HOC/WithLoader";

type ShopDetailsResponse = {
  name?: string;
  description?: string;
  geocodes?: GeoCode;
  location?: {
    formatted_address: string;
  };
  categories?: [Shop];
  contact?: {
    email: string;
    fax: string;
  };
  hours?: {
    open_now: string;
  };
};

type Shop = {
  icon: {
    prefix: string;
    suffix?: string;
  };
  name: string;
  id: number;
};

type GeoCode = {
  main: Location;
};

type Location = {
  latitude: string;
  longitude: string;
};

type ShopDetailsState = {
  details: ShopDetailsResponse;
  isLoading: boolean;
};

const ShopDetailsPage = () => {
  const [shopDetails, setShopDetails] = useState<ShopDetailsState>({
    isLoading: true,
    details: {},
  });
  const { id } = useParams();

  useEffect(() => {
    api
      .get<ShopDetailsResponse>(`/places/${id}`)
      .then((resp) => {
        setShopDetails((prev) => ({ ...prev, details: resp.data }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setShopDetails((curShops) => ({ ...curShops, isLoading: false }));
      });
  }, []);

  return (
    <WithLoader loading={shopDetails?.isLoading}>
      <div className="p-4 items-center text-center">
        <header className="uppercase font-bold text-2xl mb-4">
          <div className="flex justify-center items-center">
            <span className="underline">{shopDetails.details?.name}</span>
            <span className="text-sm ml-2">
              (
              {shopDetails.details?.hours?.open_now ? (
                <span className="text-emerald-600">Open</span>
              ) : (
                <span className="text-red-600">Opening soon</span>
              )}
              )
            </span>
          </div>
          <div>{shopDetails.details?.description ?? ""} </div>
        </header>
        <main className="space-y-2">
          <div className="flex flex-col">
            <p className="text-xs font-bold space-x-4">
              <span>Email: {shopDetails.details?.contact?.email ?? "NA"}</span>
              <span>Fax: {shopDetails.details?.contact?.fax ?? "NA"} </span>
            </p>
          </div>
          <div className="font-semibold">
            Categories Available:
            <>
              {!!shopDetails.details?.categories?.length && (
                <ul>
                  {shopDetails.details?.categories.map((shop, index) => (
                    <li key={index}>
                      {/* <img
                      className="h-10 w-10"
                      src={shop.icon.prefix + shop.icon.suffix}
                      alt="NO IMAGE"
                    /> */}
                      <div className="text-sm italic">{shop.name ?? "-"}</div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          </div>
          <div>
            <div className="font-bold uppercase">Address:</div>
            <div>{shopDetails?.details?.location?.formatted_address}</div>
            <details className="italic font-bold">
              <summary>Coordinates</summary>
              <p className="text-xs">
                Co-ordinates: ( {shopDetails?.details?.geocodes?.main?.latitude}
                ,{shopDetails?.details?.geocodes?.main?.longitude})
              </p>
            </details>
          </div>
        </main>
      </div>
    </WithLoader>
  );
};

export default ShopDetailsPage;
