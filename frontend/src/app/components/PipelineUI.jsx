import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";

import "reactflow/dist/style.css";
import { InputNode } from "../nodes/InputNode";
import { LLMNode } from "../nodes/LLMNode";
import { OutputNode } from "../nodes/OutputNode";
import { TextNode } from "../nodes/TextNode";
import { AnalyticsNode } from "../nodes/AnalyticsNode";
import { JsonPreviewNode } from "../nodes/JSONPreviewNode";
import { FileUploaderNode } from "../nodes/FileUploaderNode";
import { WordCounterNode } from "../nodes/WordCounterNode";
import { DBExplorerNode } from "../nodes/DBExplorerNode";
import { COMPONENT_TYPES } from "../../helpers/enums";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  [COMPONENT_TYPES.CUSTOM_INPUT.type]: InputNode,
  [COMPONENT_TYPES.LLM.type]: LLMNode,
  [COMPONENT_TYPES.CUSTOM_OUTPUT.type]: OutputNode,
  [COMPONENT_TYPES.TEXT.type]: TextNode,
  // New node types
  [COMPONENT_TYPES.ANALYTICS.type]: AnalyticsNode,
  [COMPONENT_TYPES.JSON.type]: JsonPreviewNode,
  [COMPONENT_TYPES.FILE_UPLOADER.type]: FileUploaderNode,
  [COMPONENT_TYPES.WORD_COUNTER.type]: WordCounterNode,
  [COMPONENT_TYPES.DB_EXPLORER.type]: DBExplorerNode,
};

// const selector = (state) => ({
//   nodes: state.nodes,
//   edges: state.edges,
//   getNodeID: state.getNodeID,
//   addNode: state.addNode,
//   onNodesChange: state.onNodesChange,
//   onEdgesChange: state.onEdgesChange,
//   onConnect: state.onConnect,
// });

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const {
  //   nodes,
  //   edges,
  //   getNodeID,
  //   addNode,
  //   onNodesChange,
  //   onEdgesChange,
  //   onConnect
  // } = useStore(selector, shallow);

  const nodes = useStore((state) => state.nodes, shallow);
  const edges = useStore((state) => state.edges, shallow);
  const getNodeID = useStore((state) => state.getNodeID, shallow);
  const addNode = useStore((state) => state.addNode, shallow);
  const onNodesChange = useStore((state) => state.onNodesChange, shallow);
  const onEdgesChange = useStore((state) => state.onEdgesChange, shallow);
  const onConnect = useStore((state) => state.onConnect, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      {/* <div className="absolute top-30 left-1 bg-white  shadow-lg rounded-lg p-4 w-auto border border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Pipeline Status
        </h2>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span>Nodes</span>
          <span className="font-bold text-indigo-600">{nodes.length}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Edges</span>
          <span className="font-bold text-indigo-600">{edges.length}</span>
        </div>
      </div> */}
      <div ref={reactFlowWrapper} style={{ width: "100wv", height: "70vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          //  noDragClassName='drag-handle'
          noWheelClassName="drag-handle"
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};
