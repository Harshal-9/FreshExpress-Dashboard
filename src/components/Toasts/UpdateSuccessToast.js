import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default UpdateSuccessToast;

// function UpdateSuccessToast() {
//   const notify = () =>
//     toast.success("Data Updated successfully !", {
//       position: "top-center",
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: "",
//       style: {
//         backgroundColor: "#C0EEC0",
//         color: "black",
//         fontFamily: "verdana",
//       },
//     });

//   return (
//     <div>
//       {/* <button onClick={notify}>Notify!</button> */}
//       {notify()}
//       <ToastContainer />
//     </div>
//   );
// }
