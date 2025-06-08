import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import {
  COMPONENT_TYPES,
  HANDLE_POSITIONS,
  HANDLE_TYPE,
} from "@/helpers/enums";
import NodeHeader from "../components/NodeHeader";
import { NodeHandle } from "../components/NodeHandle";

 const generateJsonData = () => ({
  id: Math.floor(Math.random() * 1000),
  user: {
    name: "Albert Mao" ,
    age: Math.floor(Math.random() * 40 + 20),
    active: Math.random() > 0.5,
  },
  timestamp: new Date().toISOString(),
});
export function JsonPreviewNode({ id }) {
  const [jsonData, setJsonData] = useState(generateJsonData());

  const generateJson = () => {
    setJsonData(generateJsonData());
  };

  return (
    <div className="bg-white border border-node-border border-2 rounded-sm  w-[320px]  shadow-sm  text-xs font-medium text-gray-700">
      <NodeHeader
        id={id}
        icon={COMPONENT_TYPES.JSON.icon}
        title={COMPONENT_TYPES.JSON.label}
        description={COMPONENT_TYPES.JSON.description}
      />

      <div className="p-3 pt-1">
        <div className="flex justify-center">
          <button
            onClick={generateJson}
            className="focus:outline-none text-white bg-primary hover:bg-[#4e50e8] active:scale-95 hover:shadow-lg transition-all duration-200 font-medium rounded-lg text-sm px-2 py-1 cursor-pointer"
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
}
