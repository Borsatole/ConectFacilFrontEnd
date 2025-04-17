import { requisicaoGet, requisicaoPost } from "../services/requisicoes";
import { useEffect, useState } from "react";
import { converterData } from "../functions/data";
import Loading from "./Loading";
import { ButtonCopy } from "./comum/button";


interface PedidoCardProps {
  id: string;
  server?: string;
  codigo?: string;
  data: string;
  valor?: string;
  situacao: string;
  bgColor?: string;
  dias?: string;
}

interface ParagrafoProps {
  Titulo?: string;
  dado?: string;
}

interface StatusProps {
  status: string;
  situacao: string;
}

interface Pedido {
  idpedido: string;
  titulo: string;
  dias: string;
  codigoderecarga: string;
  created: string;
  valor: string;
  status: string;
}

interface DadosPedidos {
  pedidos: Pedido[];
}

function PedidoCard({ id, server, codigo, data, valor, situacao, bgColor }: PedidoCardProps) {

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${bgColor}`}
      style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <div>
        <h2
          className="text-lg font-semibold"
          style={{ fontWeight: "bolder", fontFamily: "Poppins, sans-serif" }}
        >
          {server} (#{id})
        </h2>
        {codigo !== "" ? (
          <p
            className="bg-green-200 text-green-800 font-semibold rounded inline-block"
            style={{ fontSize: "0.8rem" }}
          >
            Codigo de recarga - {codigo}
          </p>
        ) : null}
        <Paragrafo Titulo={"Data de validade"} dado={data} />
        <Paragrafo Titulo={"Valor"} dado={valor} />
        <Status situacao={situacao} status={"aprovado"} />
      </div>
      {codigo !== "" ? <ButtonCopy codigo={codigo} /> : null}
    </div>
  );
}

function Paragrafo({ Titulo, dado }: ParagrafoProps) {
  return (
    <p className="text-gray-600" style={{ fontWeight: "200" }}>
      {Titulo}: {dado}
    </p>
  );
}

function Status({ status, situacao }: StatusProps) {
  return (
    <span
      className={`text-xs font-semibold uppercase mr-2 px-2.5 py-0.5 rounded ${
        situacao === status
          ? "bg-green-200 text-green-800"
          : "bg-yellow-200 text-yellow-800"
      }`}
    >
      {situacao}
    </span>
  );
}

function CardsPedidos() {
  const [dadosPedidos, setDadosPedidos] = useState<DadosPedidos>({ pedidos: [] });
  const [loading, setLoading] = useState<boolean>(true);

  const pedidos = dadosPedidos.pedidos || [];
  const pedidosmaisrecentes = pedidos.sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  useEffect(() => {
    const carregarDados = async () => {
      const response = await requisicaoGet("/Backend/Usuario/Pedidos.php");

      if (response) {
        setDadosPedidos({ pedidos: response.data.Pedidos });
      }

      setLoading(false);
    };

    carregarDados();
  }, []);

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 space-y-4">
          {loading ? (
            <div className="flex justify-center">
              <Loading color="var(--corPrincipal)" />
            </div>
          ) : pedidosmaisrecentes.length > 0 ? (
            pedidosmaisrecentes.map((pedido, index) => (
              <PedidoCard
                key={pedido.idpedido}
                id={pedido.idpedido}
                server={pedido.titulo}
                dias={pedido.dias}
                codigo={pedido.codigoderecarga}
                data={converterData(pedido.created)}
                valor={pedido.valor}
                situacao={pedido.status}
                bgColor={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              />
            ))
          ) : (
            <p className="text-gray-600">Nenhum pedido encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardsPedidos; 