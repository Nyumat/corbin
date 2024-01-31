"use client";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

export default function NavigationBar() {
  const { isAuthenticated } = useConvexAuth();
  return (
    <header className="flex flex-row justify-between items-center text-white h-full">
      <div className="flex flex-row items-center m-4">
        <h1 className="text-4xl font-bold">ECO.US</h1>
      </div>
      <div className="flex flex-row items-center m-4">
        <ul className="flex flex-row items-center">
          <li className="mx-4">
            <a href="#" className="text-lg font-bold">
              Home
            </a>
          </li>
          <li className="mx-4">
            <a href="#" className="text-lg font-bold">
              About
            </a>
          </li>
          <li className="mx-4">
            <a href="#" className="text-lg font-bold">
              Contact
            </a>
          </li>
          <>
            <li className="mx-4 text-lg">
              {isAuthenticated ? (
                <a href="/dashboard" className="text-lg font-bold">
                  Dashboard
                </a>
              ) : (
                <SignInButton mode="modal" afterSignInUrl="/dashboard" />
              )}
            </li>

            <li className="mx-4">
              <a href="#" className="text-lg font-bold">
                Sign Up
              </a>
            </li>
          </>
        </ul>
      </div>
    </header>
  );
}
