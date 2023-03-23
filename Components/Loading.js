import React from "react";
import Image from "next/image";
import loadingImg from "../Components/giphy1.gif";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Image
        src={loadingImg}
        alt="Loading"
        width="500"
        height="450"
        className=" p-3"
      />
    </div>
  );
};

export default Loading;
