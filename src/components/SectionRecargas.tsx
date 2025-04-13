import { useState, useEffect } from "react";
import Loading from "./Loading";
import * as React from "react";
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
import {
  handleFiltrarCodigos,
  handleCodigoChange,
  handleUpdateRecarga,
  handleDeleteRecarga,
} from "../functions/recargas";
import { requisicaoPost } from "../services/requisicoes";
import ModalEditarRecargas from "./AdminRecargas/modalEditarRecargas";

interface Codigo {
  id: number;
  idRecarga: number;
  servidor: string;
  codigo: string;
  usado: number;
  dias: number;
}

interface Recarga {
  id: number;
  imagem: string;
  titulo: string;
  dias: number;
}

function SectionRecargas() {
  const [recargas, setRecargas] = useState<Recarga[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [codigos] = useState<Codigo[]>([{
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
  }]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecarga, setSelectedRecarga] = useState<Recarga | null>(null);
  const [selectedCodigos, setSelectedCodigos] = useState<number[]>([]);
  const [codigosFiltrados, setCodigosFiltrados] = useState<Codigo[]>([]);

  useEffect(() => {
    if (selectedRecarga == null) return;
    const filteredCodigos = handleFiltrarCodigos(selectedRecarga.id, codigos);
    setCodigosFiltrados(filteredCodigos);
  }, [codigos, selectedRecarga]);

  const handleEditCoupon = (recarga?: Recarga) => {
    if (!recarga) return;
    setSelectedRecarga(recarga);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedRecarga(null);
    setSelectedCodigos([]);
    setCodigosFiltrados([]);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedRecarga((prevRecarga) => {
          if (!prevRecarga) return prevRecarga;
          return {
            ...prevRecarga,
            imagem: file.name,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchServers = async () => {
      setLoading(true);
      try {
        const response = await requisicaoPost("/Backend/Admin/servidores/buscar-recargas.php");
        if (response?.data?.recargas) {
          setRecargas(response.data.recargas);
        } else {
          throw new Error("Nenhuma recarga encontrada ou resposta inválida.");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const handleConfirmarDelete = (recarga: Recarga) => {
    Swal.fire({
      title: "A recarga e todos os códigos cadastrados serão deletados permanentemente.",
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
  };

  if (loading) return <Loading color="var(--corPrincipal)" />;
  if (error) return <div>Erro: {error}</div>;

  return (
    <>
      <Button onClick={() => handleEditCoupon()} wsize="">
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
                <CelulaTabela tipo="">Códigos</CelulaTabela>
                <CelulaTabela tipo="">Ações</CelulaTabela>
              </LinhaTabela>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recargas.sort((a, b) => a.dias - b.dias).map((recarga) => (
                <LinhaTabela key={recarga.id} tipo="body">
                  <CelulaTabela>
                    <img
                      src={`${import.meta.env.VITE_API}/Backend/Recargas/${recarga.imagem}`}
                      alt=""
                      style={{ width: "50px", borderRadius: "50%", minWidth: "50px" }}
                    />
                  </CelulaTabela>
                  <CelulaTabela>{recarga.titulo.toUpperCase()}</CelulaTabela>
                  <CelulaTabela>{recarga.dias}</CelulaTabela>
                  <CelulaTabela>5</CelulaTabela>
                  <td className="px-6 py-4 space-x-2">
                    <ButtonEdit onClick={() => handleEditCoupon(recarga)} />
                    <ButtonDelete onClick={() => handleConfirmarDelete(recarga)} />
                  </td>
                </LinhaTabela>
              ))}
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
