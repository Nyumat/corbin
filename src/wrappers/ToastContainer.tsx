"use client";

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastContainerWrapper() {
  const { theme } = useTheme();
  return (
    <>
      <div className="flex">
        <ToastContainer
          limit={1}
          newestOnTop={true}
          theme={theme === "dark" ? "colored" : "light"}
          position={"top-center"}
          toastClassName={
            "text-black bg-neutral-200 dark:bg-neutral-700 dark:text-white"
          }
        />
      </div>
    </>
  );
}
