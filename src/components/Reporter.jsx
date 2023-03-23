import React from "react";

const Reporter = ({ createdBy }) => {
  return (
    <li className="d-flex align-items-center justify-content-between">
      <p className="mb-0">Reporter</p>
      <p className="mb-0 f12">{createdBy?.name}</p>
    </li>
  );
};

export default Reporter;
