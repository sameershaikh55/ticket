import React from "react";
import { useSelector } from "react-redux";

const TeamImages = () => {
  const { team, loading } = useSelector((state) => state.team);

  return (
    <div>
      {loading ? (
        <span className="text-dark f10">loading...</span>
      ) : (
        team.map((content, i) => {
          return (
            <img
              key={i}
              style={{
                marginRight: (i + 1 === team.length && "0px") || "-10px",
                width: "25px",
                height: "25px",
              }}
              src={content.picture}
              className="rounded-circle"
              alt=""
            />
          );
        })
      )}
    </div>
  );
};

export default TeamImages;
