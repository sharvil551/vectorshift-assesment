import { DraggableNode } from "./DraggableNode";
import { COMPONENT_TYPES } from "../../helpers/enums";

export const PipelineToolbar = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-wrap gap-5  p-3 bg-toolbar-bg  border-toolbar-border border-b-2">
        {Object.values(COMPONENT_TYPES).map((item) => (
          <DraggableNode
            key={item.type}
            type={item.type}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};
