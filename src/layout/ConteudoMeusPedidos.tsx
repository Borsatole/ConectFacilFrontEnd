import CardsPedidos from "../components/CardsPedidos";
import { TituloPagina } from "../components/tailwindComponents/Textos";
import Container from "../components/tailwindComponents/Container";

import { BtnAbrirMenuLateral } from "../components/MenuLateral/botoesMenu";
import * as React from "react";

function ConteudoMeusPedidos() {
  document.title = "Meus Pedidos";
  return (
    <Container>
      <BtnAbrirMenuLateral />
      <TituloPagina>Meus Pedidos</TituloPagina>

      <CardsPedidos />
    </Container>
  );
}

export default ConteudoMeusPedidos;
