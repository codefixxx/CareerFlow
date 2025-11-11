// MyNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";

export default function MyNode({ data }) {
  const isRootNode = data.parentId === null;

  return (
    <div
      style={{ cursor: isRootNode ? "default" : "pointer" }}
      onClick={() => {
        if (!isRootNode) data.onSelect?.();
      }}
      className={`
        group relative flex flex-col items-center justify-center
        px-7 py-5 w-72 rounded-2xl border-2 shadow-xl
        transition-all duration-300 ease-in-out
        hover:shadow-2xl hover:scale-[1.06]

        ${isRootNode
          ? `
            border-indigo-400
            bg-gradient-to-br from-indigo-50 to-indigo-100
            dark:from-slate-800 dark:to-slate-900
          `
          : `
            border-slate-300
            bg-gradient-to-br from-white to-slate-100
            dark:border-slate-600 dark:from-slate-700 dark:to-slate-900
          `
        }

        text-slate-800 dark:text-slate-100
        hover:border-indigo-400
      `}
    >
      {/* Label */}
      <p
        className={`font-semibold text-center text-wrap ${
          isRootNode
            ? "text-indigo-600 dark:text-indigo-300 text-xl md:text-xl"
            : "text-slate-800 dark:text-slate-100 text-lg md:text-xl"
        }`}
      >
        {data.label}
      </p>

      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={{
          background: "#818cf8",
          border: "2px solid #312e81",
          width: 12,
          height: 12,
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        style={{
          background: "#818cf8",
          border: "2px solid #312e81",
          width: 12,
          height: 12,
        }}
      />

      {/* Animated subtle glow */}
      <div
        className="
          absolute -z-10 blur-3xl rounded-full w-40 h-40
          opacity-40 group-hover:opacity-80 transition-all duration-700
          bg-gradient-to-br from-indigo-400/50 via-blue-400/40 to-cyan-300/40
          dark:from-indigo-700/40 dark:via-blue-900/30 dark:to-cyan-800/30
          animate-pulse
        "
      ></div>
    </div>
  );
}


