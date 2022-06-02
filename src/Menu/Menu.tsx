import React from "react";
import { Edge, Node } from "react-flow-renderer";

const Menu = (props: { nodes: Node<any>[]; edges: Edge<any>[]; onLoadFile: (event) => void }) => {
    const onDragStart = (event, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    const onSave = () => {
        if (props) {
            const json = JSON.stringify({ nodes: props.nodes, edges: props.edges });
            const blob = new Blob([json], { type: "application/json" });
            const fileName = "out.json";
            const href = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = href;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div>
            <div>
                <input type={"file"} onChange={props.onLoadFile}></input>
                <button onClick={onSave}>Сохранить в файл</button>
            </div>
            <div>
                <button className="dndnode" onDragStart={(event) => onDragStart(event, "default")} draggable>
                    Добавить элемент
                </button>
            </div>
        </div>
    );
};

export default Menu;
