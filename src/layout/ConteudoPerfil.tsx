import FormularioPerfil from "../components/FormularioPerfil";
import ContainerPrincipal from "../components/tailwindComponents/Container";
import { TituloPagina } from "../components/tailwindComponents/Textos";
import { BtnAbrirMenuLateral } from "../components/MenuLateral/botoesMenu";
import * as React from "react";

function ConteudoMeusPedidos() {
  return (
    <ContainerPrincipal tipo="principal">
      <BtnAbrirMenuLateral />
      <TituloPagina>Perfil</TituloPagina>

      <FormularioPerfil />
    </ContainerPrincipal>
  );
}

export default ConteudoMeusPedidos;
