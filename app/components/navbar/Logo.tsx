"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick = {() => router.push('/')}
      alt="logo"
      className="hidden md:block cursor-pointer shadow-md"
      height="50"
      width="50"
      src="/images/logo.png"
    ></Image>
  );
};

export default Logo;
