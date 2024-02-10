import {
  SignInButton,
  SignUpButton,
  UserButton,
  currentUser,
} from "@clerk/nextjs";
import { Leaf } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../components/theme-toggle";

export default async function NavigationBar() {
  const user = await currentUser();
  return (
    <header className="flex flex-row justify-between items-center py-4 fixed md:sticky top-0 backdrop-filter backdrop-blur blur-sm bg-neutral-100/10 dark:bg-neutral-800/10  bg-opacity-95 dark:bg-opacity-5 z-50 w-full">
      <Link href="/" title="Home">
        <h1
          className="pl-8 text-2xl inline-flex justify-center items-center gap-1 select-none cursor-pointer"
          title="Corbin"
        >
          <Leaf className="dark:text-[#A3E635] text-[#6c9a23] h-8 w-8" />
          <h1 className="font-bold dark:text-white text-neutral-950">Corbin</h1>
        </h1>
      </Link>

      <span className="px-6">
        <ThemeToggle />
      </span>

      <div className="hidden">
        <nav className="flex md:hidden items-center px-6 justify-center align-middle">
          <ul className="flex flex-row justify-center items-center gap-4">
            <li title="Toggle Theme">
              <ThemeToggle />
            </li>

            {user ? (
              <>
                <li className="text-lg">
                  <Link href="/dashboard" title="Dashboard">
                    Dashboard
                  </Link>
                </li>
                <li
                  className="text-lg"
                  title={user.firstName ?? user.username ?? "Your User"}
                >
                  <UserButton afterSignOutUrl="/" />
                </li>
              </>
            ) : (
              <>
                <li className="text-lg" title="Dashboard">
                  <SignInButton mode="modal" afterSignInUrl="/dashboard" />
                </li>

                <li className="text-lg" title="Sign Up">
                  <SignUpButton mode="modal" afterSignUpUrl="/" />
                </li>
              </>
            )}
          </ul>
        </nav>

        <nav className="md:flex hidden items-center">
          <ul className="flex flex-row items-center space-x-8">
            <li>
              <ThemeToggle />
            </li>
            {user ? (
              <li className="text-lg" title="Dashboard">
                <Link href="/dashboard">Dashboard</Link>
              </li>
            ) : (
              <>
                <li className="text-lg" title="Dashboard">
                  <SignInButton mode="modal" afterSignInUrl="/dashboard" />
                </li>

                <li className="text-lg" title="Sign Up">
                  <SignUpButton mode="modal" afterSignUpUrl="/" />
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
