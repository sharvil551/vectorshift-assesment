import { useState } from "react";

export const DraggableNode = ({ type, icon:Icon, label }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
    event.target.style.cursor = "grabbing";
    setIsDragging(true);
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = "grab";
    setIsDragging(false);
  };

  return (
    <div
      className={`text-gray-600 border-2 border-toolbar-border hover:border-primary hover:bg-primary-hover-bg rounded-lg min-w-24 min-h-20 gap-2 cursor-grab bg-white flex items-center justify-center flex-col p-2 flex-wrap ${type}
        ${
          isDragging
            ? "border-dashed border-primary bg-primary/10 scale-105 shadow-md transition-all duration-200 ease-in-out"
            : "border-toolbar-border hover:border-primary hover:bg-primary-hover-bg"
        }
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      <span className="text-2xl">{Icon && <Icon/>}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};
