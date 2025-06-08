import { useReactFlow, Handle, Position } from "reactflow";
import { RxCrossCircled } from "react-icons/rx";
import { FaCode } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { COMPONENT_TYPES } from "@/helpers/enums";

export function JsonPreviewNode({ id }) {
  const { deleteElements } = useReactFlow();

  const handleDeleteNode = () => {
    deleteElements({ nodes: [{ id }] });
  };
  const [jsonData, setJsonData] = useState({
    id: 1,
    user: {
      name: "John Doe",
      age: Math.floor(Math.random() * 40 + 20),
      active: true,
    },
    timestamp: new Date().toISOString(),
  });

  const generateJson = () => {
    const newJson = {
      id: Math.floor(Math.random() * 1000),
      user: {
        name: "John Doe",
        age: Math.floor(Math.random() * 40 + 20),
        active: Math.random() > 0.5,
      },
      timestamp: new Date().toISOString(),
    };
    setJsonData(newJson);
  };

  return (
    <div className="bg-white border border-[#d6d6ff] border-2 rounded-sm  w-[320px]  shadow-sm  text-xs font-medium text-gray-700">
      <div className="p-2">
        <div className="border border-[#d6d6ff] rounded-md bg-[#f4f4ff]">
          <div className="flex items-start justify-between p-1">
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                <FaCode className="w-4 h-4" fill="#635bc8" />
                <span className="text-[#635bc8]">
                  {COMPONENT_TYPES.JSON.label}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Generate and preview sample JSON for your workflow integration.
              </p>
            </div>
            <RxCrossCircled
              onClick={handleDeleteNode}
              className="text-gray-500 w-6 h-6   hover:text-red-500 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={{
          background: "#fff",
          width: "12px",
          height: "12px",
          border: "1px solid #4e50e8",
        }}
      />
      <div className="p-3 pt-1">
        <div className="flex justify-center">
          <button
            onClick={generateJson}
            className="focus:outline-none text-white bg-[#6466f1] hover:bg-[#4e50e8] active:scale-95 hover:shadow-lg transition-all duration-200 font-medium rounded-lg text-sm px-2 py-1 cursor-pointer"
          >
            Generate
          </button>
        </div>

        <div className="overflow-auto text-[11px] font-mono text-gray-700   -md mt-2">
          <div className="min-w-full overflow-x-auto">
            <SyntaxHighlighter
              language="json"
              style={oneLight}
              customStyle={{
                background: "#f9f9ff",
              }}
            >
              {JSON.stringify(jsonData, null, 2)}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
