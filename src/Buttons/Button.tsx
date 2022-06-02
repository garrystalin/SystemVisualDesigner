import React from "react";
import "./Button.scss";

interface IButtonProps {
    icon: ({ color, size }) => JSX.Element;
    backgroundColor;
    iconColor;
    iconSize;
    title;
    className;
    onClick: () => void;
}

const Button = (props: IButtonProps) => {
    return (
        <div className={props.className}>
            <div className="button" onClick={props.onClick}>
                {props.icon({ color: props.iconColor, size: props.iconSize })}
            </div>
        </div>
    );
};

export default Button;
