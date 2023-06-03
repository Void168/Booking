"use client";

import useCountries from "@/app/hooks/useCountries";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";

import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const USD_VND_EXCHANGE_RATE = 24000;

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  console.log(location);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-[#737373]">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold flex flex-row">
              <div>$ {price}</div>
              {!reservation && <div className="font-light">/1 đêm</div>}
            </div>
          </div>
          <div className="font-light text-sm">
            {(price * USD_VND_EXCHANGE_RATE).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            onClick={handleCancel}
            small
            label={actionLabel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;