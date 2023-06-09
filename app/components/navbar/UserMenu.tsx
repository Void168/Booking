"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

import { signOut } from "next-auth/react";
import { SafeUser } from '@/app/types'
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
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
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="Chuyến đi"
                />
                <MenuItem
                  onClick={() => router.push("/favourites")}
                  label="Yêu thích"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="Bài đăng của tôi"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="Thông tin"
                />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label="Traveller của tôi"
                />
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
