import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastifyToast() {
  // if (show)
  //   switch (type) {
  //     case "success":
  //       toast.success(`${message}`);
  //       break;
  //     case "error":
  //       toast.error(`${message}`);
  //       break;
  //     case "warn":
  //       toast.warn(`${message}`);
  //       break;
  //     case "info":
  //       toast.info(`${message}`);
  //       break;
  //     default:
  //       toast(`${message}`);
  //   }

  return (
    <ToastContainer
      position="top-center"
      autoClose={1500}
      // hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      closeButton={false}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover={false}
    />
  );
}
