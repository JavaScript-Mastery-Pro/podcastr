"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useDebounce } from "@/lib/useDebounce";

import { Input } from "./ui/input";

const Searchbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const debouncedValue = useDebounce(search);

  useEffect(() => {
    if (pathname !== "/discover" && debouncedValue) {
      router.push(`/discover?search=${debouncedValue}`);
    } else if (!debouncedValue && pathname === "/discover") {
      router.push(`/discover`);
    }
  }, [debouncedValue, router, pathname]);

  return (
    <form className="relative">
      <Input
        className="input-class py-6 pl-12 focus-visible:ring-orange-1"
        placeholder="Type here to search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Image
        src="/icons/search.svg"
        width={20}
        height={20}
        alt="search"
        className="absolute left-4 top-3.5"
      />
    </form>
  );
};

export default Searchbar;
