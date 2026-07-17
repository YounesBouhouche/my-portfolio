import React from "react";

interface NodeProps {
  icon: React.ReactNode;
  label: string;
  isFirst?: boolean;
  isLast?: boolean;
}

export function PipelineNode({ icon, label, isFirst, isLast }: NodeProps) {
  return (
    <div className="flex flex-col items-center relative group z-10">
      {/* The chamfered icon box */}
      <div className="w-10 h-10 bg-white chamfered flex items-center justify-center text-black mb-2 shadow-sm border border-transparent transition-all group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(0,136,193,0.5)]">
        {icon}
      </div>
      
      {/* Label */}
      <div className="text-[0.6rem] font-mono text-gray-500 uppercase text-center max-w-[60px] leading-tight group-hover:text-gray-300 transition-colors">
        {label}
      </div>

      {/* Input connector (left) */}
      {!isFirst && (
        <div className="absolute top-5 -left-4 w-4 border-t border-dashed border-gray-600 -translate-y-1/2"></div>
      )}

      {/* Output connector (right) */}
      {!isLast && (
        <div className="absolute top-5 -right-4 w-4 border-t border-dashed border-gray-600 -translate-y-1/2">
          {/* Connector dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        </div>
      )}
    </div>
  );
}

export function NodePipeline({ nodes }: { nodes: { icon: React.ReactNode; label: string }[] }) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="flex items-start justify-center gap-8 py-8 relative">
      {/* Background connector line */}
      <div className="absolute top-13 left-10 right-10 border-t border-dashed border-gray-700/50 z-0"></div>
      
      {nodes.map((node, i) => (
        <PipelineNode 
          key={i} 
          icon={node.icon} 
          label={node.label} 
          isFirst={i === 0} 
          isLast={i === nodes.length - 1} 
        />
      ))}
    </div>
  );
}
