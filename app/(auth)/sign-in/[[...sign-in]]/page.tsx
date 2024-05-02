import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex-center glassmorphism-auth h-screen w-full">
      <SignIn />
    </div>
  );
}
