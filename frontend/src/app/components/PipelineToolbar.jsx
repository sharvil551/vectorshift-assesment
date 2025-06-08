import { MdInput, MdTextFields, MdTimer } from "react-icons/md";
import { MdOutlineOutput } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { GiArtificialHive } from "react-icons/gi";
import { SiGoogleanalytics } from "react-icons/si";

import { DraggableNode } from "./DraggableNode";
import { FaCode, FaDatabase, FaFileUpload } from "react-icons/fa";
import { COMPONENT_TYPES } from "../../helpers/enums";

export const PipelineToolbar = () => {
  
  // List of nodes to be displayed in the toolbar
  const NODES_LIST = [
    {
      // Input
      type: COMPONENT_TYPES.CUSTOM_INPUT.type,
      icon: <MdInput />,
      label: COMPONENT_TYPES.CUSTOM_INPUT.label,
    },
    {
      // LLM
      type: COMPONENT_TYPES.LLM.type,
      icon: <GiArtificialHive />,
      label: COMPONENT_TYPES.LLM.label,
    },
    {
      // Output
      type: COMPONENT_TYPES.CUSTOM_OUTPUT.type,
      icon: <MdOutlineOutput />,
      label: COMPONENT_TYPES.CUSTOM_OUTPUT.label,
    },
    {
      // Text
      type: COMPONENT_TYPES.TEXT.type,
      icon: <HiOutlineDocumentText />,
      label: COMPONENT_TYPES.TEXT.label,
    },
    {
      // Analytics
      type: COMPONENT_TYPES.ANALYTICS.type,
      icon: <SiGoogleanalytics />,
      label: COMPONENT_TYPES.ANALYTICS.label,
    },
    {
      // JSON
      type: COMPONENT_TYPES.JSON.type,
      icon: <FaCode />,
      label: COMPONENT_TYPES.JSON.label,
    },
    {
      // File Uploader
      type: COMPONENT_TYPES.FILE_UPLOADER.type,
      icon: <FaFileUpload />,
      label: COMPONENT_TYPES.FILE_UPLOADER.label,
    },
    {
      // Word Counter
      type: COMPONENT_TYPES.WORD_COUNTER.type,
      icon: <MdTextFields />,
      label: COMPONENT_TYPES.WORD_COUNTER.label,
    },

    {
      // DB Explorer
      type: COMPONENT_TYPES.DB_EXPLORER.type,
      icon: <FaDatabase />,
      label: COMPONENT_TYPES.DB_EXPLORER.label,
    },
  ];

  return (
    <div className="bg-white">
      <div className="flex flex-wrap gap-5  p-3 bg-[#f7f7f7]  border-[#e5e5e5] border-b-2">
        {NODES_LIST.map((item) => (
          <DraggableNode
            key={item.type}
            type={item.type}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};
