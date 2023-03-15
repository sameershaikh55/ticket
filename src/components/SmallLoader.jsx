import React from "react";
import { HashLoader } from "react-spinners";

const SmallLoader = () => {
  return (
    <div className="d-flex justify-content-center">
      <HashLoader size={20} color="#fff" />
    </div>
  );
};

export default SmallLoader;
