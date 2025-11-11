import { getBezierPath } from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      {/* Soft outer glow for depth */}
      <path
        d={edgePath}
        fill="none"
        stroke="url(#edgeGlow)"
        strokeWidth={8}
        className="blur-md opacity-30"
      />

      {/* Main dashed, animated line */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        strokeWidth={2.5}
        className="edge-animate"
        style={{
          ...style,
          stroke: "url(#edgeMain)",
          strokeDasharray: "10,7",
          animation: "dashFlow 2.8s linear infinite",
          filter: "drop-shadow(0 0 3px var(--glow))",
        }}
      />

      <defs>
        {/*  Gradient for main line  */}
        <linearGradient id="edgeMain" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--edge-start)" />
          <stop offset="100%" stopColor="var(--edge-end)" />
        </linearGradient>

        {/*  Soft glow  */}
        <linearGradient id="edgeGlow" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--glow-start)" />
          <stop offset="100%" stopColor="var(--glow-end)" />
        </linearGradient>

        {/*  Animations + Theme  */}
        <style>{`
          @keyframes dashFlow {
            to {
              stroke-dashoffset: -20;
            }
          }

          /* Dark Mode — Indigo → Violet Glow */
          @media (prefers-color-scheme: dark) {
            :root {
              --edge-start: #6366f1; /* indigo-500 */
              --edge-end: #8b5cf6;   /* violet-500 */
              --glow-start: #6366f1;
              --glow-end: #8b5cf6;
              --glow: #8b5cf6;
            }
          }

          /*  Light Mode — Sky → Blue Glow */
          @media (prefers-color-scheme: light) {
            :root {
              --edge-start: #38bdf8; /* sky-400 */
              --edge-end: #3b82f6;   /* blue-500 */
              --glow-start: #38bdf8;
              --glow-end: #3b82f6;
              --glow: #3b82f6;
            }
          }
        `}</style>
      </defs>
    </>
  );
}




