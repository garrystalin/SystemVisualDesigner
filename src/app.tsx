import React, { useState, useRef } from "react";
import { NavBar } from "./NavBar/NavBar";
import "./App.scss";
import Menu from "./Menu/Menu";
import { Flow } from "./Flow/Flow";
import { IFlowState, INodeState } from "./Interfaces";
import { FlowElement } from "./Common";

const onLoadFile = (event, setFlowState) => {
  let reader = new FileReader();
  reader.onloadend = () => {
    var loadedNodes = JSON.parse(reader.result as string) as INodeState;
    var flowState = new FlowElement(
      { edges: loadedNodes.edges, nodes: loadedNodes.nodes },
      "/"
    );
    setFlowState(flowState);
  };
  reader.readAsText(event.target.files[0]);
};

const rootFlowState: IFlowState = new FlowElement(
  { edges: [], nodes: [] },
  "/"
);

export const App = () => {
  const [flowState, setFlowState] = useState(rootFlowState);
  const reactFlowWrapper = useRef(null);

  const onClick = (flowState: IFlowState): void => {
    setFlowState(flowState);
  };

  return (
    <div className="dndflow">
      <Menu
        edges={flowState.nodeState.edges}
        nodes={flowState.nodeState.nodes}
        onLoadFile={(e) => onLoadFile(e, setFlowState)}
      />
      <NavBar flowState={flowState} onClick={onClick} />
      <Flow
        reactFlowWrapper={reactFlowWrapper}
        edges={flowState.nodeState.edges}
        nodes={flowState.nodeState.nodes}
      />
    </div>
  );
};
