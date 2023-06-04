import axios from "axios";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";

import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

interface IUseFavourite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }

        await request();
        router.refresh();

        if (!hasFavourited) {
          toast.success("Đã thêm vào danh sách yêu thích");
        } else {
          toast.success("Đã xóa khỏi danh sách yêu thích");
        }
      } catch (error) {
        toast.error("Có gì đó sai");
      }
    },
    [currentUser, loginModal, hasFavourited, listingId, router]
  );

  return {
    hasFavourited,
    toggleFavourite,
  };
};

export default useFavourite;
