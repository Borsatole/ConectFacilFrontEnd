import Alerta from "../components/comum/alertas";
import { requisicaoDelete, requisicaoGet, requisicaoPost } from "../services/requisicoes";
import { RecargaProps, CodigoProps } from "./tipos";



export async function carregarCodigosDeRecargas(setCodigosdeRecargas: React.Dispatch<React.SetStateAction<CodigoProps[]>>) {
  const response = await requisicaoGet("/Backend/Admin/recargas/codigos-recargas-listagem.php");
  if (response?.data?.codigos) {
    // console.log(response.data.codigos);
    setCodigosdeRecargas(response.data.codigos);
    return response.data.codigos;
  }
}

export function handleFiltrarCodigos(recarga: RecargaProps, codigos: CodigoProps[]) {
  if (!recarga) return [];
  return codigos.filter((codigo) => codigo.idRecarga === Number(recarga.id));
}

export async function handleAddRecarga(
  e: React.FormEvent<HTMLFormElement>,
  setRecargas: React.Dispatch<React.SetStateAction<RecargaProps[]>>,
  handleCloseModal: () => void
) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const imagem = formData.get('imagem') as string;
  const titulo = formData.get('titulo') as string;
  const dias = formData.get('dias') as string;
  const valor = Number(formData.get('valor')) as number;

  const novaRecarga: RecargaProps = {
    titulo,
    imagem,
    dias,
    valor,
  };

  try {
    const response = await requisicaoPost('/Backend/Admin/recargas/recargas-adicionar.php', formData);
    if (response?.data?.success) {
      const recargasResponse = await requisicaoGet("/Backend/Admin/servidores/buscar-recargas.php");
      if (recargasResponse?.data?.recargas) {
        setRecargas(recargasResponse.data.recargas);
      }
      
      handleCloseModal();
      Alerta("toast", "success", `${response?.data?.message || "Recarga adicionada com sucesso"}`);
    } else {
      console.log(response);
      Alerta("toast", "error", `${response?.data?.message || "Erro ao adicionar recarga"}`);
    }
  } catch (error) {
    console.log(error);
    console.error('Erro ao adicionar recarga:', error);
  }
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
  
  const formData = new FormData();
  formData.append('idRecarga', String(selectedRecarga.id));
  formData.append('titulo', form.titulo.value);
  formData.append('servidor', form.servidor.value);
  formData.append('dias', form.dias.value);
  formData.append('valor', form.valor.value);

  // Handle image upload
  if (form.imagem.files?.[0]) {
    formData.append('imagem', form.imagem.files[0]);
  } else if (selectedRecarga.imagem) {
    formData.append('imagem', selectedRecarga.imagem);
  }


  try {
    const response = await requisicaoPost(
      "/Backend/Admin/recargas/recargas-editar.php",
      formData
    );

    console.log(response);

    if (response?.data?.success) {
      const arrRecargas = Array.isArray(recargas)
        ? recargas
        : Object.values(recargas || {});

      const updatedRecargas = arrRecargas.map((recarga) =>
        recarga.id === selectedRecarga.id
          ? {
              ...recarga,
              ...response.data.RecargaEditada || {},
            }
          : recarga
      );

      setRecargas(updatedRecargas);
      handleCloseModal();

      Alerta(
        "swal",
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

export async function handleAddCodigodeRecarga(novoCodigo: CodigoProps, setCodigosdeRecargas: React.Dispatch<React.SetStateAction<CodigoProps[]>>) {
  try {
    // console.log(novoCodigo);
    const response = await requisicaoPost(
      "/Backend/Admin/recargas/codigos-adicionar.php",
      novoCodigo
    );
    if (response?.data?.success) {
      Alerta("toast", "success", `${response?.data?.message || "Codigo adicionado com sucesso"}`);
      carregarCodigosDeRecargas(setCodigosdeRecargas);
    } else {
      console.log(response);
      Alerta("toast", "error", `${response?.data?.message || "Erro ao adicionar codigo"}`);
    }
  } catch (error) {
    // console.error("Erro ao adicionar codigo:", error);
  }
}

export async function halndleDeleteCodigodeRecarga(selectedCodigos: CodigoProps[], setCodigosdeRecargas: React.Dispatch<React.SetStateAction<CodigoProps[]>>, setSelectedCodigos: React.Dispatch<React.SetStateAction<CodigoProps[]>>) {
  
  try {
    const response = await requisicaoDelete(
      "/Backend/Admin/recargas/codigos-deletar.php",
      selectedCodigos
    );

    if (response?.data?.success) {
      Alerta("toast", "success", `${response?.data?.message || "Codigo deletado com sucesso"}`);
      carregarCodigosDeRecargas(setCodigosdeRecargas);
      setSelectedCodigos([]);
    } else {
      setSelectedCodigos([]);
      Alerta("toast", "error", `${response?.data?.message || "Erro ao deletar codigo"}`);
    }
  } catch (error) {
    
  }
  }

 






