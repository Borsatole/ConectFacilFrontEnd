import { requisicaoGet } from "../services/requisicoes";
import ContainerPrincipal from "../components/tailwindComponents/containerPrincipal";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import CardEstatisticas from "../components/CardEstatisticas";
import CarrinhoCompras from "../components/CarrinhoCompras";
import CatalogoRecargas from "../components/Recargas";
import BotaoAbrirMenu from "../components/botaoAbrirMenu";

function ConteudoDashboard() {
  const [dadosDashboard, setDadosDashboard] = useState({
    TotalPedidos: 0,
    TotalPedidosCancelados: 0,
    TotalPedidosPendentes: 0,
    Recargas: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      const response = await requisicaoGet("/Backend/Usuario/Dashboard.php");

      if (response) {
        setDadosDashboard({
          TotalPedidos: response.data.InformacoesBasicas.TotalPedidos,
          TotalPedidosCancelados:
            response.data.InformacoesBasicas.TotalPedidosCancelados,
          TotalPedidosPendentes:
            response.data.InformacoesBasicas.TotalPedidosPendentes,
          Recargas: response.data.Recargas,
        });
      }

      setLoading(false);
    };

    carregarDados();
  }, []);

  return (
    <ContainerPrincipal>
      <BotaoAbrirMenu />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <CarrinhoCompras items={0} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
        <CardEstatisticas
          icone="fas fa-shopping-cart"
          valor={String(dadosDashboard.TotalPedidos)}
          descricao="TOTAL DE PEDIDOS"
          loading={loading}
        />

        <CardEstatisticas
          icone="fas fa-users"
          valor={String(dadosDashboard.TotalPedidosCancelados)}
          descricao="PEDIDOS CANCELADOS"
          loading={loading}
        />

        <CardEstatisticas
          icone="fas fa-users"
          valor={String(dadosDashboard.TotalPedidosPendentes)}
          descricao="PEDIDOS PENDENTES"
          loading={loading}
        />
      </div>

      <CatalogoRecargas items={dadosDashboard.Recargas} loading={loading} />
    </ContainerPrincipal>
  );
}

ConteudoDashboard.propTypes = {
  setMenuAberto: PropTypes.func,
};

export default ConteudoDashboard;
