import BotaoAbrirMenu from "../components/botaoAbrirMenu";
import FormularioPerfil from "../components/FormularioPerfil";
import ContainerPrincipal from "../components/tailwindComponents/Container";
import { TituloPagina } from "../components/tailwindComponents/Textos";

function ConteudoMeusPedidos() {
  return (
    <ContainerPrincipal tipo="principal">
      <BotaoAbrirMenu />
      <TituloPagina>Perfil</TituloPagina>

      <FormularioPerfil />
    </ContainerPrincipal>
  );
}

export default ConteudoMeusPedidos;
