import { useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { RxCrossCircled } from "react-icons/rx";
import { FaFileUpload } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { COMPONENT_TYPES } from "@/helpers/enums";

export function FileUploaderNode({ id }) {
  const [fileInfo, setFileInfo] = useState(null);
  const { deleteElements } = useReactFlow();
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
    <div className="bg-white border border-[#d6d6ff] border-2 rounded-sm w-[280px] shadow-sm  text-xs font-medium text-gray-700">
      {/* Header */}

      <div className="p-2">
        <div className="border border-[#d6d6ff] rounded-md bg-[#f4f4ff]">
          <div className="flex items-start justify-between p-1">
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                <FaFileUpload className="w-4 h-4" fill="#635bc8" />
                <span className="text-[#635bc8]">{COMPONENT_TYPES.FILE_UPLOADER.label}</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Upload files and extract basic file metadata.
              </p>
            </div>
            <RxCrossCircled
              onClick={handleDeleteNode}
              className="text-gray-500 w-6 h-6 hover:text-red-500 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* React Flow Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
       style={styles}
      />

      {/* Body */}
      <div className="p-3 pt-1 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <Input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#6466f1] file:text-white hover:file:bg-[#6466f1] cursor-pointer border-0 shadow-none"
          />

          <div className="bg-[#f9f9ff] p-2 mt-2 rounded-md text-[11px] min-h-[60px] transition-all duration-300">
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

       <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        style={styles}
      />
    </div>
  );
}
