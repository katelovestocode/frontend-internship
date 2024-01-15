import React from "react";

export default function Loading() {
  return (
    <div style={{ position: "absolute", zIndex: 100, top: "45%", left: "45%" }}>
      <span
        style={{ height: "130px", width: "130px" }}
        className="loading loading-ring loading-lg"
      ></span>
    </div>
  );
}
