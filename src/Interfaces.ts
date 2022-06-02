import { Edge, Node } from "react-flow-renderer";

export interface IFlowState {
    count: number;
    name: string;
    description: string;
    nodeState: INodeState;
    prevElement: IFlowState;

    onEnter?: (nodes: Node[], edges: Edge[]) => void;
}

export interface INodeState {
    nodes: Node[];
    edges: Edge[];
}
