import React from "react";
import SmallLoader from "./SmallLoader";

const FormSubmitBtn = ({ loading, inputHandle, editData, innerText }) => {
  return (
    <button
      disabled={!loading && inputHandle.picture !== "loading..." ? false : true}
      type="submit"
      className="rounded-3 btn-lg rounded-3 border-0 w-100 text-center text-white py-2"
    >
      {(loading && <SmallLoader />) || (
        <div>
          {(editData && "Edit") || "Create"} {innerText}
        </div>
      )}
    </button>
  );
};

export default FormSubmitBtn;
