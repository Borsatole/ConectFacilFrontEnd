import Alerta from "../components/comum/alertas";
import {
  requisicaoGet,
  requisicaoPost,
  requisicaoDelete,
  requisicaoPut,
} from "../services/requisicoes";
import { CupomProps } from "./tipos";

export async function carregarCupons(setCupons: React.Dispatch<React.SetStateAction<CupomProps[]>>) {
  const response = await requisicaoGet("/Backend/Admin/cupons/cupons-listagem.php");
  if (response?.data?.todosCupons) {
    setCupons(response.data.todosCupons);
  }
}

export async function handleAddNewCoupon(
  e: React.FormEvent<HTMLFormElement>,
  cupons: CupomProps[],
  setCupons: React.Dispatch<React.SetStateAction<CupomProps[]>>,
  handleCloseModal: () => void
) {
  e.preventDefault();

  const form = e.currentTarget;

  const selectedServers = Array.from(
    form.querySelectorAll('input[name="aplicavel"]:checked') as NodeListOf<HTMLInputElement>
  ).map((checkbox) => checkbox.value);

  const dados = {
    token: localStorage.getItem("token"),
    codigo: form.codigo.value,
    desconto: form.desconto.value,
    tipo: form.tipo.value,
    validade: form.validade.value,
    maxuse: form.maxuse.value,
    valido: form.valido.checked ? 1 : 0,
    produtos: selectedServers,
  };

  try {
    const response = await requisicaoPost("/Backend/Admin/cupons/cupons-adicionar.php", dados);

    if (response?.data?.success) {
      Alerta("swal", "success", "Cupom adicionado com sucesso!");
      const updatedCupons = [response.data.novocupon, ...cupons];
      setCupons(updatedCupons);
      handleCloseModal();
    } else {
      Alerta("swal", "error", response?.data?.message || "Erro ao adicionar cupom");
      throw new Error(response?.data?.message || "Erro ao adicionar cupom");
    }
  } catch (error: unknown) {
    const err = error as Error;
    Alerta("swal", "error", `Erro ao adicionar cupom: ${err.message}`);
  }
}

export async function handleUpdateCoupon(
  e: React.FormEvent<HTMLFormElement>,
  selectedCoupon: CupomProps,
  cupons: CupomProps[],
  setCupons: React.Dispatch<React.SetStateAction<CupomProps[]>>,
  handleCloseModal: () => void
) {
  e.preventDefault();

  const form = e.currentTarget;

  const selectedServers = Array.from(
    form.querySelectorAll('input[name="aplicavel"]:checked') as NodeListOf<HTMLInputElement>
  ).map((checkbox) => checkbox.value);

  const uso = cupons.find((cupom) => cupom.id === selectedCoupon.id)?.usos ?? 0;

  const dados = {
    couponId: selectedCoupon.id,
    codigo: form.codigo.value,
    desconto: form.desconto.value,
    tipo: form.tipo.value,
    validade: form.validade.value,
    maxuse: form.maxuse.value,
    usos: uso,
    valido: form.valido.checked ? 1 : 0,
    produtos: selectedServers,
  };

  try {
    const response = await requisicaoPut("/Backend/Admin/cupons/cupons-editar.php", dados);

    if (response?.data?.success) {
      Alerta("swal", "success", "Cupom atualizado com sucesso!");

      const novoCupom: CupomProps = {
        id: selectedCoupon.id,
        codigo: form.codigo.value,
        desconto: parseFloat(form.desconto.value),
        tipo: form.tipo.value as "valor" | "percent",
        validade: form.validade.value,
        maxuse: parseInt(form.maxuse.value),
        usos: uso,
        valido: form.valido.checked ? 1 : 0,
        produtos: selectedServers, // Fixed: Using array directly instead of JSON string
      };

      const updatedCupons = [novoCupom, ...cupons.filter((cupom) => cupom.id !== selectedCoupon.id)];
      setCupons(updatedCupons);

      handleCloseModal();
    } else {
      const message = response?.data?.message || "Erro ao atualizar cupom";
      Alerta("swal", "error", message);
      throw new Error(message);
    }
  } catch (error: unknown) {
    const err = error as Error;
    Alerta("swal", "error", `Erro ao atualizar cupom: ${err.message}`);
  }
}

export async function handleDeleteCoupon({
  cupom,
  cupons,
  setCupons,
}: {
  cupom: CupomProps;
  cupons: CupomProps[];
  setCupons: React.Dispatch<React.SetStateAction<CupomProps[]>>;
}) {
  const response = await requisicaoDelete("/Backend/Admin/cupons/cupons-deletar.php", {
    codigo: cupom.codigo,
  });

  if (response?.data?.success) {
    const cupomDeletadoId = response.data.cupomDeletado.id;
    const meusCupons = cupons.filter((coupom) => coupom.id !== cupomDeletadoId);
    setCupons(meusCupons);

    Alerta("toast", "success", `${response?.data?.message}`);
  } else {
    Alerta("toast", "error", `${response?.data?.message || "Erro ao deletar cupom"}`);
  }
}

export function determinarStatus(cupom: CupomProps): string {
  if (!cupom || typeof cupom.valido === "undefined") return "Indefinido";
  return cupom.valido ? "Ativo" : "Inativo";
}

export function formatarDesconto(cupom: CupomProps): string {
  return cupom.tipo === "percent"
    ? `${parseFloat(String(cupom.desconto)).toFixed(0)}%`
    : `R$ ${parseFloat(String(cupom.desconto)).toFixed(2)}`;
}