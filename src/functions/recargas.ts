import Alerta from "../components/comum/alertas";
import { requisicaoDelete, requisicaoPost } from "../services/requisicoes";
import { RecargaProps, CodigoProps } from "./tipos";





export function handleFiltrarCodigos(recarga: RecargaProps, codigos: CodigoProps[]) {
  if (!recarga) return [];
  return codigos.filter((codigo) => codigo.idRecarga === Number(recarga.id));
}

export function handleCodigoChange(
  codigo: CodigoProps, 
  setSelectedCodigos: React.Dispatch<React.SetStateAction<CodigoProps[]>>
) {
  setSelectedCodigos(prevCodigos => {
    const exists = prevCodigos.some(cod => cod.id === codigo.id);
    if (exists) {
      return prevCodigos.filter(cod => cod.id !== codigo.id);
    } else {
      return [...prevCodigos, codigo];
    }
  });
}

export async function handleUpdateRecarga(
  e: React.FormEvent<HTMLFormElement>,
  selectedRecarga: RecargaProps & { previewImage?: string },
  setRecargas: React.Dispatch<React.SetStateAction<RecargaProps[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  recargas: RecargaProps[] | Record<string, RecargaProps>,
  handleCloseModal: () => void
) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;


  const dados = {
    idRecarga: selectedRecarga.id,
    titulo: form.titulo.value,
    dias: form.dias.value,
    imagem: selectedRecarga.previewImage || "",
  };
  


  try {
    const response = await requisicaoPost(
      "/Backend/Admin/recargas/recargas-editar.php",
      dados
    );

    if (response?.data?.success) {
      const arrRecargas = Array.isArray(recargas)
        ? recargas
        : Object.values(recargas || {});

      const updatedRecargas = arrRecargas.map((recarga) =>
        recarga.id === selectedRecarga.id
          ? {
              ...recarga,
              titulo: form.titulo.value,
              dias: form.dias.value,
              valor: form.valor.value
            }
          : recarga
      );

      setRecargas(updatedRecargas);
      handleCloseModal();

      Alerta(
        "toast",
        "success",
        `${response?.data?.message || "Atualizado com sucesso"}`
      );
    }
  } catch (error) {
    console.error("Erro ao atualizar recarga:", error);
    Alerta("toast", "error", "Erro ao atualizar recarga");
  }
}

export async function handleDeleteRecarga(
  recarga: RecargaProps,
  setRecargas: React.Dispatch<React.SetStateAction<RecargaProps[]>>, 
  recargas: RecargaProps[]
) {
  try {
    const response = await requisicaoDelete(
      "/Backend/Admin/recargas/recargas-deletar.php",
      {
        idRecarga: recarga.id,
      }
    );

    if (response?.data?.success) {
      const updatedRecargas = recargas.filter((c: RecargaProps) => c.id !== recarga.id);
      setRecargas(updatedRecargas);
      Alerta("toast", "success", "Recarga deletada com sucesso");
    } else {
      Alerta("toast", "error", "Erro ao deletar recarga");
    }
  } catch (error) {
    console.error("Erro ao deletar recarga:", error); 
    Alerta("toast", "error", "Erro ao deletar recarga");
  }
}
