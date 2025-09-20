import { getBezierPath } from 'reactflow';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, style }) {
    const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });

    return (
        <path
            id={id}
            d={edgePath}
            fill="none"
            strokeWidth={3}
            className="stroke-slate-900 edge-animate" // Tailwind works here ✅
            style={{
                ...style,
                strokeDasharray: "5,5", // dashed line

            }}
        />
    );
}


