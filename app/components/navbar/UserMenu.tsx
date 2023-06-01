"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from '@/app/types'

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Mang Traveller về nhà
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vvw] md:w-3/4 bg-light-blue overflow-hidden right-0 top-12 text-sm transition ease-in-out duration-300">
          <div className="flex flex-col cursor-pointer transition ease-in-out duration-300">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="Chuyến đi" />
                <MenuItem onClick={() => {}} label="Yêu thích" />
                <MenuItem onClick={() => {}} label="Đặt chỗ" />
                <MenuItem onClick={() => {}} label="Thông tin" />
                <MenuItem onClick={() => {}} label="Traveller của tôi" />
                <MenuItem onClick={() => signOut()} label="Đăng xuất" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Đăng nhập" />
                <MenuItem onClick={registerModal.onOpen} label="Đăng ký" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
