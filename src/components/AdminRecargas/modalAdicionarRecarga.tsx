import { Button, ButtonCloseModal } from "../comum/button";
import { FormGroup } from "../comum/FormGroup";
import { Input } from "../comum/input";
import { H3 } from "../tailwindComponents/Textos";
import {handleAddRecarga} from "../../functions/recargas"
import { RecargaProps } from "../../functions/tipos";
import { useState } from "react";



export interface ModalAdicionarRecargasProps {
    handleCloseModal: () => void;
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    recargas?: RecargaProps[];
    selectedRecarga?: RecargaProps | null;
    setRecargas?: React.Dispatch<React.SetStateAction<RecargaProps[]>>;
    handleImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    
}
  


function ModalAdicionarRecarga({
    handleCloseModal,
    setLoading,
    recargas,
  }: ModalAdicionarRecargasProps) {
    const [preview, setPreview] = useState<string | null>(null);
    

    function handleImagemChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
    }

    const servidoresUnicos = Array.from(new Set(recargas?.map((r) => r.servidor)));

  return (
    <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.33)" }}
        >
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <ButtonCloseModal onClick={handleCloseModal} />
            <H3>Editar Recarga</H3>
    
            {/* Formulário */}
            <form
              onSubmit={(e) =>
                handleAddRecarga(e)
              }
            >
              {/* Imagem */}
              <FormGroup label="Imagem da Recarga" id="icone-app">
                <div className="flex items-center gap-4">
                  <img
                    src={ preview ||`${import.meta.env.VITE_API}/Backend/Recargas/default.png`}
                    alt="Imagem atual"
                    className="w-[100px] h-[100px] object-cover rounded-full"

                  />
    
                  <input
                    type="file"
                    name="imagem"
                    onChange={handleImagemChange}
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </FormGroup>
    
              {/* Título */}
              <FormGroup label="Título da Recarga" id="titulo">
                <Input
                  type="text"
                  id="titulo"
                  name="titulo"
                  defaultValue={"UNITV 30 DIAS"}
                  required
                />
              </FormGroup>

              <FormGroup label="Servidor" id="servidor">
                <Input
                  type="text"
                  id="servidor"
                  name="servidor"
                  list="servidores"
                  required
                />

<datalist id="servidores">
    {servidoresUnicos.map((servidor, index) => (
      <option key={index} value={servidor} />
    ))}
  </datalist>
              </FormGroup>
    
              {/* Dias */}
              <FormGroup label="Dias" id="dias">
                <Input
                  type="number"
                  name="dias"
                  id="dias"
                  min="1"
                  defaultValue={"30"}
                  required
                />
              </FormGroup>
    
              {/* Valor */}
              <FormGroup label="Valor" id="valor">
                <Input
                  type="number"
                  id="valor"
                  name="valor"
                  min="1"
                  step="0.01"
                  
                  required
                />
              </FormGroup>
              
    
              {/* Botão de envio */}
              <div className="mt-4">
                <Button type="submit">Adicionar Recarga</Button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default ModalAdicionarRecarga