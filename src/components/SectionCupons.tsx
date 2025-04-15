import { useState, useEffect } from "react";
import * as React from "react";
import {
  Tabela,
  LinhaTabela,
  CelulaTabela,
  ButtonEdit,
  ButtonDelete,
} from "./comum/tabelas";
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
import { requisicaoGet } from "../services/requisicoes";
import { Button, ButtonCloseModal } from "./comum/button";
import { H3 } from "./tailwindComponents/Textos";
import { FormGroup } from "./comum/FormGroup";
import { Input } from "./comum/input";
import Select from "./comum/select";
import { ModalEditarCupons } from "./AdminCupons/modalEditarCupons";
// Import shared types
import { CupomProps } from "../functions/tipos";

function SectionCupons() {
  const [cupons, setCupons] = useState<CupomProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CupomProps | null>(null);
  const [server, setServer] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  
  const handleConfirmDelete = ({
    cupom,
    setCupons,
    cupons,
  }: {
    cupom: CupomProps;
    setCupons: React.Dispatch<React.SetStateAction<CupomProps[]>>;
    cupons: CupomProps[];
  }) => {
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
        handleDeleteCoupon({cupom, setCupons, cupons});
      }
    });
  };

  useEffect(() => {
    const BaixarRecargas = async () => {
      setLoading(true);
      try {
        const response = await requisicaoGet("/Backend/Admin/servidores/buscar-recargas.php");
        if (response?.data?.recargas) {
          setServer(response.data.recargas);
        } else {
          throw new Error("Nenhuma recarga encontrada ou resposta inválida.");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    BaixarRecargas();
  }, []);

  useEffect(() => {
    const carregarTodosCupons = async () => {
      const response = await requisicaoGet("/Backend/Admin/cupons/cupons-listagem.php");
      if (response?.data?.todosCupons) {
        setCupons(response.data.todosCupons);
      }
    };
    carregarTodosCupons();
  }, []);

  const handleEditCoupon = (cupom: CupomProps) => {
    setSelectedCoupon(cupom);
    setIsEditModalOpen(true);
  };

  const handleAddCoupon = () => setIsAddModalOpen(true);
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedCoupon(null);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <Loading color="#4F46E5" />
      </div>
    );
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <div id="Vendas" className="tabcontent block overflow-x-scroll">
        <Button onClick={handleAddCoupon}>Adicionar Cupom</Button>
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
                if (!cupom || !cupom.codigo) {
                  console.warn("Cupom inválido na posição", cupom);
                  return null;
                }
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
                        <ButtonDelete onClick={() => handleConfirmDelete({cupom, setCupons, cupons})} />
                      </div>
                    </CelulaTabela>
                  </LinhaTabela>
                );
              })}
            </tbody>
          </Tabela>
        )}
      </div>

      {isEditModalOpen && selectedCoupon && (
        <ModalEditarCupons
          handleCloseModal={handleCloseModal}
          selectedCoupon={selectedCoupon}
          cupons={cupons}
          setCupons={setCupons}
          handleUpdateCoupon={handleUpdateCoupon}
          servers={server}
        />
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <ButtonCloseModal onClick={handleCloseModal} />
            <H3>Adicionar Novo Cupom</H3>
            <form
              onSubmit={(e) =>
                handleAddNewCoupon(e, cupons, setCupons, handleCloseModal)
              }
            >
              <FormGroup label="Código do Cupom" id="codigo">
                <Input id="codigo" name="codigo" placeholder="Digite o código do cupom" autoComplete="off" required />
              </FormGroup>

              <FormGroup label="Tipo de Desconto" id="tipo">
                <Select selectedCoupon="percent" />
              </FormGroup>

              <FormGroup label="Desconto" id="desconto">
                <Input id="desconto" name="desconto" type="number" min="0" step="0.01" placeholder="Digite o valor do desconto" required />
              </FormGroup>

              <FormGroup label="Data de Validade" id="validade">
                <Input id="validade" name="validade" type="datetime-local" required />
              </FormGroup>

              <FormGroup label="Número máximo de Usos" id="maxuse">
                <Input id="maxuse" name="maxuse" type="number" defaultValue="10" min="0" required />
              </FormGroup>

              <FormGroup label="Produtos Aplicáveis" id="aplicavel">
                <div className="flex flex-col gap-2 overflow-y-scroll max-h-40 p-2">
                  {server
                    .sort((a, b) => parseFloat(a.dias) - parseFloat(b.dias))
                    .map((serverItem) => (
                      <label key={serverItem.id} className="flex items-center gap-3 p-3 border rounded-lg shadow-sm cursor-pointer transition-all hover:bg-gray-100">
                        <input type="checkbox" name="aplicavel" value={serverItem.id} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                        <span className="text-sm font-medium text-gray-700">{serverItem.titulo}</span>
                      </label>
                    ))}
                </div>
              </FormGroup>

              <div className="mt-2">
                <label className="flex items-center">
                  <input type="checkbox" name="valido" defaultChecked className="mr-2" />
                  <span className="text-sm">Cupom Ativo</span>
                </label>
              </div>

              <div className="mt-2 flex justify-between">
                <Button type="submit">Adicionar Cupom</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Status({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    Ativo: "text-green-700 bg-green-100",
    Expirado: "text-red-700 bg-red-100",
    default: "text-yellow-700 bg-yellow-100",
  };

  const styleClass = statusStyles[status] || statusStyles.default;

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styleClass}`}>
      {status}
    </span>
  );
}

export default SectionCupons;