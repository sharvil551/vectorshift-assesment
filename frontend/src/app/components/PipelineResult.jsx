import React from "react";

export const PipelineResult = ({data}) => {
  const { num_nodes, num_edges, is_dag } = data;
  
  return (
    <div className="text-md w-full">
      <p className="font-semibold text-foreground ">Pipeline Submitted</p>
      <div className="mt-1 space-y-1 text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Total Nodes:</span>{" "}
          {num_nodes}
        </p>
        <p>
          <span className="font-medium text-foreground">Total Edges:</span>{" "}
          {num_edges}
        </p>
        <p>
          <span className="font-medium text-foreground">Is DAG:</span>{" "}
          {is_dag ? (
            <span className="text-green-600 font-medium">Yes ✅</span>
          ) : (
            <span className="text-red-500 font-medium">No ❌</span>
          )}
        </p>
      </div>
    </div>
  );
};
