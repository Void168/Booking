'use client';

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

import { SafeUser } from '@/app/types'

interface NavbarProps {
  currentUser?: SafeUser | null 
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {

  return (
    <div className="fixed w-full bg-light-yellow z-10 shadow-lg">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
