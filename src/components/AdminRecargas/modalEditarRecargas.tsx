import React, { useState } from "react";
import { Button, ButtonCloseModal } from "../comum/button";
import { FormGroup } from "../comum/FormGroup";
import { Input } from "../comum/input";
import { H3 } from "../tailwindComponents/Textos";
import { BtnInserir } from "./btnInserir";
import { RecargaProps, CodigoProps } from "../../functions/tipos";

// Tipagem
interface ModalEditarRecargasProps {
  handleCloseModal: () => void;
  recargas: RecargaProps[];
  selectedRecarga: RecargaProps;
  setRecargas: React.Dispatch<React.SetStateAction<RecargaProps[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateRecarga: (
    e: React.FormEvent<HTMLFormElement>,
    selectedRecarga: RecargaProps & { previewImage?: string },
    setRecargas: React.Dispatch<React.SetStateAction<RecargaProps[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    recargas: RecargaProps[],
    handleCloseModal: () => void
  ) => Promise<void>;
  codigosFiltrados: CodigoProps[];
  selectedCodigos: CodigoProps[];
  handleCodigoChange: (
    codigo: CodigoProps,
    setSelectedCodigos: React.Dispatch<React.SetStateAction<CodigoProps[]>>
  ) => void;
  setSelectedCodigos: React.Dispatch<React.SetStateAction<CodigoProps[]>>;
}

// Componente principal
function ModalEditarRecargas({
  handleCloseModal,
  selectedRecarga,
  setRecargas,
  setLoading,
  recargas,
  handleImageChange,
  handleUpdateRecarga,
  codigosFiltrados,
  selectedCodigos,
  handleCodigoChange,
  setSelectedCodigos,
}: ModalEditarRecargasProps) {


  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.33)" }}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <ButtonCloseModal onClick={handleCloseModal} />
        <H3>Editar Recarga</H3>

        {/* Formulário */}
        <form
          onSubmit={(e) =>
            handleUpdateRecarga(
              e,
              selectedRecarga,
              setRecargas,
              setLoading,
              recargas,
              handleCloseModal
            )
          }
        >
          {/* Imagem */}
          <FormGroup label="Imagem da Recarga" id="icone-app">
            <div className="flex items-center gap-4">
              <img
                src={selectedRecarga.previewImage || `${import.meta.env.VITE_API}/Backend/Recargas/${selectedRecarga.imagem}`}
                
                alt="Imagem atual"
                className="w-[100px] h-[100px] object-cover rounded-full"
              />

              <input
                type="file"
                name="imagem"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </FormGroup>

          {/* Título */}
          <FormGroup label="Título da Recarga" id="titulo">
            <Input
              type="text"
              id="titulo"
              name="titulo"
              defaultValue={selectedRecarga.titulo || ""}
            />
          </FormGroup>

          <FormGroup label="Servidor" id="servidor">
            <Input
              type="text"
              id="servidor"
              name="servidor"
              defaultValue={selectedRecarga.servidor || ""}
            />
          </FormGroup>

          {/* Dias */}
          <FormGroup label="Dias" id="dias">
            <Input
              type="number"
              name="dias"
              id="dias"
              min="1"
              defaultValue={selectedRecarga.dias || ""}
            />
          </FormGroup>

          {/* Valor */}
          <FormGroup label="Valor" id="valor">
            <Input
              type="number"
              id="valor"
              name="valor"
              min="1"
              defaultValue={selectedRecarga.valor || ""}
            />
          </FormGroup>

          {/* Códigos */}
          <div className="mt-2">
            <div className="flex justify-between items-center gap-4 pt-4 pb-4 border-b border-gray-300">
              <label className="text-gray-700 text-sm font-bold">
                Códigos ({codigosFiltrados.length})
              </label>
              <BtnInserir selectedCodigos={selectedCodigos} />
            </div>
          </div>

          <div className="mt-2">
            <div className="flex flex-col gap-2 overflow-y-scroll max-h-40 p-2">
              {codigosFiltrados.map((codigo) => (
                <label
                  key={codigo.id}
                  className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500"
                >
                  <input
                    type="checkbox"
                    name="aplicavel"
                    value={codigo.id}
                    checked={selectedCodigos.some((cod) => cod.id === codigo.id)}
                    onChange={() =>
                      handleCodigoChange(codigo, setSelectedCodigos)
                    }
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {codigo.codigo}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Botão de envio */}
          <div className="mt-4">
            <Button type="submit">Atualizar Recarga</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarRecargas;
