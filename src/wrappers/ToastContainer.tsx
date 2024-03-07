"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastContainerWrapper() {
  return (
    <>
      <div className="flex">
        <ToastContainer position={"bottom-right"} theme="dark" />;
      </div>
    </>
  );
}
