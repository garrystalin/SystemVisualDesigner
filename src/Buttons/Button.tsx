import React from "react";
import "./Button.scss";

const Button = (props: {
  icon: ({ color, size }) => JSX.Element;
  backgroundColor;
  iconColor;
  iconSize;
  title;
  className;
  onClick;
}) => {
  return (
    <div className={props.className}>
      <div className="button">
        {props.icon({ color: props.iconColor, size: props.iconSize })}
      </div>
    </div>
  );
};

export default Button;
