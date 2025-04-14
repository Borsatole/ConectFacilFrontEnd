import Alerta from "../components/comum/alertas";
import {
  requisicaoGet,
  requisicaoPost,
  requisicaoDelete,
  requisicaoPut,
} from "../services/requisicoes";

export async function carregarCupons(setCupons) {
  const response = await requisicaoGet(
    "/Backend/Admin/cupons/cupons-listagem.php"
  );
  if (response?.data?.todosCupons) {
    setCupons(response.data.todosCupons);
  }
}

export async function handleAddNewCoupon(
  e,
  cupons,
  setCupons,
  handleCloseModal
) {
  e.preventDefault();

  const selectedServers = Array.from(
    e.target.querySelectorAll('input[name="aplicavel"]:checked')
  ).map((checkbox) => checkbox.value);

  const dados = {
    token: localStorage.getItem("token"),
    codigo: e.target.codigo.value,
    desconto: e.target.desconto.value,
    tipo: e.target.tipo.value,
    validade: e.target.validade.value,
    maxuse: e.target.maxuse.value,
    valido: e.target.valido.checked ? 1 : 0,
    produtos: selectedServers,
  };

  try {
    const response = await requisicaoPost(
      "/Backend/Admin/cupons/cupons-adicionar.php",
      dados
    );

    if (response?.data?.success) {
      Alerta("swal", "success", "Cupom adicionado com sucesso!");

      const updatedCupons = [response.data.novocupon, ...cupons];
      setCupons(updatedCupons);
      handleCloseModal();
    } else {
      Alerta(
        "swal",
        "error",
        response?.data?.message || "Erro ao adicionar cupom"
      );
      throw new Error(response?.data?.message || "Erro ao adicionar cupom");
    }
  } catch (error) {
    Alerta("swal", "error", `Erro ao adicionar cupom: ${error.message}`);
  }
}

export async function handleUpdateCoupon(
  e,
  selectedCoupon,
  cupons,
  setCupons,
  handleCloseModal
) {
  e.preventDefault();

  const form = e.target;

  const selectedServers = Array.from(
    form.querySelectorAll('input[name="aplicavel"]:checked')
  ).map((checkbox) => checkbox.value);

  const uso = cupons.filter((cupom) => cupom.id == selectedCoupon.id)[0].usos;

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
    const response = await requisicaoPut(
      "/Backend/Admin/cupons/cupons-editar.php",
      dados
    );

    if (response?.data?.success) {
      Alerta("swal", "success", "Cupom atualizado com sucesso!");

      const novoCupom = {
        id: selectedCoupon.id,
        codigo: form.codigo.value,
        desconto: form.desconto.value,
        tipo: form.tipo.value,
        validade: form.validade.value,
        maxuse: form.maxuse.value,
        usos: uso,
        valido: form.valido.checked ? 1 : 0,
        produtos: JSON.stringify(selectedServers),
      };

      cupons = cupons.filter((cupom) => cupom.id !== selectedCoupon.id);

      const updatedCupons = [novoCupom, ...cupons];
      setCupons(updatedCupons);

      handleCloseModal();
    } else {
      const message = response?.data?.message || "Erro ao atualizar cupom";
      Alerta("swal", "error", message);
      throw new Error(message);
    }
  } catch (error) {
    console.log(error);
    Alerta("swal", "error", `Erro ao atualizar cupom: ${error.message}`);
  }
}

export async function handleDeleteCoupon({ cupom, cupons, setCupons }) {
  const response = await requisicaoDelete(
    "/Backend/Admin/cupons/cupons-deletar.php",
    {
      codigo: cupom.codigo,
    }
  );

  if (response?.data?.success) {
    const cupomDeletadoId = response.data.cupomDeletado.id;
    const meusCupons = cupons.filter((coupom) => coupom.id !== cupomDeletadoId);
    setCupons(meusCupons);

    Alerta("toast", "success", `${response?.data?.message}`);
  } else {
    Alerta(
      "toast",
      "error",
      `${response?.data?.message || "Erro ao deletar cupom"}`
    );
  }
}

export function determinarStatus(cupom) {
  if (!cupom || typeof cupom.valido === "undefined") return "Indefinido";
  return cupom.valido ? "Ativo" : "Inativo";
}

export function formatarDesconto(cupom) {
  return cupom.tipo === "percent"
    ? `${parseFloat(cupom.desconto).toFixed(0)}%`
    : `R$ ${parseFloat(cupom.desconto).toFixed(2)}`;
}
