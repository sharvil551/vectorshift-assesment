import { Textarea } from "@/components/ui/textarea";
import {
  COMPONENT_TYPES,
  HANDLE_POSITIONS,
  HANDLE_TYPE,
} from "@/helpers/enums";
import React, { useState } from "react";
import NodeHeader from "../components/NodeHeader";
import { NodeHandle } from "../components/NodeHandle";

export const WordCounterNode = ({ id }) => {
  const [text, setText] = useState("");

  // Calculate word count - trimming to avoid counting empty strings
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="bg-white border border-node-border border-2 rounded-sm w-[280px] h-auto shadow-sm text-xs font-medium text-gray-700">
      <NodeHeader
        id={id}
        icon={COMPONENT_TYPES.WORD_COUNTER.icon}
        title={COMPONENT_TYPES.WORD_COUNTER.label}
        description={COMPONENT_TYPES.WORD_COUNTER.description}
      />

      <div className="p-3 pt-2 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <div />
            <div className="bg-primary text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-primary">
              Text
            </div>
          </div>
          <Textarea
            className="w-full h-24 overflow-y-auto resize-none rounded border border-gray-300 p-2 text-sm border-node-border bg-white focus:outline-none focus:ring-primary focus:border-primary transition duration-150 ease-in-out selection:bg-text-selection selection:text-white drag-handle"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="text-center text-gray-600 font-semibold">
            Word Count: {wordCount}
          </div>
        </div>
      </div>

      <NodeHandle
        handles={[
          {
            id: `${id}-target`,
            position: HANDLE_POSITIONS.LEFT,
            type: HANDLE_TYPE.TARGET,
          },
          {
            id: `${id}-source`,
            position: HANDLE_POSITIONS.RIGHT,
            type: HANDLE_TYPE.SOURCE,
          },
        ]}
      />
    </div>
  );
};
