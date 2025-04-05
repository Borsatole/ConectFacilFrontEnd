import { useState, useEffect, useContext } from "react";
import Loading from "./Loading";

import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function SectionRecargas() {
  const { logout } = useContext(AuthContext);
  const [recargas, setRecargas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [codigos] = useState([
    {
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
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecarga, setSelectedRecarga] = useState(null);
  const [selectedCodigos, setSelectedCodigos] = useState([]);
  const [codigosFiltrados, setCodigosFiltrados] = useState([]);

  const handleFiltrarCodigos = (recargaId) => {
    if (!recargaId) return [];
    const filtrados = codigos.filter(
      (codigo) => codigo.idRecarga === recargaId
    );
    return filtrados;
  };

  useEffect(() => {
    if (selectedRecarga == null) return;
    const filteredCodigos = handleFiltrarCodigos(selectedRecarga.id);
    setCodigosFiltrados(filteredCodigos);
  }, [selectedRecarga]);

  const handleCodigoChange = (codigo) => {
    setSelectedCodigos((prev) => {
      // Criamos uma nova cópia do array para garantir uma atualização adequada
      if (prev.includes(codigo.id)) {
        const updatedCodigos = prev.filter((id) => id !== codigo.id);
        return updatedCodigos;
      } else {
        const updatedCodigos = [...prev, codigo.id];
        return updatedCodigos;
      }
    });
  };

  const handleEditCoupon = (recarga) => {
    setSelectedRecarga(recarga);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedRecarga(null);
    setSelectedCodigos([]);
    setCodigosFiltrados([]);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedRecarga((prevRecarga) => ({
          ...prevRecarga,
          previewImage: reader.result,
          imagem: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateRecarga = async (e) => {
    e.preventDefault();

    const dados = {
      token: localStorage.getItem("token"),
      idRecarga: selectedRecarga.id,
      titulo: e.target.titulo.value,
      dias: e.target.dias.value,
      imagem: selectedRecarga.previewImage || "",
    };

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API
        }/Backend/Admin/recargas/recargas-editar.php`,
        {
          method: "POST",
          body: JSON.stringify(dados),
        }
      );
      console.log(dados);

      if (!response.ok) {
        throw new Error("Falha na resposta do servidor");
      }

      const data = await response.json();

      if (data.success) {
        // Refresh the list
        const updatedRecargas = recargas.map((recarga) =>
          recarga.id === selectedRecarga.id
            ? {
                ...recarga,
                titulo: e.target.titulo.value,
                dias: e.target.dias.value,
              }
            : recarga
        );
        setRecargas(updatedRecargas);
        toast.success("Recarga atualizada com sucesso!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // handleCloseModal();
      } else {
        throw new Error(data.message || "Erro ao atualizar recarga");
      }
    } catch (error) {
      console.error("Erro ao atualizar recarga:", error);
      toast.error(`Erro ao atualizar recarga: ${error.message}`);
    }
  };

  // Buscar servidores
  useEffect(() => {
    const fetchServers = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API
          }/Backend/Admin/servidores/buscar-recargas.php`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: localStorage.getItem("token"),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Falha ao carregar servidores");
        }

        const data = await response.json();

        if (data.error) {
          if (
            data.error == "Token não fornecido" ||
            data.error == "Token inválido"
          ) {
            toast.error("Sua sessão expirou, faça login novamente.");
            logout();
          }
        }

        if (data.recargas) {
          setRecargas(data.recargas);
        } else {
          throw new Error("Formato de dados de servidores inválido");
        }
      } catch (error) {
        console.error("Erro ao carregar servidores:", error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, [logout]);

  const handleDeleteRecarga = async (recarga) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API
        }/Backend/Admin/recargas/recargas-deletar.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            idRecarga: recarga.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Falha na resposta do servidor");
      }

      const data = await response.json();

      console.log(data);

      if (data.success) {
        // Remove deleted coupon from local data
        const updatedRecargas = recargas.filter((c) => c.id !== recarga.id);
        setRecargas(updatedRecargas);
      } else {
        throw new Error(data.message || "Erro ao deletar cupom");
      }
    } catch (error) {
      console.error("Erro ao deletar recarga:", error);
    }
  };

  if (loading) {
    return <Loading color="var(--corPrincipal)" />;
  }

  if (error) {
    return <div>Erro:{error}</div>;
  }

  function handleConfirmarDelete(recarga) {
    Swal.fire({
      title:
        "A recarga e todos os codigos cadastrados serão deletados permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteRecarga(recarga);
      }
    });
  }

  return (
    <>
      <button
        className="text-white py-2 px-4 rounded mb-4 cursor-pointer transition duration-300"
        style={{
          backgroundColor: "var(--corPrincipal)",
        }}
        onClick={() => handleEditCoupon()}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = "var(--corSecundaria)")
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = "var(--corPrincipal)")
        }
      >
        Adicionar recarga
      </button>

      {recargas.length === 0 ? (
        <div>Nenhuma recarga encontrada</div>
      ) : (
        <div id="Recargas" className="tabcontent block overflow-x-scroll">
          <h2 className="text-x2 font-semibold mb-4">Minhas Recargas</h2>

          <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="px-6 py-3 text-left "></th>
                <th className="px-6 py-3 text-left ">Recarga</th>
                <th className="px-6 py-3 text-left ">Dias</th>
                <th className="px-6 py-3 text-left ">Codigos</th>
                <th className="px-6 py-3 text-left ">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recargas
                .sort((a, b) => parseFloat(a.dias) - parseFloat(b.dias))
                .map((recarga) => {
                  return (
                    <tr
                      key={recarga.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 ">
                        <img
                          src={`${import.meta.env.VITE_API}/Backend/Recargas/${
                            recarga.imagem
                          }`}
                          alt=""
                          style={{
                            width: "50px",
                            borderRadius: "50%",
                            minWidth: "50px",
                          }}
                        />
                      </td>

                      <td className="px-6 py-4 space-x-2">
                        <span>{recarga.titulo.toUpperCase()}</span>
                      </td>

                      <td className="px-6 py-4 space-x-2">
                        <span>{recarga.dias}</span>
                      </td>

                      <td className="px-6 py-4 space-x-2">
                        <span>5</span>
                      </td>

                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleEditCoupon(recarga)}
                          className="text-white py-2 px-4 rounded mb-4 cursor-pointer transition duration-300"
                          style={{
                            backgroundColor: "var(--corPrincipal)",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleConfirmarDelete(recarga)}
                          className="text-white py-2 px-4 rounded mb-4 cursor-pointer transition duration-300"
                          style={{
                            backgroundColor: "var(--corPrincipal)",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {isEditModalOpen && selectedRecarga && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.33)" }}
        >
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-xl font-semibold mb-4">Editar Recarga</h2>

            <form onSubmit={handleUpdateRecarga}>
              <div className="mt-2">
                <label className="text-gray-700 text-sm font-bold mb-2 ">
                  Imagem da Recarga
                </label>

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

                  {/* quero pegar a imagem selecionada e colocar na img */}
                  <input
                    type="file"
                    name="imagem"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Título
                </label>
                <input
                  type="text"
                  name="titulo"
                  placeholder="Digite o título"
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedRecarga.titulo || ""}
                  required
                />
              </div>

              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Dias
                </label>
                <input
                  type="number"
                  name="dias"
                  min="1"
                  defaultValue={selectedRecarga.dias}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Valor
                </label>

                <input
                  type="number"
                  name="valor"
                  min="1"
                  defaultValue={selectedRecarga.valor}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* separador */}
              <div className="mt-2 justify-center">
                <div className="flex justify-between items-center gap-4 pt-4  pb-4 border-b border-gray-300">
                  <label className="block text-gray-700 text-sm font-bold mb-2 ">
                    Codigos ({codigosFiltrados.length})
                  </label>

                  {selectedCodigos.length > 0 ? (
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
                      <span className="ml-2">
                        Excluir ({selectedCodigos.length})
                      </span>
                    </button>
                  ) : (
                    // Botão para adicionar (seu botão atual)
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        console.log("adicionar");
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
                  )}
                </div>
              </div>

              <div className="mt-2">
                {console.log(codigosFiltrados)}

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
                        onChange={() => handleCodigoChange(codigo)}
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
                <button
                  type="submit"
                  className="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  style={{
                    backgroundColor: "var(--corPrincipal)",
                    cursor: "pointer",
                  }}
                >
                  Atualizar Recarga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SectionRecargas;
