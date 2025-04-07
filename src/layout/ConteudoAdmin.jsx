import BotaoAbrirMenu from "../components/botaoAbrirMenu";
import TabsAdmin from "../components/TabsAdmin";
import Container from "../components/tailwindComponents/Container";
import { TituloPagina } from "../components/tailwindComponents/Textos";

function ConteudoMeusPedidos() {
  return (
    <Container>
      <BotaoAbrirMenu />
      <TituloPagina>Admin</TituloPagina>

      <TabsAdmin />
    </Container>
  );
}

export default ConteudoMeusPedidos;
