import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  NodeTypes,
} from "react-flow-renderer";
import NavBar from "./NavBar/NavBar";
import "./App.scss";
import Menu from "./Menu/Menu";
import DefaultNode from "./Nodes/DefaultNode";

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = { defaultNode: DefaultNode };

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type: "defaultNode",
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onLoadFile = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      var loadedNodes = JSON.parse(reader.result as string);
      setNodes(loadedNodes.nodes);
      setEdges(loadedNodes.edges);
    };

    reader.readAsText(file);
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Menu edges={edges} nodes={nodes} onLoadFile={onLoadFile} />
        <NavBar />
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
            onDragOver={onDragOver}
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

export default App;
