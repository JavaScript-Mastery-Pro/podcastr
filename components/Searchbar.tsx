"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Input } from "./ui/input";

const Searchbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/discover?search=${search}`);
  };
  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        className="input-class pl-12"
        placeholder="Type here to search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Image
        src="/icons/search.svg"
        width={20}
        height={20}
        alt="search"
        className="absolute left-4 top-2.5"
      />
    </form>
  );
};

export default Searchbar;
