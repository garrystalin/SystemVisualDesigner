import React, { useCallback, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  addEdge,
  NodeTypes,
  Controls,
  Background,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import { DefaultNode } from "../Nodes/DefaultNode";

interface IFlowProps {
  reactFlowWrapper: React.MutableRefObject<any>;
  edges: Edge[];
  nodes: Node<any>[];
}

const nodeTypes = { defaultNode: DefaultNode };

const onDropCallback = (event, wrapper, instance, setNodes) => {
  event.preventDefault();

  const reactFlowBounds = wrapper.current.getBoundingClientRect();
  const type = event.dataTransfer.getData("application/reactflow");

  if (typeof type === "undefined" || !type) return;

  const position = instance.project({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  });

  const newNode = {
    id: uuidv4(),
    type: "defaultNode",
    position,
    data: { label: `${type} node` },
  };

  setNodes((nodes: any[]) => nodes.concat(newNode));
};

const onDragOverCallback = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

export const Flow = (props: IFlowProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDrop = useCallback(
    (event) =>
      onDropCallback(
        event,
        props.reactFlowWrapper,
        reactFlowInstance,
        setNodes
      ),
    [reactFlowInstance, setNodes]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <div className="reactflow-wrapper" ref={props.reactFlowWrapper}>
        <ReactFlow
          edges={edges}
          nodes={nodes}
          nodeTypes={nodeTypes as unknown as NodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={useCallback(onDragOverCallback, [])}
          snapToGrid={true}
          fitView
        >
          <Controls />
          <Background></Background>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};
