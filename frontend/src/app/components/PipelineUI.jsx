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
import { FileUploaderNode } from "../nodes/FileUploaderNode";
import { WordCounterNode } from "../nodes/WordCounterNode";
import { DBExplorerNode } from "../nodes/DBExplorerNode";
import { COMPONENT_TYPES } from "../../helpers/enums";
import { JsonPreviewNode } from "../nodes/JsonPreviewNode";

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

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore((state) => state, shallow);
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
      <div ref={reactFlowWrapper} className="h-[75vh] w-[100vw]">
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
          defaultEdgeOptions={{
            style: {
              stroke: "var(--primary)",
              strokeDasharray: "4 2",
              strokeWidth: 2.5,
            },
          }}
          defaultMarkerColor="none"
          connectionLineStyle={{
            stroke: "var(--primary)",
            strokeDasharray: "4 2",
            strokeWidth: 2.5,
          }}
        >
          <Background gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};
