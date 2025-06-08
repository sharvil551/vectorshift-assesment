import { useState } from "react";
import { MdInput } from "react-icons/md";
import { Handle, Position, useReactFlow } from "reactflow";
import { RxCrossCircled } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPONENT_TYPES } from "@/helpers/enums";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("custom_input-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");
  const { deleteElements } = useReactFlow();

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (value) => {
    setInputType(value);
  };
  const styles = {
    background: "#fff",
    width: "12px",
    height: "12px",
    border: "1px solid #4e50e8",
  };

  const handleDeleteNode = () => {
    deleteElements({ nodes: [{ id }] });
  };
  return (
    <div className="bg-white border border-[#d6d6ff] border-2 rounded-sm w-[230px] shadow-sm  text-xs font-medium text-gray-700">
      {/* Header */}
      <div className="p-2">
        <div className="border border-[#d6d6ff] rounded-md bg-[#f4f4ff]">
          <div className="flex items-start justify-between p-1">
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                <MdInput className="w-4 h-4" fill="#635bc8" />
                <span className="text-[#635bc8]">
                  {COMPONENT_TYPES.CUSTOM_INPUT.label}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Pass data of different types into your workflow
              </p>
            </div>
            <RxCrossCircled
              onClick={handleDeleteNode}
              className="text-gray-500  w-6 h-6  hover:text-red-500 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 pt-2">
        {/* <div className="bg-[#e5e7fb] text-center text-xs text-gray-600 py-1 rounded font-mono mb-3">
          {currName}
        </div> */}

        <div className="flex flex-col gap-3 text-[12px]">
          {/* <div className="flex justify-between items-center"> */}
          {/* <span className="text-gray-600">Type</span>
            <span className="text-indigo-600 text-xs bg-indigo-100 px-2 py-0.5 rounded-full">
          {inputType}
        </span> */}

          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center px-1">
              <label htmlFor={currName} className="mx-1">
                Name
              </label>
              <div className="bg-[#6466f1] text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-[#6466f1]">
                Text
              </div>
            </div>
            <Input
              type="text"
              id={currName}
              placeholder="Input"
              value={currName}
              onChange={handleNameChange}
              className="text-sm rounded-lg border border-[#e5e7fb] bg-white focus:outline-none  focus:ring-[#635bc8] focus:border-[#635bc8] transition duration-150 ease-in-out"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center px-1">
              <label htmlFor={inputType} className="mx-1">
                Select Option
              </label>
              <div className="bg-[#6466f1] text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-[#6466f1]">
                Dropdown
              </div>
            </div>
            <Select value={inputType} onValueChange={handleTypeChange}>
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
};
