'use client';

import Container from "../Container";

import { TbBeach, TbPool } from "react-icons/tb";
import { MdOutlineVilla } from "react-icons/md";
import { IoDiamond } from 'react-icons/io5'
import { FaMountain, FaSkiing } from "react-icons/fa";
import { BsFillHouseFill } from "react-icons/bs";
import {
  GiBoatFishing,
  GiIsland,
  GiCaveEntrance,
  GiCactus,
  GiForestCamp,
  GiCastle,
} from "react-icons/gi";
import CategoryBox from "../CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";

export const categories = [
  {
    label: "Bãi biển",
    icon: TbBeach,
    description: "Có những khách sạn gần bãi biển",
  },
  {
    label: "Villa",
    icon: MdOutlineVilla,
    description: "Villa rộng rãi và hiện đại",
  },
  {
    label: "Đồi núi",
    icon: FaMountain,
    description: "Thiên nhiên hùng vĩ đang chờ đón bạn",
  },
  {
    label: "Miền quê",
    icon: BsFillHouseFill,
    description: "Trải nghiệm độc đáo với người dân bản địa",
  },
  {
    label: "Resort",
    icon: TbPool,
    description: "Khu nghỉ dưỡng cao cấp",
  },
  {
    label: "Đảo",
    icon: GiIsland,
    description: "Vùng biển đảo xinh đẹp của thiên nhiên",
  },
  {
    label: "Hồ",
    icon: GiBoatFishing,
    description: "Cắm trại quanh hồ là ý tưởng tuyệt vời",
  },
  {
    label: "Vùng lạnh",
    icon: FaSkiing,
    description: "Trải nghiệm những hoạt động ngoài trời trong thời tiết lạnh",
  },
  {
    label: "Hang động",
    icon: GiCaveEntrance,
    description: "Khám phá điều kỳ lạ trong hang động",
  },
  {
    label: "Sa mạc",
    icon: GiCactus,
    description: "Khám phá vùng đất khô cằn của nhân loại",
  },
  {
    label: "Lâu đài",
    icon: GiCastle,
    description: "Khám phá những tòa lâu đài cổ ở vùng đất châu Âu",
  },
  {
    label: "Rừng",
    icon: GiForestCamp,
    description: "Hòa mình vào thiên nhiên hoang dã",
  },
  {
    label: "Sang trọng",
    icon: IoDiamond,
    description: "Tận hưởng những thứ xa hoa mà bạn xứng đáng",
  },
];

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')

  const pathname = usePathname()

  const isMainPage = pathname === '/'
  if (!isMainPage) {
    return null
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {
          categories.map((item) => (
            <CategoryBox key={item.label} label={item.label} selected={category === item.label} icon={item.icon}/>
          ))
        }
      </div>
    </Container>
  );
};

export default Categories;
