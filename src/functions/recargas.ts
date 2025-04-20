import axios from "axios";
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



export async function handleAddRecarga(e: React.FormEvent<HTMLFormElement>) {
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
      console.log (response.data)
      Alerta("toast", "success", `${ response?.data?.message || "Recarga adicionada com sucesso"}` );
    } else {
      console.log (response)
      Alerta("toast", "error", `${ response?.data?.message || "Erro ao adicionar recarga"}` );
      
    }
  } catch (error) {
    console.log (error);
    console.error('Erro ao adicionar recarga:', error);
  }

  // console.log(novaRecarga);

  // Alerta("swal", "success", "Recarga adicionada com sucesso");
}

// export async function handleAddRecarga(e: React.FormEvent<HTMLFormElement>) {
//   e.preventDefault();

//   const formData = new FormData(e.currentTarget); // aqui já contém a imagem e os outros campos

//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API}/Backend/Admin/recargas/recargas-adicionar.php`,
//       formData
//       // ❌ Não precisa setar 'Content-Type', o axios detecta e insere o boundary corretamente
//     );

//     if (response?.data?.success) {
//       console.log(response.data);
//     } else {
//       console.log(response.data);
//       console.log('Erro ao adicionar recarga');
//     }
//   } catch (error) {
//     console.error('Erro ao adicionar recarga:', error);
//   }
// }


