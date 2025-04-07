
import TabsAdmin from "../components/TabsAdmin";
import Container from "../components/tailwindComponents/Container";
import { TituloPagina } from "../components/tailwindComponents/Textos";
import { BtnAbrirMenuLateral } from "../components/MenuLateral/botoesMenu";

function ConteudoMeusPedidos() {
  return (
    <Container>
      <BtnAbrirMenuLateral />
      <TituloPagina>Admin</TituloPagina>

      <TabsAdmin />
    </Container>
  );
}

export default ConteudoMeusPedidos;
