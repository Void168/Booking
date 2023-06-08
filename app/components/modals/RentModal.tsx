"use client";

import useRentModal from "@/app/hooks/useRentModal";

import { useMemo, useState } from "react";
import { useRouter } from 'next/navigation'
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import CountrySelect from "../inputs/CountrySelect";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

import { categories } from "../navbar/Categories";
import dynamic from "next/dynamic";
import axios from 'axios'
import { toast } from "react-hot-toast";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const rentModal = useRentModal();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((val) => val - 1);
  };

  const onNext = () => {
    setStep((val) => val + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(step !== STEPS.PRICE){
      return onNext()
    }

    setIsLoading(true)

    axios.post('/api/listings', data).then(() => {
      toast.success('Đăng tải thành công!')
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    }).catch(() => {
      toast.error('Có gì đó sai, bạn hãy kiểm tra lại')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Xác nhận";
    }

    return "Tiếp tục";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Quay lại";
  }, [step]);

  let bodyContent = (
    <div>
      <Heading
        title="Bạn muốn cho khách du lịch thuê địa điểm nào?"
        subtitle="Hãy chọn theo đúng nơi của bạn"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div className="col-span-1" key={item.label}>
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Nơi ở của bạn" subtitle="Giúp khách tìm thấy bạn" />
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        />
        <Map center={location?.latLng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Chia sẻ cho chúng tôi một số điều về nơi ấy"
          subtitle="Hiện đại & Tiện nghi/Truyền thống & Cổ kính?"
        />
        <Counter
          title="Số lượng khách"
          subtitle="Nơi ở phục vụ được bao nhiêu người"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Số lượng phòng"
          subtitle="Nơi ở có bao nhiêu phòng?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Số lượng phòng tắm"
          subtitle="Nơi ở có bao nhiêu phòng khách"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Thêm ảnh về nơi của bạn"
          subtitle="Giúp khách du lịch hình dung về nơi ở của bạn!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Bạn mô tả về nơi của bạn"
          subtitle="Hãy mô tả thật chân thật nhé!"
        />
        <Input
          id="title"
          label="Tiêu đề"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Mô tả"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div className='flex flex-row justify-between'>
          <Heading title="Hãy đặt giá" subtitle="Số tiền tính phí/ đêm" />
          <span></span>
        </div>
        <Input
          id="price"
          label="Giá tiền"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Mang Traveller về nhà"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
