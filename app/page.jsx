"use client";
import { useAuth } from "@clerk/nextjs";
import Dashboard from "./dashboard/page";

export default function Home() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Dashboard />;
  }

  return (
    <>
      <h1 className="text-2xl text-white font-bold mb-5">Hi, Welcome</h1>
      <p className="mb-5 text-white ">
        This is the site. Have a great day! Thank you.
      </p>
    </>
  );
}
