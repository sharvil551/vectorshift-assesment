import React, { useState } from "react";
import { FaDatabase, FaTable } from "react-icons/fa";
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
import { FiRefreshCcw, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { COMPONENT_TYPES, DB_COLLECTIONS } from "@/helpers/enums";

export const DBExplorerNode = ({ id, data }) => {
  const { deleteElements } = useReactFlow();
  const [currName] = useState(
    data?.outputName || id.replace("db_details_node-", "db_explorer_")
  );
  const [env, setEnv] = useState("dev");
  const [expanded, setExpanded] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleDeleteNode = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800); // simulate delay
  };

  const onTableClick = (table) => {
    console.log("Clicked table:", table);
  };

  const styles = {
    background: "#fff",
    width: "12px",
    height: "12px",
    border: "1px solid #4e50e8",
  };

  return (
    <div className="bg-white border border-[#d6d6ff] border-2 rounded-sm w-[280px] h-[330px] shadow-sm text-xs font-medium text-gray-700">
      <div className="p-2">
        <div className="border border-[#d6d6ff] rounded-md bg-[#f4f4ff]">
          <div className="flex items-start justify-between p-1">
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                <FaDatabase className="w-4 h-4" fill="#635bc8" />
                <span className="text-[#635bc8]">
                  {COMPONENT_TYPES.DB_EXPLORER.label}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                View table structures across environments.
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <button
                onClick={handleRefresh}
                title="Refresh tables"
                className={`cursor-pointer  transition-transform duration-300 ${
                  refreshing ? "animate-spin" : ""
                }`}
              >
                <FiRefreshCcw className="w-4 h-4 text-gray-500 hover:text-[#635bc8] " />
              </button>
              <RxCrossCircled
                onClick={handleDeleteNode}
                className="text-gray-500 w-5 h-5 hover:text-red-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pt-1">
        <div className="bg-[#e5e7fb] text-center text-xs text-gray-700 py-1 rounded font-mono">
          {currName}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={styles}
      />

      <div className="p-3 pt-2 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <label className="text-[12px] font-semibold text-gray-600">
              Environment
            </label>
            <div className="bg-[#6466f1] text-white text-[10px] font-medium px-1 py-0.5 rounded-sm">
              Select
            </div>
          </div>
          <Select value={env} onValueChange={(value) => setEnv(value)}>
            <SelectTrigger className="w-full text-sm rounded-lg border border-[#e5e7fb] bg-white focus:ring-[#635bc8] focus:border-[#635bc8] transition">
              <SelectValue placeholder="Choose environment" />
            </SelectTrigger>
            <SelectContent>
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
    </div>
  );
};
