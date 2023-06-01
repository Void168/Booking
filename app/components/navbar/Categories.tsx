import Container from "../Container";

import { TbBeach } from 'react-icons/tb'
import { MdOutlineVilla } from "react-icons/md";
import { FaMountain } from "react-icons/fa";
import CategoryBox from "../CategoryBox";

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
    description: "Trải nghiệm độc đáo với người dân bản địa",
  },
];

const Categories = () => {
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {
          categories.map((item) => (
            <CategoryBox key={item.label} label={item.label} description={item.description} icon={item.icon}/>
          ))
        }
      </div>
    </Container>
  );
};

export default Categories;
