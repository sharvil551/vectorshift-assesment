import { Textarea } from "@/components/ui/textarea";
import {
  COMPONENT_TYPES,
  HANDLE_POSITIONS,
  HANDLE_TYPE,
} from "@/helpers/enums";
import NodeHeader from "../components/NodeHeader";
import { NodeHandle } from "../components/NodeHandle";

export const LLMNode = ({ id }) => {
  return (
    <div className="bg-white border border-node-border border-2 rounded-sm w-[230px] shadow-sm  text-xs font-medium text-gray-700">
      <NodeHeader
        id={id}
        icon={COMPONENT_TYPES.LLM.icon}
        title={COMPONENT_TYPES.LLM.label}
        description={COMPONENT_TYPES.LLM.description}
      />

      <div className="p-3 pt-2 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <label htmlFor={`${id}-system`} className="text-xs text-gray-700">
              System Prompt
            </label>
            <div className="bg-primary text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-primary">
              Text
            </div>
          </div>
          <Textarea
            id={`${id}-system`}
            placeholder="You are a helpful assistant..."
            className="h-25 overflow-y-auto resize-none text-sm rounded-lg border border-node-border bg-white focus:outline-none focus:ring-primary focus:border-primary transition duration-150 ease-in-out selection:bg-text-selection selection:text-white drag-handle"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <label htmlFor={`${id}-prompt`} className="mx-1">
              Prompt
            </label>
            <div className="bg-primary text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-primary">
              Text
            </div>
          </div>
          <Textarea
            id={`${id}-prompt`}
            placeholder="Summarize this article in 3 bullet points."
            className="h-25 overflow-y-auto resize-none text-sm rounded-lg border border-node-border bg-white focus:outline-none focus:ring-primary focus:border-primary transition duration-150 ease-in-out selection:bg-text-selection selection:text-white drag-handle"
          />
        </div>
      </div>

      <NodeHandle
        handles={[
          {
            id: `${id}-system-target`,
            type: HANDLE_TYPE.TARGET,
            position: HANDLE_POSITIONS.LEFT,
            customStyles: { top: `${100 / 3}%` },
          },
          {
            id: `${id}-prompt-target`,
            type: HANDLE_TYPE.TARGET,
            position: HANDLE_POSITIONS.LEFT,
            customStyles: { top: `${200 / 3}%` },
          },
          {
            id: `${id}-response-source`,
            type: HANDLE_TYPE.SOURCE,
            position: HANDLE_POSITIONS.RIGHT,
          },
        ]}
      />
    </div>
  );
};
