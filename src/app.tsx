import React, { useState, useRef } from "react";
import { NavBar } from "./NavBar/NavBar";
import "./App.scss";
import Menu from "./Menu/Menu";
import { Flow } from "./Flow/Flow";
import { IFlowState, INodeState } from "./Interfaces";
import { getNewFlowState } from "./Common";
import { Node, Edge, useEdgesState, useNodesState } from "react-flow-renderer";

const onLoadFile = (event, setFlowState) => {
    let reader = new FileReader();
    reader.onloadend = () => {
        var loadedNodes = JSON.parse(reader.result as string) as INodeState;
        var flowState = getNewFlowState(loadedNodes.nodes, loadedNodes.edges, null, setFlowState);
        setFlowState(flowState);
    };
    reader.readAsText(event.target.files[0]);
};

const set = (
    flowState: IFlowState,
    prevNodes: Node[],
    prevEdges: Edge[],
    setFlowState: (flowState: IFlowState) => void,
    setNodes: (nodes) => void,
    setEdges: (edges) => void
) => {
    console.log(".");
    flowState.nodeState = {nodes: prevNodes, edges: prevEdges};
    setFlowState(flowState);
    setNodes(flowState.nodeState.nodes);
    setEdges(flowState.nodeState.edges);
};

export const App = () => {
    const [flowState, setFlowState] = useState(getNewFlowState([], [], null, () => set(flowState, [], [], setFlowState, setNodes, setEdges)));
    const [nodes, setNodes, onNodesChange] = useNodesState(flowState.nodeState.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(flowState.nodeState.edges);
    const reactFlowWrapper = useRef(null);

    return (
        <div className="dndflow">
            <Menu edges={flowState.nodeState.edges} nodes={flowState.nodeState.nodes} onLoadFile={(e) => onLoadFile(e, setFlowState)} />
            <NavBar flowState={flowState} onClick={setFlowState} />
            <Flow
                nodesState={{ nodes, setNodes, onNodesChange }}
                edgesState={{ edges, setEdges, onEdgesChange }}
                reactFlowWrapper={reactFlowWrapper}
                onEnterNode={(flowState, nodes, edges) => set(flowState, nodes, edges, setFlowState, setNodes, setEdges)}
                flowState={flowState}
            />
        </div>
    );
};
