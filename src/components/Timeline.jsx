import React from "react";
import { getDateTime } from "../utils/getDateTime";

const Timeline = ({ singleTicket }) => {
  return (
    <div className="report_container mt-4 py-3">
      <ul className="d-flex flex-column gap-3 mb-0 pe-3">
        <li className="completed d-flex justify-content-between align-items-center">
          <p className="mb-0 f14">Created</p>
          <p className="mb-0 f12">{getDateTime(singleTicket.createdAt)}</p>
        </li>
        <li
          className={`d-flex justify-content-between align-items-center ${
            (singleTicket?.updatedAt && "completed") || ""
          }`}
        >
          <p className="mb-0 f14">Updated</p>
          <p className="mb-0 f12">
            {singleTicket?.updatedAt ? getDateTime(singleTicket.updatedAt) : ""}
          </p>
        </li>
        <li
          className={`d-flex justify-content-between align-items-center ${
            (singleTicket?.resolvedAt && "completed") || ""
          }`}
        >
          <p className="mb-0 f14">Resolved</p>
          <p className="mb-0 f14">
            {singleTicket?.resolvedAt
              ? getDateTime(singleTicket.resolvedAt)
              : ""}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Timeline;
