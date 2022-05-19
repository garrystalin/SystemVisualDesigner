import { Edge, Node } from "react-flow-renderer";

export interface IFlowState {
  name: string;
  nodeState: INodeState;
  prevElement: IFlowState;
  reverceForEach(callback: (value: IFlowState) => void): void;
  map<U>(callbackfn: (value: IFlowState, index: number) => U): U[];
}

export interface INodeState {
  nodes: Node<any>[];
  edges: Edge<any>[];
}
