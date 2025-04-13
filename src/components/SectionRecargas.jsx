import { useState, useEffect } from "react";
import Loading from "./Loading";
import {
  Tabela,
  LinhaTabela,
  CelulaTabela,
  ButtonEdit,
  ButtonDelete,
} from "./comum/tabelas";

import Swal from "sweetalert2";

import { Button } from "./comum/button";
import { H3 } from "./tailwindComponents/Textos";
// import { FormGroup } from "./comum/FormGroup";
// import { Input } from "./comum/input";
// import { BtnInserir } from "./AdminRecargas/btnInserir";
import {
  handleFiltrarCodigos,
  handleCodigoChange,
  handleUpdateRecarga,
  handleDeleteRecarga,
} from "../functions/recargas";
import { requisicaoPost } from "../services/requisicoes";
import ModalEditarRecargas from "./AdminRecargas/modalEditarRecargas";

function SectionRecargas() {
  const [recargas, setRecargas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [codigos] = useState([
    {
      id: 1,
      idRecarga: 4,
      servidor: "alphaplay",
      codigo: "DARACODE",
      usado: 0,
      dias: 30,
    },
    {
      id: 2,
      idRecarga: 4,
      servidor: "alphaplay",
      codigo: "CODIGO2",
      usado: 0,
      dias: 30,
    },
    {
      id: 3,
      idRecarga: 4,
      servidor: "alphaplay",
      codigo: "CODIGO3",
      usado: 0,
      dias: 30,
    },
    {
      id: 4,
      idRecarga: 3,
      servidor: "alphaplay",
      codigo: "CHICACODE",
      usado: 0,
      dias: 30,
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecarga, setSelectedRecarga] = useState(null);
  const [selectedCodigos, setSelectedCodigos] = useState([]);
  const [codigosFiltrados, setCodigosFiltrados] = useState([]);

  useEffect(() => {
    if (selectedRecarga == null) return;
    const filteredCodigos = handleFiltrarCodigos(selectedRecarga.id, codigos);
    setCodigosFiltrados(filteredCodigos);
  }, [codigos, selectedRecarga]);

  const handleEditCoupon = (recarga) => {
    setSelectedRecarga(recarga);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedRecarga(null);
    setSelectedCodigos([]);
    setCodigosFiltrados([]);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedRecarga((prevRecarga) => ({
          ...prevRecarga,
          previewImage: reader.result,
          imagem: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Buscar servidores
  useEffect(() => {
    const fetchServers = async () => {
      setLoading(true);

      try {
        const response = await requisicaoPost(
          "/Backend/Admin/servidores/buscar-recargas.php"
        );

        if (response?.data?.recargas) {
          setRecargas(response.data.recargas);
        } else {
          throw new Error("Nenhuma recarga encontrada ou resposta inválida.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  if (loading) {
    return <Loading color="var(--corPrincipal)" />;
  }

  if (error) {
    return <div>Erro:{error}</div>;
  }

  function handleConfirmarDelete(recarga) {
    Swal.fire({
      title:
        "A recarga e todos os codigos cadastrados serão deletados permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteRecarga(recarga, setRecargas, recargas);
      }
    });
  }

  return (
    <>
      <Button onClick={handleEditCoupon} wsize="">
        Adicionar Recarga
      </Button>
      {recargas.length === 0 ? (
        <div>Nenhuma recarga encontrada</div>
      ) : (
        <div id="Recargas" className="tabcontent block overflow-x-scroll">
          <H3>Minhas Recargas</H3>

          <Tabela>
            <thead>
              <LinhaTabela tipo="head">
                <CelulaTabela tipo="">Imagem</CelulaTabela>
                <CelulaTabela tipo="">Recarga</CelulaTabela>
                <CelulaTabela tipo="">Dias</CelulaTabela>
                <CelulaTabela tipo="">Codigos</CelulaTabela>
                <CelulaTabela tipo="">Ações</CelulaTabela>
              </LinhaTabela>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recargas
                .sort((a, b) => parseFloat(a.dias) - parseFloat(b.dias))
                .map((recarga) => {
                  return (
                    <LinhaTabela key={recarga.id} tipo="body">
                      <CelulaTabela>
                        <img
                          src={`${import.meta.env.VITE_API}/Backend/Recargas/${
                            recarga.imagem
                          }`}
                          alt=""
                          style={{
                            width: "50px",
                            borderRadius: "50%",
                            minWidth: "50px",
                          }}
                        />
                      </CelulaTabela>

                      <CelulaTabela>
                        {recarga.titulo.toUpperCase()}
                      </CelulaTabela>

                      <CelulaTabela>{recarga.dias}</CelulaTabela>
                      <CelulaTabela>
                        <span>5</span>
                      </CelulaTabela>

                      <td className="px-6 py-4 space-x-2">
                        <ButtonEdit
                          onClick={() => handleEditCoupon(recarga)}
                        ></ButtonEdit>
                        <ButtonDelete
                          onClick={() => handleConfirmarDelete(recarga)}
                        ></ButtonDelete>
                      </td>
                    </LinhaTabela>
                  );
                })}
            </tbody>
          </Tabela>
        </div>
      )}
      {isEditModalOpen && selectedRecarga && (
        <ModalEditarRecargas
          handleCloseModal={handleCloseModal}
          selectedRecarga={selectedRecarga}
          setRecargas={setRecargas}
          setLoading={setLoading}
          recargas={recargas}
          handleImageChange={handleImageChange}
          handleUpdateRecarga={handleUpdateRecarga}
          codigosFiltrados={codigosFiltrados}
          selectedCodigos={selectedCodigos}
          handleCodigoChange={handleCodigoChange}
          setSelectedCodigos={setSelectedCodigos}
        />
      )}
    </>
  );
}

export default SectionRecargas;
