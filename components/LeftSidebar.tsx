"use client";

import { SignedIn, SignedOut, useAuth, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";

import { Button } from "./ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();
  const { userId } = useAuth();
  const { audio } = useAudio();

  return (
    <section
      className={cn(
        "sticky left-0 top-0 flex h-[calc(100vh-5px)] w-fit flex-col  justify-between  border-none  bg-black-1 pt-8 text-white-1 max-md:hidden lg:w-[270px] lg:pl-8",
        {
          "h-[calc(100vh-116px)]": audio?.audioUrl,
        }
      )}
    >
      <nav className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center"
        >
          <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
          <h1 className="text-24 font-extrabold text-white-1 max-lg:hidden">
            Podcastr
          </h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start ",
                {
                  "bg-nav-focus border-r-4 border-orange-1": isActive,
                }
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
              />
              <p
                className={cn(
                  "text-16 font-semibold text-white-2 max-lg:hidden",
                  {
                    "text-white-1": isActive,
                  }
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
        <SignedIn>
          <Link
            href={userId ? `/profile/${userId}` : "/"}
            className={cn(
              "flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start ",
              {
                "bg-nav-focus border-r-4 border-orange-1":
                  pathname === "/profile" || pathname.startsWith("/profile"),
              }
            )}
          >
            <Image
              src="/icons/profile.svg"
              alt="profile"
              width={24}
              height={24}
            />
            <p
              className={cn(
                "text-16 font-semibold text-white-2 max-lg:hidden",
                {
                  "text-white-1":
                    pathname === "/profile" || pathname.startsWith("/profile"),
                }
              )}
            >
              My Profile
            </p>
          </Link>
        </SignedIn>
      </nav>
      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button asChild className="text-16 w-full bg-orange-1 font-extrabold">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button
            className="text-16 w-full bg-orange-1 font-extrabold"
            onClick={() => signOut(() => router.push("/"))}
          >
            Log Out
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
