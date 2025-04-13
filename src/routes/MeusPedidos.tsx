import ConteudoMeusPedidos from "../layout/ConteudoMeusPedidos";
import MenuLateral from "../layout/MenuLateral";
import * as React from "react";

export default function MeusPedidos() {
  return (
    <div className="flex">
      <MenuLateral />

      <div style={{ width: "100%" }} className="bg-gray-100">
        <ConteudoMeusPedidos />
      </div>
    </div>
  );
}
