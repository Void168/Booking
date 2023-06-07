"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";

import Modal from "./Modal";

import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "query-string";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push("url");
  }, [
    bathroomCount,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
    dateRange.endDate,
    dateRange.startDate,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Tìm kiếm";
    }

    return "Tiếp tục";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Trở lại";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Bạn muốn đến đâu?"
        subtitle="Tìm kiếm địa điểm hoàn hảo"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latLng} />
    </div>
    );
    
    if (step === STEPS.DATE) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Khi nào bạn muốn đi đến nơi này?"
            subtitle="Hãy chắc chắn rằng mọi người đồng hành đều rảnh rỗi!"
          />
          <Calendar
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />
        </div>
      );
    }

    if (step === STEPS.INFO) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Thêm thông tin"
            subtitle="Tìm địa điểm hoàn hảo của bạn!"
          />
          <Counter
            onChange={(value) => setGuestCount(value)}
            value={guestCount}
            title="Số lượng khách"
            subtitle="Bạn có tất cả bao nhiêu người?"
          />
          <hr />
          <Counter
            onChange={(value) => setRoomCount(value)}
            value={roomCount}
            title="Số lượng phòng"
            subtitle="Bạn cần bao nhiêu phòng?"
          />
          <hr />
          <Counter
            onChange={(value) => {
              setBathroomCount(value);
            }}
            value={bathroomCount}
            title="Số lượng phòng tắm"
            subtitle="Bạn cần bao nhiêu phòng tắm?"
          />
        </div>
      );
    }


  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Bộ lọc"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
