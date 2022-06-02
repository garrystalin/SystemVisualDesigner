import { Edge, Node } from "react-flow-renderer";
import { IFlowState } from "./Interfaces";

export const getNewFlowState = (
    nodes: Node[],
    edges: Edge[],
    prevElement: IFlowState,
    onEnterNode: (flowState: IFlowState, nodes, edges) => void
): IFlowState => {
    return {
        count: 0,
        description: "desc",
        name: "NodeName",
        nodeState: { edges: edges ?? [], nodes: nodes ?? [] },
        prevElement: prevElement,
        onEnter: (nodes, edges) => onEnterNode(this, nodes, edges),
    };
};
