import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  COMPONENT_TYPES,
  HANDLE_POSITIONS,
  HANDLE_TYPE,
} from "@/helpers/enums";
import NodeHeader from "../components/NodeHeader";
import { NodeHandle } from "../components/NodeHandle";

export function FileUploaderNode({ id }) {
  const [fileInfo, setFileInfo] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInfo({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        type: file.type,
      });
    }
  };

  return (
    <div className="bg-white border border-node-border border-2 rounded-sm w-[280px] shadow-sm  text-xs font-medium text-gray-700">
      <NodeHeader
        id={id}
        icon={COMPONENT_TYPES.FILE_UPLOADER.icon}
        title={COMPONENT_TYPES.FILE_UPLOADER.label}
        description={COMPONENT_TYPES.FILE_UPLOADER.description}
      />

      <div className="p-3 pt-1 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <Input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary cursor-pointer border-0 shadow-none"
          />

          <div className="bg-node-header-bg p-2 mt-2 rounded-md text-[11px] min-h-[60px] transition-all duration-300">
            {fileInfo ? (
              <>
                <div>
                  <strong>Name:</strong> {fileInfo.name}
                </div>
                <div>
                  <strong>Size:</strong> {fileInfo.size}
                </div>
                <div>
                  <strong>Type:</strong> {fileInfo.type || "Unknown"}
                </div>
              </>
            ) : (
              <div className="text-gray-400 italic text-center">
                Select a file to see details
              </div>
            )}
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
