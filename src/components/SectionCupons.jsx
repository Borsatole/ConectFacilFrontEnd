import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tabela, LinhaTabela, CelulaTabela } from "./comum/tabelas";

import {
  handleUpdateCoupon,
  handleDeleteCoupon,
  handleAddNewCoupon,
  determinarStatus,
  formatarDesconto,
} from "../functions/cupons";

import { format, parseISO } from "date-fns";
import Swal from "sweetalert2";
import Loading from "./Loading";
import { requisicaoPost } from "../services/Requisicoes";
import { Button, ButtonCloseModal } from "./comum/button";
import { H3 } from "./tailwindComponents/Textos";
import { FormGroup } from "./comum/FormGroup";
import { Input } from "./comum/input";
// import { Form } from "react-router-dom";
import Select from "./comum/select";

function SectionCupons() {
  const [cupons, setCupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [server, setServer] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  function handleConfirmDelete(cupom) {
    Swal.fire({
      title: "Tem certeza de que deseja excluir esse cupom?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteCoupon(cupom);
      }
    });
  }

  useEffect(() => {
    const BaixarRecargas = async () => {
      setLoading(true);

      try {
        const response = await requisicaoPost(
          "/Backend/Admin/servidores/buscar-recargas.php"
        );

        if (response?.data?.recargas) {
          setServer(response.data.recargas);
        } else {
          throw new Error("Nenhuma recarga encontrada ou resposta inválida.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    BaixarRecargas();
  }, []);

  useEffect(() => {
    const carregarTodosCupons = async () => {
      const response = await requisicaoPost(
        "/Backend/Admin/cupons/cupons-listagem.php"
      );

      if (response) {
        setCupons(response.data.todosCupons);
      }
    };

    carregarTodosCupons();
  }, []);

  // Handle edit coupon
  const handleEditCoupon = (cupom) => {
    setSelectedCoupon(cupom);
    setIsEditModalOpen(true);
  };

  // Handle add new coupon
  const handleAddCoupon = () => {
    setIsAddModalOpen(true);
  };

  // Close modals
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedCoupon(null);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <Loading color="#4F46E5" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <div id="Vendas" className="tabcontent block overflow-x-scroll">
        <Button onClick={handleAddCoupon} wsize="">
          Adicionar Cupom
        </Button>
        <H3>Meus Cupons</H3>

        {cupons.length === 0 ? (
          <div>Nenhum cupom encontrado</div>
        ) : (
          <Tabela>
            <thead>
              <LinhaTabela>
                <CelulaTabela tipo="">Cupom</CelulaTabela>
                <CelulaTabela tipo="">Desconto</CelulaTabela>
                <CelulaTabela tipo="">Validade</CelulaTabela>
                <CelulaTabela tipo="">Uso</CelulaTabela>
                <CelulaTabela tipo="">Status</CelulaTabela>
                <CelulaTabela tipo="">Ações</CelulaTabela>
              </LinhaTabela>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cupons.map((cupom) => {
                const status = determinarStatus(cupom);
                return (
                  <LinhaTabela key={cupom.id} tipo="body">
                    <CelulaTabela>{cupom.codigo}</CelulaTabela>
                    <CelulaTabela>{formatarDesconto(cupom)}</CelulaTabela>
                    <CelulaTabela>
                      {format(parseISO(cupom.validade), "dd/MM/yyyy HH:mm")}
                    </CelulaTabela>

                    <CelulaTabela>
                      {cupom.usos}/{cupom.maxuse}
                    </CelulaTabela>

                    <CelulaTabela>
                      <Status status={status} />
                    </CelulaTabela>

                    <CelulaTabela>
                      <div className="flex items-center gap-2">
                        <ButtonEdit onClick={() => handleEditCoupon(cupom)} />
                        <ButtonDelete
                          onClick={() => handleConfirmDelete(cupom)}
                        />
                      </div>
                    </CelulaTabela>
                  </LinhaTabela>
                );
              })}
            </tbody>
          </Tabela>
        )}
      </div>

      {/* Edit Coupon Modal */}
      {isEditModalOpen && selectedCoupon && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.33)" }}
        >
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <ButtonCloseModal onClick={handleCloseModal} />
            <H3>Editar Cupom</H3>

            <form
              onSubmit={(e) =>
                handleUpdateCoupon(
                  e,
                  selectedCoupon,
                  setCupons,
                  handleCloseModal
                )
              }
            >
              <FormGroup label="Código do Cupom" id="codigo">
                <Input
                  id="codigo"
                  defaultValue={selectedCoupon.codigo}
                  required
                ></Input>
              </FormGroup>

              <FormGroup label="Tipo de Desconto" id="tipo">
                <Select selectedCoupon={selectedCoupon.tipo} />
              </FormGroup>

              <FormGroup label="Desconto" id="desconto">
                <Input
                  id="desconto"
                  type="number"
                  defaultValue={selectedCoupon.desconto}
                  min="0"
                  // step="1.00"
                  required
                ></Input>
              </FormGroup>

              <FormGroup label="Data de Validade" id="validade">
                <Input
                  id="validade"
                  type="datetime-local"
                  name="validade"
                  defaultValue={format(
                    parseISO(selectedCoupon.validade),
                    "yyyy-MM-dd'T'HH:mm"
                  )}
                  required
                ></Input>
              </FormGroup>

              <FormGroup label="Número maximo de Usos" id="maxuse">
                <Input
                  id="maxuse"
                  name="maxuse"
                  type="number"
                  defaultValue={selectedCoupon.maxuse}
                  min="0"
                  // step="1.00"
                  required
                ></Input>
              </FormGroup>

              <FormGroup label="Produtos Aplicáveis" id="aplicavel">
                <div className="flex flex-col gap-2 overflow-y-scroll max-h-40 p-2">
                  {server
                    .sort((a, b) => parseFloat(a.dias) - parseFloat(b.dias))
                    .map((server) => (
                      <label
                        key={server.id}
                        className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500"
                      >
                        <input
                          type="checkbox"
                          name="aplicavel"
                          value={server.id}
                          defaultChecked={(() => {
                            try {
                              if (!selectedCoupon.produtos) return false;

                              const aplicaveis = JSON.parse(
                                selectedCoupon.produtos
                              );
                              return (
                                Array.isArray(aplicaveis) &&
                                aplicaveis
                                  .map(String)
                                  .includes(String(server.id))
                              );
                            } catch (error) {
                              console.error(
                                "Erro ao verificar produtos aplicáveis:",
                                error
                              );
                              return false;
                            }
                          })()}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {server.titulo}
                        </span>
                      </label>
                    ))}
                </div>
              </FormGroup>

              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="valido"
                    defaultChecked={selectedCoupon.valido === 1}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">Cupom Ativo</span>
                </label>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <Button type="submit">Atualizar Cupom</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Coupon Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.33)" }}
        >
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <ButtonCloseModal onClick={handleCloseModal} />
            <H3>Adicionar Novo Cupom</H3>

            <form
              onSubmit={(e) =>
                handleAddNewCoupon(e, cupons, setCupons, handleCloseModal)
              }
            >
              <FormGroup label="Código do Cupom" id="codigo">
                <Input
                  id="codigo"
                  name="codigo"
                  placeholder="Digite o código do cupom"
                  autoComplete="off"
                  required
                />
              </FormGroup>

              <FormGroup label="Tipo de Desconto" id="tipo">
                <Select selectedCoupon="percent" />
              </FormGroup>

              <FormGroup label="Desconto" id="desconto">
                <Input
                  id="desconto"
                  name="desconto"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Digite o valor do desconto"
                  required
                />
              </FormGroup>

              <FormGroup label="Data de Validade" id="validade">
                <Input
                  id="validade"
                  name="validade"
                  type="datetime-local"
                  required
                />
              </FormGroup>

              <FormGroup label="Número máximo de Usos" id="maxuse">
                <Input
                  id="maxuse"
                  name="maxuse"
                  type="number"
                  defaultValue="10"
                  min="0"
                  required
                />
              </FormGroup>

              <FormGroup label="Produtos Aplicáveis" id="aplicavel">
                <div className="flex flex-col gap-2 overflow-y-scroll max-h-40 p-2">
                  {server
                    .sort((a, b) => parseFloat(a.dias) - parseFloat(b.dias))
                    .map((server) => (
                      <label
                        key={server.id}
                        className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500"
                      >
                        <input
                          type="checkbox"
                          name="aplicavel"
                          value={server.id}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {server.titulo}
                        </span>
                      </label>
                    ))}
                </div>
              </FormGroup>

              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="valido"
                    defaultChecked={true}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">Cupom Ativo</span>
                </label>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <Button type="submit">Adicionar Cupom</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Status({ status }) {
  const statusStyles = {
    Ativo: "text-green-700 bg-green-100",
    Expirado: "text-red-700 bg-red-100",
    default: "text-yellow-700 bg-yellow-100",
  };

  const styleClass = statusStyles[status] || statusStyles.default;

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${styleClass}`}
    >
      {status}
    </span>
  );
}

Status.propTypes = {
  status: PropTypes.string,
};

function ButtonEdit({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white py-2 px-4 rounded mb-4 cursor-pointer transition duration-300"
      style={{ backgroundColor: "var(--corPrincipal)" }}
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
  );
}

ButtonEdit.propTypes = {
  onClick: PropTypes.func,
};

function ButtonDelete({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white py-2 px-4 rounded mb-4 cursor-pointer transition duration-300"
      style={{ backgroundColor: "var(--corPrincipal)" }}
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
  );
}

ButtonDelete.propTypes = {
  onClick: PropTypes.func,
};

export default SectionCupons;
