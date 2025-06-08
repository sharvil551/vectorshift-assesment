import { Textarea } from "@/components/ui/textarea";
import { COMPONENT_TYPES } from "@/helpers/enums";
import React, { useState } from "react";
import { MdTextFields } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { Handle, Position, useReactFlow } from "reactflow";

export const WordCounterNode = ({ id }) => {
  const [text, setText] = useState("");
  const { deleteElements } = useReactFlow();

  // Calculate word count - trimming to avoid counting empty strings
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

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
    <div className="bg-white border border-[#d6d6ff] border-2 rounded-sm w-[280px] h-auto shadow-sm text-xs font-medium text-gray-700">
      <div className="p-2">
        <div className="border border-[#d6d6ff] rounded-md bg-[#f4f4ff]">
          <div className="flex items-start justify-between p-1">
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                <MdTextFields className="w-4 h-4" fill="#635bc8" />
                <span className="text-[#635bc8]">{COMPONENT_TYPES.WORD_COUNTER.label}</span>
              </div>
              <p className="text-[11px] text-gray-500 ">
                Type or paste text to count words dynamically.
              </p>
            </div>
            <RxCrossCircled
              onClick={handleDeleteNode}
              className="text-gray-500 w-5 h-5 hover:text-red-500 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={styles}
      />
      <div className="p-3 pt-2 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center px-1">
            <div/>
            <div className="bg-[#6466f1] text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-[#6466f1]">
              Text
            </div>
          </div>
          <Textarea
            className="w-full h-24 overflow-y-auto resize-none rounded border border-gray-300 p-2 text-sm border-[#e5e7fb] bg-white focus:outline-none focus:ring-[#635bc8] focus:border-[#635bc8] transition duration-150 ease-in-out drag-handle"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          
          />
          <div className="text-center text-gray-600 font-semibold">
            Word Count: {wordCount}
          </div>
        </div>
      </div>
    </div>
  );
};
