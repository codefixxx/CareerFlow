import dagre from "dagre";

const nodeWidth = 200;
const nodeHeight = 80;

export function transformCareerTree(careerPaths) {
  const nodes = [];
  const edges = [];

  function traverse(path, parentId = null) {
    const id = path.name;

    nodes.push({
      id,
      type: "custom",
      data: parentId
        ? { parentId:parentId,
            label: path.name,
            skills: path.extra_skills_needed,
            trends: path.future_trends,
            description: path.description,
            
          }
        : { label: path.name,
            parentId: parentId,
         }, // root node only has label
      position: { x: 0, y: 0 },
      
       // dagre will handle positioning
    });

    if (parentId) {
      edges.push({
        id: `${parentId}-${id}`,
        type: "custom",
        source: parentId,
        target: id,
      });
    }

    if (path.sub_career_paths?.length) {
      path.sub_career_paths.forEach((sub) => traverse(sub, id));
    }
  }

  careerPaths.forEach((path) => traverse(path));

  // Responsive layout
  const isMobile = window.innerWidth < 768;

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir: isMobile ? "LR" : "TB", // horizontal on mobile, vertical on desktop
    nodesep: isMobile ? 40 : 80,
    ranksep: isMobile ? 120 : 400,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  // Apply dagre positions
  const positionedNodes = nodes.map((node) => {
    const pos = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: pos.x - nodeWidth / 2,
        y: pos.y - nodeHeight / 2,
      },
    };
  });
 
  return { nodes: positionedNodes, edges };
}
