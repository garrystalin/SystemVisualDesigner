import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  NodeTypes,
} from "react-flow-renderer";
import { NavBar } from "./NavBar/NavBar";
import "./App.scss";
import Menu from "./Menu/Menu";
import { DefaultNode } from "./Nodes/DefaultNode";
import { v4 as uuidv4 } from "uuid";

const nodeTypes = { defaultNode: DefaultNode };

const onDragOverCallback = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

const onDropCallback = (event, wrapper, instance, setNodes) => {
  event.preventDefault();

  const reactFlowBounds = wrapper.current.getBoundingClientRect();
  const type = event.dataTransfer.getData("application/reactflow");

  if (typeof type === "undefined" || !type) {
    return;
  }

  const position = instance.project({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  });

  const newNode = {
    id: getId(),
    type: "defaultNode",
    position,
    data: { label: `${type} node` },
  };

  setNodes((nodes: any[]) => nodes.concat(newNode));
};

const onLoadFile = (event, setNodes, setEdges) => {
  let reader = new FileReader();
  let file = event.target.files[0];

  reader.onloadend = () => {
    var loadedNodes = JSON.parse(reader.result as string);
    setNodes(loadedNodes.nodes);
    setEdges(loadedNodes.edges);
  };

  reader.readAsText(file);
};

const getId = () => uuidv4();

const rootNode = {
  id: getId(),
  type: "default",
  position: null,
  data: {
    nodes: [],
    parentNode: null,
  },
};

export const App = () => {
  const reactFlowWrapper = useRef(null);
  const [currentNode, setCurrentNode] = useState(rootNode);
  const [currentPath, setCurrentPath] = useState("/");
  const [nodes, setNodes, onNodesChange] = useNodesState(currentNode.data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event) =>
      onDropCallback(event, reactFlowWrapper, reactFlowInstance, setNodes),
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="dndflow">
      {/* todo убрать? */}
      <ReactFlowProvider>
        <Menu
          edges={edges}
          nodes={nodes}
          onLoadFile={(e) => onLoadFile(e, setNodes, setEdges)}
        />
        <NavBar path={currentPath} />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
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
    </div>
  );
};
