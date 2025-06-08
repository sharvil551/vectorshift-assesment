import { CiText } from "react-icons/ci";
import { FaDatabase, FaFileUpload } from "react-icons/fa";
import { GiArtificialHive } from "react-icons/gi";
import { MdInput, MdOutlineOutput, MdTextFields } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { BsFiletypeJson } from "react-icons/bs";
import { Position } from "reactflow";

export const COMPONENT_TYPES = {
  CUSTOM_INPUT: {
    icon: MdInput,
    type: "custom_input",
    label: "Input",
    description: "Pass data of different types into your workflow",
  },
  LLM: {
    icon: GiArtificialHive,
    type: "llm",
    label: "LLM",
    description: "Processes text using a language model",
  },
  CUSTOM_OUTPUT: {
    icon: MdOutlineOutput,
    type: "custom_output",
    label: "Output",
    description: "Output data of different types from your workflow",
  },
  TEXT: {
    icon: CiText,
    type: "text",
    label: "Text",
    description: "Outputs custom text with variable bindings",
  },
  // New node types
  ANALYTICS: {
    icon: SiGoogleanalytics,
    type: "analytics",
    label: "Analytics",
    description: "Displays token consumption statistics from the LLM response",
  },
  JSON: {
    icon: BsFiletypeJson,
    type: "json",
    label: "JSON",
    description:
      "Generate and preview sample JSON for your workflow integration",
  },
  FILE_UPLOADER: {
    icon: FaFileUpload,
    type: "file_uploader",
    label: "File Uploader",
    description: "Upload files and extract basic file metadata",
  },
  WORD_COUNTER: {
    icon: MdTextFields,
    type: "word_counter",
    label: "Word Counter",
    description: "Type or paste text to count words dynamically",
  },
  DB_EXPLORER: {
    icon: FaDatabase,
    type: "db_explorer",
    label: "DB Explorer",
    description: "View table structures across environments",
  },
};

export const DB_COLLECTIONS = {
  local: [
    { name: "Users", columns: 12, rows: 50 },
    { name: "LocalSettings", columns: 4, rows: 1 },
  ],
  dev: [
    { name: "Users", columns: 12, rows: 1500 },
    { name: "Orders", columns: 8, rows: 450 },
    { name: "Products", columns: 15, rows: 200 },
  ],
  prod: [
    { name: "Users", columns: 12, rows: 50000 },
    { name: "Orders", columns: 8, rows: 14500 },
    { name: "Products", columns: 15, rows: 3200 },
    { name: "Payments", columns: 10, rows: 14000 },
    { name: "Categories", columns: 5, rows: 50 },
  ],
};

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

export const TOAST_POSITION = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  TOP_CENTER: "top-center",
  BOTTOM_CENTER: "bottom-center",
};

export const HANDLE_TYPE = {
  TARGET: "target",
  SOURCE: "source",
};

export const HANDLE_POSITIONS = {
  LEFT: Position.Left,
  TOP: Position.Top,
  RIGHT: Position.Right,
  BOTTOM: Position.Bottom,
};


