import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COMPONENT_TYPES,
  HANDLE_POSITIONS,
  HANDLE_TYPE,
} from "@/helpers/enums";
import NodeHeader from "../components/NodeHeader";
import { NodeHandle } from "../components/NodeHandle";

export const InputNode = ({ id, data }) => {
  const [currName] = useState(
    data?.inputName || id.replace("custom_input-", "input_")
  );
  const [value, setValue] = useState("text");
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleTypeChange = (value) => {
    setInputType(value);
  };

  return (
    <div className="bg-white border border-node-border border-2 rounded-sm w-[230px] shadow-sm  text-xs font-medium text-gray-700">
      <NodeHeader
        id={id}
        icon={COMPONENT_TYPES.CUSTOM_INPUT.icon}
        title={COMPONENT_TYPES.CUSTOM_INPUT.label}
        description={COMPONENT_TYPES.CUSTOM_INPUT.description}
      />

      <div className="p-3 pt-2">
        <div className="bg-node-border text-center text-xs text-gray-600 py-1 rounded font-mono mb-3">
          {currName}
        </div>

        <div className="flex flex-col gap-3 text-[12px]">
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center px-1">
              <label htmlFor={currName} className="mx-1">
                Name
              </label>
              <div className="bg-primary text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border">
                Text
              </div>
            </div>
            <Input
              type="text"
              id={value}
              placeholder="Input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-sm rounded-lg border border-node-border bg-white focus:outline-none focus:ring-primary focus:border-primary transition duration-150 ease-in-out selection:bg-text-selection selection:text-white"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center px-1">
              <label htmlFor={inputType} className="mx-1">
                Select Option
              </label>
              <div className="bg-primary text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-primary">
                Dropdown
              </div>
            </div>
            <Select value={inputType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full text-sm rounded-lg border border-node-border  bg-white  focus:ring-primary focus:border-primary transition duration-150 ease-in-out">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="w-full text-sm rounded-lg border border-node-border bg-white  focus:ring-primary focus:border-primary transition duration-150 ease-in-out">
                <SelectGroup>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="File">File</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <NodeHandle
        handles={[
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
