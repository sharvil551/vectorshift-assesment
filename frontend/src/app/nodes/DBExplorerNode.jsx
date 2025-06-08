import React, { useState } from "react";
import { FaTable } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiRefreshCcw, FiChevronDown, FiChevronRight } from "react-icons/fi";
import {
  COMPONENT_TYPES,
  DB_COLLECTIONS,
  HANDLE_POSITIONS,
  HANDLE_TYPE,
} from "@/helpers/enums";
import NodeHeader from "../components/NodeHeader";
import { NodeHandle } from "../components/NodeHandle";

export const DBExplorerNode = ({ id, data }) => {
  const [currName] = useState(
    data?.outputName || id.replace("db_details_node-", "db_explorer_")
  );
  const [env, setEnv] = useState("dev");
  const [expanded, setExpanded] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800); // simulate delay
  };

  const onTableClick = (table) => {
    console.log("Clicked table:", table);
  };

  return (
    <div className="bg-white border border-node-border border-2 rounded-sm w-[280px] h-[330px] shadow-sm text-xs font-medium text-gray-700">
    

      <NodeHeader
        id={id}
        icon={COMPONENT_TYPES.DB_EXPLORER.icon}
        title={COMPONENT_TYPES.DB_EXPLORER.label}
        description={COMPONENT_TYPES.DB_EXPLORER.description}
        actions={
          <button
            onClick={handleRefresh}
            title="Refresh tables"
            className={`cursor-pointer  transition-transform duration-300 ${
              refreshing ? "animate-spin" : ""
            }`}
          >
            <FiRefreshCcw className="w-4 h-4 text-gray-500 hover:text-primary " />
          </button>
        }
      />

      <div className="px-3 pt-1">
        <div className="bg-node-border text-center text-xs text-gray-700 py-1 rounded font-mono">
          {currName}
        </div>
      </div>

      <div className="p-3 pt-2 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <label className="text-[12px] font-semibold text-gray-600">
              Environment
            </label>
            <div className="bg-primary text-white text-[10px] font-medium px-1 py-0.5 rounded-sm">
              Select
            </div>
          </div>
          <Select value={env} onValueChange={(value) => setEnv(value)}>
            <SelectTrigger className="w-full text-sm rounded-lg border border-node-border bg-white focus:ring-primary focus:border-primary transition">
              <SelectValue placeholder="Choose environment" />
            </SelectTrigger>
            <SelectContent className="w-full text-sm rounded-lg border border-node-border bg-white  focus:ring-primary focus:border-primary transition duration-150 ease-in-out">
              <SelectGroup>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="prod">Production</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-600 font-semibold cursor-pointer flex items-center gap-1 hover:underline"
        >
          {expanded ? (
            <>
              <FiChevronDown /> Hide Tables
            </>
          ) : (
            <>
              <FiChevronRight /> Show Tables
            </>
          )}
        </div>

        {expanded && (
          <ul className="list-disc list-inside space-y-1 max-h-28 overflow-y-auto pr-1">
            {DB_COLLECTIONS[env].map((table) => (
              <li
                key={table.name}
                onClick={() => onTableClick(table)}
                className="flex items-center justify-between gap-2 text-[12px] hover:bg-gray-100 px-1 py-0.5 rounded cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <FaTable className="text-gray-500" />
                  <span>{table.name}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">
                  {table.columns} cols / {table.rows} rows
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <NodeHandle
        handles={[
          {
            id: `${id}-target`,
            type: HANDLE_TYPE.TARGET,
            position: HANDLE_POSITIONS.LEFT,
          },
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
