import * as React from "react";
import { Canvas } from "reaflow";

export function Main() {
  return (
    <div className="main">
      <Canvas
        height={800}
        width={600}
        nodes={[
          { id: "1", text: "1" },
          { id: "2", text: "2" },
        ]}
        edges={[{ id: "1-2", from: "1", to: "2" }]}
      />
    </div>
  );
}
