import React, { useState } from "react";
import CareerFlow from "../components/CareerFlow";
import Sidebar from "../components/Sidebar";

import { useLocation } from "react-router-dom";

export default function Flow() {
  const [selectedNode, setSelectedNode] = useState(null);
  const location = useLocation();
  const careerData = location.state?.careerData;
  const country = location.state?.country;

  const handleNodeSelect = (node, nodes) => {
    // Hide sidebar if root node (parentId=null)
    if (!node || node.data.parentId === null) {
      setSelectedNode(null);
    } else {
      const parentNode = nodes.find((n) => n.id === node.data.parentId);
      const isLayer1 = parentNode && parentNode.data.parentId === null;

      setSelectedNode({
        ...node,
        isLayer1, // Sidebar can now safely read this
      });
    }
  };

  const handleCanvasClick = () => {
    setSelectedNode(null);
  };

  return (
    <div className="flex h-screen relative">
      <div
        className="flex-1"

      >
        <CareerFlow
          careerData={careerData}
          onNodeSelect={handleNodeSelect}
          onCanvasClick={handleCanvasClick}
        />
      </div>

      {/* Render Sidebar only if a valid node is selected */}
      {selectedNode && (
        <Sidebar selectedNode={selectedNode} onClose={() => setSelectedNode(null)} country={country} />
      )}
    </div>
  );
}