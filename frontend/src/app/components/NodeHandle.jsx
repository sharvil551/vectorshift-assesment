import React from "react";
import { Handle } from "reactflow";

export const NodeHandle = ({ handles = [] }) => {
  const styles = {
    background: "#fff",
    width: "12px",
    height: "12px",
    border: "1px solid #4e50e8",
  };

  return (
    <>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className="w-4 h-4 bg-white border border-node-border border-2 rounded-sm"
          style={{ ...styles,...handle.customStyles} }
        />
      ))}
    </>
  );
};
