import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Update success toast
function UpdateSuccessToast() {
  toast.success("Data Updated successfully !", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: "",
    style: {
      backgroundColor: "#C0EEC0",
      color: "black",
      fontFamily: "verdana",
    },
  });
}

// Error toast
function FailureToast() {
  toast.error("Request Failed !", {
    position: "top-center",
    autoClose: 2000,
    theme: "colored",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: "",
    style: { fontFamily: "verdana" },
  });
}

// Custom Error toast
function CustomToast(msg, color, backgroundColor) {
  toast.error(msg, {
    position: "top-center",
    autoClose: 2000,
    theme: "colored",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: "",
    style: {
      fontFamily: "verdana",
      color: color,
      backgroundColor: backgroundColor,
    },
  });
}

export default UpdateSuccessToast;
export { FailureToast, CustomToast };
