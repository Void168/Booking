"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Đăng ký thành công!");
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Có điều gì đó sai, hãy kiểm tra lại!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chào mừng đến với Traveller"
        subtitle="Tạo riêng cho bạn một tài khoản!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Tên tài khoản"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Mật khẩu"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
    );
    
    const footerContent = (
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button
          outline
          label="Tiếp tục với Google"
          icon={FcGoogle}
          onClick={() => signIn("google")}
        />
        <Button
          outline
          label="Tiếp tục với Github"
          icon={AiFillGithub}
          onClick={() => signIn("github")}
        />
        <div
          className="
          text-[#71717a]
          text-center 
          mt-4 
          font-light
        "
        >
          <p>
            Bạn đã có tài khoản?
            <span
              onClick={onToggle}
              className="
              text-[#262626]
              cursor-pointer 
              hover:underline
            "
            >
              {" "}
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Đăng ký"
      actionLabel="Tiếp tục"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
