import Swal from "sweetalert2";
import {CodigoProps , RecargaProps} from "../../functions/tipos"
import Alerta from "../../components/comum/alertas";
import {carregarCodigosDeRecargas, handleAddCodigodeRecarga} from "../../functions/recargas"
import { requisicaoPost } from "services/requisicoes";

type Props = {
  selectedCodigos: CodigoProps[];
  selectedRecarga: RecargaProps & { previewImage?: string }
  setCodigosdeRecargas: React.Dispatch<React.SetStateAction<CodigoProps[]>>
}

export function BtnInserir({ selectedCodigos, selectedRecarga, setCodigosdeRecargas }:Props) {


function ModalAdicionarCodigo() {
    Swal.fire({
        title: "Adicione novo Codigo",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Adicionar",
        showLoaderOnConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {

        if (result.value == undefined || result.value == "") {
            Alerta("toast", "error", "Você não digitou nenhum codigo!");
            return
        }

        const novoCodigo: CodigoProps = {
          idRecarga: Number(selectedRecarga.id),
          servidor: String(selectedRecarga.servidor),
          codigo: String(result.value),
          usado: Number(0),
          dias: Number(30)
        }
        console.log(novoCodigo);

        handleAddCodigodeRecarga(novoCodigo);

        carregarCodigosDeRecargas

        Alerta("toast", "success", `${result.value} adicionado com sucesso!` || "Erro ao adicionar!");
        }
      })
}



  return selectedCodigos.length > 0 ? (
    // Botão para deletar
    <button
      onClick={(event) => {
        event.preventDefault();
        console.log("Codigos Para Deletar:", selectedCodigos);
        // Aqui você pode implementar a função para deletar
      }}
      className="text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
      style={{
        backgroundColor: "var(--corPrincipal)",
        cursor: "pointer",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
      <span className="ml-2">Excluir ({selectedCodigos.length})</span>
    </button>
  ) : (
    // Botão para adicionar
    <button
      onClick={(event) => {
        event.preventDefault();

        ModalAdicionarCodigo();
      
      }}
      className="text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
      style={{
        backgroundColor: "var(--corPrincipal)",
        cursor: "pointer",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <span className="ml-2">Inserir codigo</span>
    </button>
  );
}
