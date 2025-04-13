import ConteudoDashboard from "../layout/ConteudoDashboard";
import MenuLateral from "../layout/MenuLateral";
import * as React from "react";

export default function Dashboard() {
  return (
    <div className="flex">
      <MenuLateral />

      <div style={{ width: "100%" }}>
        <ConteudoDashboard />
      </div>
    </div>
  );
}
