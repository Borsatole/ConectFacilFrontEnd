import Alerta from "../components/comum/alertas";
import { requisicaoPost } from "../services/Requisicoes";

export function handleFiltrarCodigos(recargaId, codigos) {
  if (!recargaId) return [];
  return codigos.filter((codigo) => codigo.idRecarga === recargaId);
}

export function handleCodigoChange(codigo, setSelectedCodigos) {
  setSelectedCodigos((prev) =>
    prev.includes(codigo.id)
      ? prev.filter((id) => id !== codigo.id)
      : [...prev, codigo.id]
  );
}

export async function handleUpdateRecarga(
  e,
  selectedRecarga,
  setRecargas,
  recargas,
  handleCloseModal
) {
  e.preventDefault();
  //   setLoading(true);

  const dados = {
    idRecarga: selectedRecarga.id,
    titulo: e.target.titulo.value,
    dias: e.target.dias.value,
    imagem: selectedRecarga.previewImage || "",
  };

  try {
    const response = await requisicaoPost(
      "/Backend/Admin/recargas/recargas-editar.php",
      dados
    );

    if (response?.data?.success) {
      const updatedRecargas = recargas.map((recarga) =>
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
