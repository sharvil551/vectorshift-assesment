import {
  COMPONENT_TYPES,
  HANDLE_POSITIONS,
  HANDLE_TYPE,
} from "@/helpers/enums";
import { useState, useEffect, useRef } from "react";
import NodeHeader from "../components/NodeHeader";
import { NodeHandle } from "../components/NodeHandle";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  const resizeTextareaHeight = () => {
    const textarea = textareaRef.current;
    const container = containerRef.current;
    if (textarea && container) {
      // Auto-expand textarea until maxHeight, then allow scroll
      const maxTextAreaHeight = 550;
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, maxTextAreaHeight);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > maxTextAreaHeight ? "auto" : "hidden";

      // Adjust width based on content
      const minWidth = 230;
      const maxWidth = 600;
      const scrollWidth = textarea.scrollWidth + 48; // extra for padding/icons
      const newWidth = Math.min(Math.max(minWidth, scrollWidth), maxWidth);
      container.style.width = `${newWidth}px`;

      // Adjust container height: header + handles + visible textarea
      const topSectionHeight = 110; // approx for header, paddings etc.
      const handleHeight = variables.length * 20;
      container.style.height = `${
        topSectionHeight + newHeight + handleHeight
      }px`;
    }
  };
  const handleTextChange = (e) => {
    const val = e.target.value;
    setCurrText(val);

    // Match all {{variable}} patterns
    const matches = Array.from(
      val.matchAll(/{{\s*([a-zA-Z_$][\w$]*)\s*}}/g)
    ).map((match) => match[1]);

    // Remove duplicates
    const uniqueVars = [...new Set(matches)];
    setVariables(uniqueVars);
    resizeTextareaHeight();
  };

  // Auto-adjust node size
  // useEffect(() => {
  //   const el = containerRef.current;
  //   const textarea = textareaRef.current;
  //   if (el && textarea) {
  //     const baseHeight = 200;
  //     const varHeight = variables.length * 20;
  //     el.style.height = `${baseHeight + varHeight}px`;

  //     // Adjust width based on textarea scroll
  //     const minWidth = 130;
  //     const maxWidth = 500;
  //     const scrollWidth = textarea.scrollWidth + 40;
  //     const newWidth = Math.min(Math.max(minWidth, scrollWidth), maxWidth);
  //     el.style.width = `${newWidth}px`;
  //   }

  // }, [currText, variables]);

  useEffect(() => {
    resizeTextareaHeight();
  }, [currText, variables]);

  return (
    <div
      ref={containerRef}
      className="bg-white border border-node-border border-2 rounded-sm shadow-sm text-xs font-medium text-gray-700 transition-all duration-200"
    >
      <NodeHeader
        id={id}
        icon={COMPONENT_TYPES.TEXT.icon}
        title={COMPONENT_TYPES.TEXT.label}
        description={COMPONENT_TYPES.TEXT.description}
      />

      <div className="p-3 pt-2 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <label htmlFor={`${id}-system`} className="text-xs text-gray-700">
              Enter text
            </label>
            <div className="bg-primary text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-[#6466f1]">
              Text
            </div>
          </div>
          <textarea
            id={`${id}-system`}
            rows={6}
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text in form of {{input}}"
            className="resize-none text-sm rounded-lg border border-[#e5e7fb] bg-white focus:outline-none focus:ring-[#635bc8] focus:border-[#635bc8] transition duration-150 ease-in-out h-auto min-w-[200px]"
          />
        </div>
      </div>

      <NodeHandle
        handles={[
          ...variables.map((v, i) => ({
            id: `${id}-${v}-target`,
            type: HANDLE_TYPE.TARGET,
            position: HANDLE_POSITIONS.LEFT,
            customStyles: {
              top: 30 + i * 20,
            },
          })),
          {
            id: `${id}-source`,
            type: HANDLE_TYPE.SOURCE,
            position: HANDLE_POSITIONS.RIGHT,
          },
        ]}
      />
    </div>
  );
};
