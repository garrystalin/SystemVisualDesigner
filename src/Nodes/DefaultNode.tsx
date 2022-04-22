import React, { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import Button from "../Buttons/Button";
import EditIcon from "../Icons/EditIcon";
import EnterIcon from "../Icons/EnterIcon";
import RemoveIcon from "../Icons/RemoveIcon";
import "./DefaultNode.scss";

const targetHandle = () => <Handle type="target" position={Position.Left} />;
const sourceHandle = () => (
  <>
    {" "}
    <Handle type="source" position={Position.Right} id="a" />
  </>
);

const renderTitle = (text: string) => (
  <div className="default-node-title">{text}</div>
);

const renderDescription = (text: string) => (
  <div className="default-node-description">{text}</div>
);

const renderLinks = (links) => (
  <div className="default-node-links">
    <div className="default-node-links-inside">
      In:|{links ? links.inside : 0}
    </div>
    <div className="default-node-links-all"></div>
    {links ? links.inside : ""} {links ? links.count : ""}
  </div>
);

const renderControl = () => (
  <div className="default-node-control">
    <Button
      backgroundColor={"#238C2A"}
      icon={EnterIcon}
      iconColor={"#333"}
      iconSize={16}
      onClick={() => {}}
      title={"Enter"}
      className={"default-node-button-enter"}
    ></Button>
    <Button
      backgroundColor={"#238C2A"}
      icon={RemoveIcon}
      iconColor={"#333"}
      iconSize={16}
      onClick={() => {}}
      title={"Enter"}
      className={"default-node-button-enter"}
    ></Button>
    <Button
      backgroundColor={"#238C2A"}
      icon={EditIcon}
      iconColor={"#333"}
      iconSize={16}
      onClick={() => {}}
      title={"Enter"}
      className={"default-node-button-enter"}
    ></Button>
  </div>
);

const DefaultNode = (props: { data }) => {
  // const onChange = useCallback((event) => {
  //   console.log(event.target.value);
  // }, []);
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div
      className="default-node"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {targetHandle()}
      {renderTitle(props.data.label)}
      {renderDescription(props.data.description)}
      {renderLinks(props.data.links)}
      {isMouseOver && renderControl()}
      {sourceHandle()}
    </div>
  );
};

export default DefaultNode;
