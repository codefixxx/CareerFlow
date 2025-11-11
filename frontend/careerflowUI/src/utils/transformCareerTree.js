// utils/transformCareerTree.js
import dagre from "dagre";

const nodeWidth = 220;
const nodeHeight = 90;

export function transformCareerTree(careerPaths) {
  const nodes = [];
  const edges = [];

  function traverse(path, parentId = null) {
    const id = path.name;

    nodes.push({
      id,
      type: "custom",
      data: {
        label: path.name,
        parentId,
        skills: path.extra_skills_needed || [],
        trends: path.future_trends || [],
        description: path.description || "",
      },
      position: { x: 0, y: 0 },
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

  const isMobile = window.innerWidth < 768;

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir: isMobile ? "LR" : "TB",
    nodesep: isMobile ? 60 : 120,
    ranksep: isMobile ? 160 : 300,
    marginx: 50,
    marginy: 50,
  });

  nodes.forEach((node) =>
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  );
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);

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
