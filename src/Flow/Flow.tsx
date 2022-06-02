import React, { useCallback, useState } from "react";
import ReactFlow, { Node, ReactFlowProvider, addEdge, NodeTypes, Controls, Background, Edge } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import { getNewFlowState } from "../Common";
import { IFlowState } from "../Interfaces";
import { DefaultNode, IDefaultNodeProps } from "../Nodes/DefaultNode";

interface IFlowProps {
    reactFlowWrapper: React.MutableRefObject<any>;
    flowState: IFlowState;
    nodesState: { nodes; setNodes; onNodesChange };
    edgesState: { edges; setEdges; onEdgesChange };
    onEnterNode: (flowState: IFlowState, nodes: Node[], edges: Edge[]) => void;
}

const nodeTypes = { defaultNode: DefaultNode };

const onDragOverCallback = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
};

export const Flow = (props: IFlowProps) => {
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onDropCallback = (event) => {
        event.preventDefault();

        const reactFlowBounds = props.reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");

        if (typeof type === "undefined" || !type) return;

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const flowState = getNewFlowState([], [], props.flowState, (_, nodes, edges) => props.onEnterNode(flowState, nodes, edges));

        const newNode: Node<IDefaultNodeProps> = {
            id: uuidv4(),
            type: "defaultNode",
            position,
            data: { edges: props.edgesState.edges, nodes: props.nodesState.nodes, flowState: flowState },
        };

        props.nodesState.setNodes((nodes: any[]) => [...nodes, newNode]);
    };

    const onDrop = useCallback((event) => onDropCallback(event), [reactFlowInstance, props.nodesState.setNodes]);

    const onConnect = useCallback((params) => props.edgesState.setEdges((eds) => addEdge(params, eds)), [props.edgesState.setEdges]);

    return (
        <ReactFlowProvider>
            <div className="reactflow-wrapper" ref={props.reactFlowWrapper}>
                <ReactFlow
                    edges={props.edgesState.edges}
                    nodes={props.nodesState.nodes}
                    nodeTypes={nodeTypes as unknown as NodeTypes}
                    onNodesChange={props.nodesState.onNodesChange}
                    onEdgesChange={props.edgesState.onEdgesChange}
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
