// components/CareerFlow.jsx
import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { transformCareerTree } from "../utils/transformCareerTree";
import MyNode from "./MyNode";
import CustomEdge from "./CustomEdges";

const nodeTypes = { custom: MyNode };
const edgeTypes = { custom: CustomEdge };

function CareerFlowInner({ careerData, onNodeSelect, onCanvasClick }) {
  const { fitView } = useReactFlow();

  if (!careerData) return <div>No data available</div>;

  const { nodes: initialNodes, edges: initialEdges } = transformCareerTree([
    careerData,
  ]);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  //  Debounced fitView for resize performance
  useEffect(() => {
    const handleResize = () => {
      clearTimeout(window.__resizeTimer);
      window.__resizeTimer = setTimeout(() => fitView({ padding: 0.3 }), 150);
    };
    window.addEventListener("resize", handleResize);
    setTimeout(() => fitView({ padding: 0.3 }), 0);
    return () => window.removeEventListener("resize", handleResize);
  }, [fitView]);

  //  Memoize nodes for smoother panning
  const renderedNodes = useCallback(
    nodes.map((n) => ({
      ...n,
      data: {
        ...n.data,
        onSelect: () => onNodeSelect(n, nodes),
      },
    })),
    [nodes, onNodeSelect]
  );

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 h-full overflow-hidden rounded-xl shadow-inner border border-gray-300 dark:border-gray-700">
        <ReactFlow
          nodes={renderedNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onPaneClick={onCanvasClick}
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
          zoomOnDoubleClick={false}
          panOnScroll
          panOnDrag
          zoomOnPinch
          minZoom={0.2}
          maxZoom={2}
          fitView
          proOptions={{ hideAttribution: true }}
          className="w-full h-full transition-all duration-300 ease-in-out"
        >
          <Background
            variant="dots"
            gap={16}
            size={1}
            className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
          />
          <Controls
            className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-1 shadow-lg"
            style={{ width:0, bottom: 20, right: 20 }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function CareerFlow(props) {
  return (
    <ReactFlowProvider>
      <CareerFlowInner {...props} />
    </ReactFlowProvider>
  );
}


