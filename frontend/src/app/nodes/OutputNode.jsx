import { useState } from "react";
import { MdOutlineOutput } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { Handle, Position, useReactFlow } from "reactflow";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { COMPONENT_TYPES } from "@/helpers/enums";

export const OutputNode = ({ id, data }) => {
  const [currName] = useState(
    data?.outputName || id.replace("custom_output-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");
  const { deleteElements } = useReactFlow();

  // const handleNameChange = (e) => {
  //   setCurrName(e.target.value);
  // };

  const handleTypeChange = (value) => {
    setOutputType(value);
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
      <div className="p-2">
        <div className="border border-[#d6d6ff] rounded-md bg-[#f4f4ff]">
          <div className="flex items-start justify-between p-1">
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                <MdOutlineOutput className="w-4 h-4" fill="#635bc8" />
                <span className="text-[#635bc8]">{COMPONENT_TYPES.CUSTOM_OUTPUT.label}</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Output data of different types from your workflow.
              </p>
            </div>
            <RxCrossCircled
              onClick={handleDeleteNode}
              className="text-gray-500 w-6 h-6 hover:text-red-500 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="p-3 pt-1">
        <div className="bg-[#e5e7fb] text-center text-xs text-gray-600 py-1 rounded font-mono">
          {currName}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={styles}
      />

      <div className="p-3 pt-1 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <label htmlFor={outputType}>Type</label>
            <div className="bg-[#6466f1] text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-[#6466f1]">
              Dropdown
            </div>
          </div>
          <Select value={outputType} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full text-sm rounded-lg border border-[#e5e7fb] bg-white  focus:ring-[#635bc8] focus:border-[#635bc8] transition duration-150 ease-in-out">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Select Type</SelectLabel> */}
                <SelectItem value="Text">Text</SelectItem>
                <SelectItem value="File">File</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between items-center px-1">
          <label htmlFor={outputType}>Format Output</label>
          <Switch   className="data-[state=checked]:bg-[#6466f1]"/>
        </div>
      </div>
      {/* <div>
        <span>Output</span>
      </div>
      <div>
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div> */}
    </div>
  );
};
