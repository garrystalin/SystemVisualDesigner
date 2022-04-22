import React from "react";

const EditIcon = (props: { color; size }) => (
  <span
    style={{
      fontSize: props.size,
      color: props.color,
      width: `${props.size}px`,
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <g>
        <path d="M13 12V12.998H8V12H13ZM3 13V11L9 4.99999L11 6.99999L5 13H3ZM13 5L11.5 6.5L9.5 4.5L11 3L13 5Z" />
      </g>
    </svg>
  </span>
);

export default EditIcon;
