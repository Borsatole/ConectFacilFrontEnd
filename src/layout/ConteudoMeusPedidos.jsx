import CardsPedidos from "../components/CardsPedidos";
import BotaoAbrirMenu from "../components/botaoAbrirMenu";
import { TituloPagina } from "../components/tailwindComponents/Textos";
import Container from "../components/tailwindComponents/Container";

function ConteudoMeusPedidos() {
  return (
    <Container>
      <BotaoAbrirMenu />
      <TituloPagina>Meus Pedidos</TituloPagina>

      <CardsPedidos />
    </Container>
  );
}

export default ConteudoMeusPedidos;
