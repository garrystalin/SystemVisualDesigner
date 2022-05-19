import { IFlowState, INodeState } from "./Interfaces";

export class FlowElement implements IFlowState {
    name: string;
    nodeState: INodeState;
    prevElement: IFlowState | null;
    constructor(
      nodeState: INodeState,
      name: string,
      prevElement: IFlowState = null
    ) {
      this.name = name;
      this.nodeState = nodeState;
      this.prevElement = prevElement;
    }
    map<U>(callback: (value: IFlowState, index: number) => U): U[] {
      let current = this as IFlowState;
      const arr = [];
      let index = 0;
      do {
        arr.push(callback(current, index));
        current = this.prevElement;
        index++;
      } while (current);
      return arr;
    }
    reverceForEach = (callback: (value: IFlowState) => void): void => {
      let current = this as IFlowState;
      do {
        callback(current);
        current = current.prevElement;
      } while (current);
    };
  }