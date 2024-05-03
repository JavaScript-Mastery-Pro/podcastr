import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const Header = ({
  headerTitle,
  titleClassName,
}: {
  headerTitle: string;
  titleClassName?: string;
}) => {
  return (
    <header className="flex items-center justify-between">
      <h1 className={cn("text-18 font-bold text-white-1", titleClassName)}>
        {headerTitle}
      </h1>
      <Button
        asChild
        variant="ghost"
        className="text-16 font-semibold text-orange-1 hover:bg-transparent hover:text-orange-1"
      >
        <Link href="/discover">See all</Link>
      </Button>
    </header>
  );
};

export default Header;
