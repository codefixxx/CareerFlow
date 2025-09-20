// CareerFlow.jsx
import React, { useState, useEffect } from "react";
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
  if (!careerData) return <div>No data available</div>;

  const rootPaths = [careerData];
  const { nodes: initialNodes, edges: initialEdges } =
    transformCareerTree(rootPaths);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const { fitView } = useReactFlow();

  useEffect(() => {
    const handleResize = () => fitView?.({ padding: 0.2 });
    window.addEventListener("resize", handleResize);
    setTimeout(() => fitView?.({ padding: 0.2 }), 0);
    return () => window.removeEventListener("resize", handleResize);
  }, [fitView]);

  return (
    <div className="flex h-screen w-full bg-white ">
      <div className="flex-1 h-full overflow-auto">
        <ReactFlow
          nodes={nodes.map((n) => ({
            ...n,
            data: {
              ...n.data,

              onSelect: () => onNodeSelect(n, nodes), // notify parent
            },
          }))}
          onPaneClick={onCanvasClick}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
          zoomOnDoubleClick={false}
          fitView={true}

          minZoom={0.2}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
          className="w-full h-full"
        // ✅ detect background click
        >
          <Background
            className="bg-slate-300 dark:bg-slate-700"
            variant="dots"
            gap={12}
            size={1}
          />
          <Controls style={{ marginBottom: 30 }} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function CareerFlow({ careerData, onNodeSelect, onCanvasClick }) {
  return (
    <ReactFlowProvider>
      <CareerFlowInner
        careerData={careerData}
        onNodeSelect={onNodeSelect}
        onCanvasClick={onCanvasClick}
      />
    </ReactFlowProvider>
  );
}


