import React from "react";
import { IFlowState } from "../Interfaces";

interface INavBarProps {
    flowState: IFlowState;
    onClick: (nodeState: IFlowState) => void;
}

export const NavBar = (params: INavBarProps) => <div>{mapFlowStateToNavBar(params.flowState, params.onClick)}</div>;

const renderNavBarElement = (element: IFlowState, index: number, onClick: (element: IFlowState) => void) => (
    <div key={index}>
        {element.name !== "/" ? "/" : null}
        <button onClick={() => onClick(element)}>{element.name}</button>
    </div>
);

const mapFlowStateToNavBar = (flowState: IFlowState, onClick: (flowState: IFlowState) => void): JSX.Element[] => {
    let current = flowState;
    let index = 0;
    const elements = [];
    do {
        elements.push(renderNavBarElement(current, index, onClick));
        current = current.prevElement;
        index++;
    } while (current);
    return elements;
};
