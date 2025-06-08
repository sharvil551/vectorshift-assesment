import { COMPONENT_TYPES } from '@/helpers/enums';
import { useState, useEffect, useRef } from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { RxCrossCircled } from 'react-icons/rx';
import { Handle, Position, useReactFlow } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);
  const { deleteElements } = useReactFlow();


const resizeTextareaHeight = () => {
  const textarea = textareaRef.current;
  const container = containerRef.current;
  if (textarea && container) {
    // Auto-expand textarea until maxHeight, then allow scroll
    const maxTextAreaHeight = 550; 
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, maxTextAreaHeight);
    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxTextAreaHeight ? 'auto' : 'hidden';

    // Adjust width based on content
    const minWidth = 230;
    const maxWidth = 600;
    const scrollWidth = textarea.scrollWidth + 48; // extra for padding/icons
    const newWidth = Math.min(Math.max(minWidth, scrollWidth), maxWidth);
    container.style.width = `${newWidth}px`;

    // Adjust container height: header + handles + visible textarea
    const topSectionHeight = 110; // approx for header, paddings etc.
    const handleHeight = variables.length * 20;
    container.style.height = `${topSectionHeight + newHeight + handleHeight}px`;
  }
};
  const handleTextChange = (e) => {
    const val = e.target.value;
    setCurrText(val);

    // Match all {{variable}} patterns
    const matches = Array.from(val.matchAll(/{{\s*([a-zA-Z_$][\w$]*)\s*}}/g)).map(
      (match) => match[1]
    );

    // Remove duplicates
    const uniqueVars = [...new Set(matches)];
    setVariables(uniqueVars);
     resizeTextareaHeight(); 
  };

  const handleDeleteNode = () => {
    deleteElements({ nodes: [{ id }] });
  };

  // Auto-adjust node size
  // useEffect(() => {
  //   const el = containerRef.current;
  //   const textarea = textareaRef.current;
  //   if (el && textarea) {
  //     const baseHeight = 200;
  //     const varHeight = variables.length * 20;
  //     el.style.height = `${baseHeight + varHeight}px`;

  //     // Adjust width based on textarea scroll
  //     const minWidth = 130;
  //     const maxWidth = 500;
  //     const scrollWidth = textarea.scrollWidth + 40;
  //     const newWidth = Math.min(Math.max(minWidth, scrollWidth), maxWidth);
  //     el.style.width = `${newWidth}px`;
  //   }
    
  // }, [currText, variables]);

  useEffect(() => {
  resizeTextareaHeight();
}, [currText, variables]);

  return (
    <div
      ref={containerRef}
      className="bg-white border border-[#d6d6ff] border-2 rounded-sm shadow-sm text-xs font-medium text-gray-700 transition-all duration-200"
    >
      <div className="p-2">
        <div className="border border-[#d6d6ff] rounded-md bg-[#f4f4ff]">
          <div className="flex items-start justify-between p-1">
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                <HiOutlineDocumentText className="w-4 h-4" fill="#635bc8" />
                <span className="text-[#635bc8]">{COMPONENT_TYPES.TEXT.label}</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Outputs custom text with variable bindings.
              </p>
            </div>
            <RxCrossCircled
              onClick={handleDeleteNode}
              className="text-gray-500 w-5 h-5 hover:text-red-500 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>

      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{
            top: 20 + i * 20,
            background: '#fff',
            width: '12px',
            height: '12px',
            border: '1px solid #4e50e8',
          }}
        />
      ))}

      <div className="p-3 pt-2 flex flex-col gap-3">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center px-1">
            <label htmlFor={`${id}-system`} className="text-xs text-gray-700">
              Enter text
            </label>
            <div className="bg-[#6466f1] text-white text-[10px] font-medium px-0.5 py-0.5 rounded-sm border border-[#6466f1]">
              Text
            </div>
          </div>
          <textarea
            id={`${id}-system`}
           rows={6}
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text in form of {{input}}"
            className="resize-none text-sm rounded-lg border border-[#e5e7fb] bg-white focus:outline-none focus:ring-[#635bc8] focus:border-[#635bc8] transition duration-150 ease-in-out h-auto min-w-[200px]"
          />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: '#fff',
          width: '12px',
          height: '12px',
          border: '1px solid #4e50e8',
        }}
      />
    </div>
  );
};