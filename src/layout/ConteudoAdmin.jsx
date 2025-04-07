import BotaoAbrirMenu from "../components/botaoAbrirMenu";
import TabsAdmin from "../components/TabsAdmin";
import ContainerPrincipal from "../components/tailwindComponents/containerPrincipal";

function ConteudoMeusPedidos() {
  return (
    <ContainerPrincipal p="10">
      <BotaoAbrirMenu />
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold">Admin</h1>
      </div>

      <TabsAdmin />
    </ContainerPrincipal>
  );
}

export default ConteudoMeusPedidos;
