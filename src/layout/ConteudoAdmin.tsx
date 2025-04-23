import TabsAdmin from "../components/TabsAdmin";
import Container from "../components/tailwindComponents/Container";
import { Paragrafo, TituloPagina } from "../components/tailwindComponents/Textos";
import { BtnAbrirMenuLateral } from "../components/MenuLateral/botoesMenu";
import { requisicaoGet } from "../services/requisicoes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/comum/alertas";
import Loading from "../components/Loading";

interface ConteudoMeusPedidosProps {
  
}


function ConteudoMeusPedidos() {
  const Navigate = useNavigate();
  const [autorization, setAutorization] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      const response = await requisicaoGet("/Backend/Admin/admin-validacao.php");
      
      if (response?.data.success === true) {
        setAutorization(true);

      } else {
        Alerta("toast", "error", response?.data.message || "Um erro ocorreu.");
        Navigate("/dashboard");
      }
    };
  
    carregarDados();
  }, []);
  
  return (
    <>
    {!autorization ? (
      <Container>
        <Paragrafo>Você precisa ser um admin para acessar essa pagina.</Paragrafo>
      </Container>
    ):
    <Container>
      <BtnAbrirMenuLateral />
      <TituloPagina>Admin</TituloPagina>

      <TabsAdmin />
    </Container>
    }
    </>

  );
}

export default ConteudoMeusPedidos;
