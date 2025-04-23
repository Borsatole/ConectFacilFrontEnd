import { requisicaoGet, requisicaoPost } from "../services/requisicoes";
import Container from "../components/tailwindComponents/Container";
import { CardEstatisticas, CardRecargas } from "../components/Dashboard/Cards";
import * as React from "react";

import Loading from "../components/Loading";
import { useState, useEffect } from "react";

import { TituloPagina, H2 } from "../components/tailwindComponents/Textos";
import { BtnAbrirMenuLateral } from "../components/MenuLateral/botoesMenu";


interface ConteudoDashboardProps {
  setMenuAberto ?: () => void
}
function ConteudoDashboard( { setMenuAberto }: ConteudoDashboardProps ) {
  const [dadosDashboard, setDadosDashboard] = useState({
    TotalPedidos: 0,
    TotalPedidosCancelados: 0,
    TotalPedidosPendentes: 0,
    Recargas: [],
  });
  const [loading, setLoading] = useState(true);

  const estatisticas = [
    {
      icone: "fas fa-shopping-cart",
      valor: dadosDashboard.TotalPedidos,
      descricao: "TOTAL DE PEDIDOS",
    },
    {
      icone: "fas fa-users",
      valor: dadosDashboard.TotalPedidosCancelados,
      descricao: "PEDIDOS CANCELADOS",
    },
    {
      icone: "fas fa-users",
      valor: dadosDashboard.TotalPedidosPendentes,
      descricao: "PEDIDOS PENDENTES",
    },
  ];

  useEffect(() => {
    const carregarDados = async () => {
      const response = await requisicaoGet("/Backend/Usuario/Dashboard.php");
      console.log(response);

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
    <Container>
      <BtnAbrirMenuLateral />

      <TituloPagina>Dashboard</TituloPagina>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
        {estatisticas.map((item, index) => (
          <CardEstatisticas
            key={index}
            icone={item.icone}
            valor={Number(item.valor)}
            descricao={item.descricao}
            loading={loading}
          />
        ))}
      </div>

      <CatalogoRecargas items={dadosDashboard.Recargas} loading={loading} />
    </Container>
  );
}



export default ConteudoDashboard;

function CatalogoRecargas(props : CatalogoRecargasProps) {
  const { items, loading } = props;

  const RotaApi = import.meta.env.VITE_API;

  return (
    <div className="mt-16">
      <H2>Recargas</H2>

      {loading ? (
        <div className="flex justify-center h-140 ">
          <Loading color="var(--corPrincipal)" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3  justify-items-center">
          {items
            .sort((a, b) => parseFloat(a.dias) - parseFloat(b.dias))
            .map((item) => (
              <CardRecargas
                key={item.id}
                id={item.id}
                imgRecarga={`${RotaApi}/Backend/Recargas/${item.imagem}`}
                descricaoRecarga={item.titulo}
                valorRecarga={Number(item.valor)}
              />
            ))}
        </div>
      )}
    </div>
  );
}

interface CatalogoRecargasProps {
  items: any[];
  loading: boolean;
}
