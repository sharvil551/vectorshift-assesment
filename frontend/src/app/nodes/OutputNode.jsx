import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  COMPONENT_TYPES,
  HANDLE_POSITIONS,
  HANDLE_TYPE,
} from "@/helpers/enums";
import NodeHeader from "../components/NodeHeader";
import { NodeHandle } from "../components/NodeHandle";

export const OutputNode = ({ id, data }) => {
  const [currName] = useState(
    data?.outputName || id.replace("custom_output-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleTypeChange = (value) => {
    setOutputType(value);
  };

  return (
    <div className="bg-white border border-node-border border-2 rounded-sm w-[280px] shadow-sm  text-xs font-medium text-gray-700">
      <NodeHeader
        id={id}
        icon={COMPONENT_TYPES.CUSTOM_OUTPUT.icon}
        title={COMPONENT_TYPES.CUSTOM_OUTPUT.label}
        description={COMPONENT_TYPES.CUSTOM_OUTPUT.description}
      />
      <div className="p-3 pt-1">
        <div className="bg-node-border text-center text-xs text-gray-600 py-1 rounded font-mono">
          {currName}
        </div>
      </div>

      <div className="p-3 pt-1 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <label htmlFor={outputType}>Type</label>
            <div className="bg-primary text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-primary">
              Dropdown
            </div>
          </div>
          <Select value={outputType} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full text-sm rounded-lg border border-node-border bg-white  focus:ring-primary focus:border-primary transition duration-150 ease-in-out">
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
        <div className="flex justify-between items-center px-1">
          <label htmlFor={outputType}>Format Output</label>
          <Switch className="data-[state=checked]:bg-primary" />
        </div>
      </div>

      <NodeHandle
        handles={[
          {
            id: `${id}-target`,
            type: HANDLE_TYPE.TARGET,
            position: HANDLE_POSITIONS.LEFT,
          },
        ]}
      />
    </div>
  );
};
