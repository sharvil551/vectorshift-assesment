
export const COMPONENT_TYPES = {
  CUSTOM_INPUT: { type: "custom_input",label: "Input"},
  LLM: {type: "llm",label: "LLM"},
  CUSTOM_OUTPUT: {type: "custom_output",label: "Output"},
  TEXT: {type: "text",label: "Text"},
// New node types
  ANALYTICS:{type: "analytics",label: "Analytics"},
  JSON: {type: "json",label: "JSON"},
  FILE_UPLOADER: {type: "file_uploader",label: "File Uploader"},
  WORD_COUNTER: {type: "word_counter",label: "Word Counter"},
  DB_EXPLORER: {type: "db_explorer",label: "DB Explorer"},
};



export const DB_COLLECTIONS = {
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
  local: [
    { name: "Users", columns: 12, rows: 50 },
    { name: "LocalSettings", columns: 4, rows: 1 },
  ],
};