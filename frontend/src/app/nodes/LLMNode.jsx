import { Textarea } from "@/components/ui/textarea";
import { COMPONENT_TYPES } from "@/helpers/enums";
import { GiArtificialHive } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";
import { Handle, Position, useReactFlow } from "reactflow";

export const LLMNode = ({ id }) => {
  const { deleteElements } = useReactFlow();
  const handleDeleteNode = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const styles = {
    background: "#fff",
    width: "12px",
    height: "12px",
    border: "1px solid #4e50e8",
  
  };

  return (
    <div className="bg-white border border-[#d6d6ff] border-2 rounded-sm w-[230px] shadow-sm  text-xs font-medium text-gray-700">
      <div className="p-2">
        <div className="border border-[#d6d6ff] rounded-md bg-[#f4f4ff]">
          <div className="flex items-start justify-between p-1">
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                <GiArtificialHive className="w-4 h-4" fill="#635bc8" />
                <span className="text-[#635bc8]">{COMPONENT_TYPES.LLM.label}</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Processes text using a language model
              </p>
            </div>
            <RxCrossCircled
              onClick={handleDeleteNode}
              className="text-gray-500 w-6 h-6 hover:text-red-500 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: `${100 / 3}%`, ...styles }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: `${200 / 3}%`, ...styles }}
      />

      <div className="p-3 pt-2 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <label htmlFor={`${id}-system`} className="text-xs text-gray-700">
              System Prompt
            </label>
            <div className="bg-[#6466f1] text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-[#6466f1]">
              Text
            </div>
          </div>
          <Textarea
            id={`${id}-system`}
            placeholder="You are a helpful assistant..."
            className="resize-none text-sm rounded-lg border border-[#e5e7fb] bg-white focus:outline-none focus:ring-[#635bc8] focus:border-[#635bc8] transition duration-150 ease-in-out"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <label htmlFor={`${id}-prompt`} className="mx-1">
              Prompt
            </label>
            <div className="bg-[#6466f1] text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-[#6466f1]">
              Text
            </div>
          </div>
          <Textarea
            id={`${id}-prompt`}
            placeholder="Summarize this article in 3 bullet points."
            className="resize-none text-sm border border-[#e5e7fb] focus:outline-none focus:ring-[#635bc8] focus:border-[#635bc8]"
          />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        style={styles}
      />
    </div>
  );
};
