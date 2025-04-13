import * as React from "react";
import { Button, ButtonCloseModal } from "../comum/button";
import { FormGroup } from "../comum/FormGroup";
import { Input } from "../comum/input";
import { H3 } from "../tailwindComponents/Textos";
import { BtnInserir } from "./btnInserir";

type Recarga = {
  id: number,
  icone: string,
  nome: string,
  codigos: string[],
  handleCloseModal: () => void,
  selectedRecarga: any,
  setRecargas: any,
  setLoading: any,
  recargas: any,
  handleImageChange: any,
  handleUpdateRecarga: any,
  codigosFiltrados: any,
  selectedCodigos: any,
  handleCodigoChange: any,
  setSelectedCodigos: any
};

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
}: Recarga) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.33)" }}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <ButtonCloseModal onClick={handleCloseModal} />
        <H3>Editar Recarga</H3>

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
          <FormGroup label="Imagem da Recarga" id="icone-app">
            <div className="flex items-center gap-4">
              <img
                src={
                  selectedRecarga.previewImage ||
                  `${import.meta.env.VITE_API}/Backend/Recargas/${
                    selectedRecarga.imagem
                  }`
                }
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
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

          <FormGroup label="Titulo da Recarga" id="titulo">
            <Input
              type="text"
              id="titulo"
              name="titulo"
              defaultValue={selectedRecarga.titulo || ""}
            />
          </FormGroup>

          <FormGroup label="dias" id="dias">
            <Input
              type="number"
              name="dias"
              id="dias"
              min="1"
              defaultValue={selectedRecarga.dias || ""}
            />
          </FormGroup>

          <FormGroup label="Valor" id="valor">
            <Input
              type="number"
              id="valor"
              name="valor" 
              min="1"
              defaultValue={selectedRecarga.valor || ""}
            />
          </FormGroup>

          {/* separador */}
          <div className="mt-2 justify-center">
            <div className="flex justify-between items-center gap-4 pt-4  pb-4 border-b border-gray-300">
              <label className="block text-gray-700 text-sm font-bold mb-2 ">
                Codigos ({codigosFiltrados.length})
              </label>

              <BtnInserir selectedCodigos={selectedCodigos}></BtnInserir>
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
                    checked={selectedCodigos.includes(codigo.id)}
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

          <div className="mt-4">
            <Button type="submit">Atualizar Recarga</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarRecargas;
