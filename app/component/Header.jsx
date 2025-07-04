import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const Header = async ({ username }) => {
  const { userId } = auth();
  //   console.log(auth);

  return (
    <nav className="flex items-center justify-between px-6 py-4 mb-5 bg-gray/20 backdrop-blur-md">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-lg font-bold text-white uppercase">
            Authentication App
          </div>
        </Link>
      </div>
      <div className="flex items-center text-white">
        {!userId && (
          <>
            <Link
              href="sign-in"
              className="text-gray-300 hover:text-white mr-4"
            >
              Sign In
            </Link>
            <Link
              href="sign-up"
              className="text-gray-300 hover:text-white mr-4"
            >
              Sign Up
            </Link>
          </>
        )}
        {userId && (
          <Link href="profile" className="text-gray-300 hover:text-white mr-4">
            Profile
          </Link>
        )}
        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
