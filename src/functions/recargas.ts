import Alerta from "../components/comum/alertas";
import { requisicaoDelete, requisicaoPost } from "../services/requisicoes";
import { RecargaProps, CodigoProps } from "./tipos";


export function handleFiltrarCodigos(recarga: RecargaProps, codigos: CodigoProps[]) {
  if (!recarga) return [];
  return codigos.filter((codigo) => codigo.idRecarga === Number(recarga.id));
}


export function handleCodigoChange(
  codigo: CodigoProps,
  setSelectedCodigos: React.Dispatch<React.SetStateAction<number[]>>
) {
  setSelectedCodigos((prev: number[]) =>
    prev.includes(codigo.id)
      ? prev.filter((id) => id !== codigo.id)
      : [...prev, codigo.id]
  );
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

  const dados = {
    idRecarga: selectedRecarga.id,
    titulo: e.target.titulo.value,
    dias: e.target.dias.value,
    imagem: selectedRecarga.previewImage || "",
  } ;


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
              titulo: e.target.titulo.value,
              dias: e.target.dias.value,
              valor: e.target.valor.value,
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

export async function handleDeleteRecarga(recarga, setRecargas, recargas) {
  try {
    const response = await requisicaoDelete(
      "/Backend/Admin/recargas/recargas-deletar.php",
      {
        idRecarga: recarga.id,
      }
    );

    if (response?.data?.success) {
      const updatedRecargas = recargas.filter((c) => c.id !== recarga.id);
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
