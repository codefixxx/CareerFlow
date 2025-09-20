import React from "react";
import { Handle, Position } from "reactflow";

export default function MyNode({ data }) {
  
  const isRootNode = data.parentId === null; // root node has no parentId

  return (
    <div
      style={{ cursor: isRootNode ? undefined : "pointer" }}
      onClick={() => {
        if (!isRootNode) data.onSelect?.(); // only allow clicking child nodes
      }}
      className="px-4 py-2 border-2 border-slate-700 bg-slate-800 text-slate-100 rounded-lg shadow-md max-w-55 relative
        hover:scale-105 hover:shadow-xl transition-all duration-200"
    >
      <p className="font-semibold text-slate-100 text-wrap  md:text-xl">{data.label}</p>

      {/* Connection handles */}
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <Handle type="source" position={Position.Bottom} isConnectable={false}/>
    </div>
  );
}

