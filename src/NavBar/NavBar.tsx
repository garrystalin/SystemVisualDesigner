import React from "react";
import { IFlowState } from "../Interfaces";

interface INavBarProps {
  flowState: IFlowState;
  onClick: (nodeState: IFlowState) => void;
}

export const NavBar = (params: INavBarProps) => (
  <div>
    {params.flowState
      .map((element, index) =>
        renderNavBarElement(element, index, params.onClick)
      )
      .reverse()}
  </div>
);

const renderNavBarElement = (
  element: IFlowState,
  index: number,
  onClick: (element: IFlowState) => void
) => (
  <div key={index}>
    {element.name !== "/" ? "/" : null}
    <button onClick={() => onClick(element)}>{element.name}</button>
  </div>
);
