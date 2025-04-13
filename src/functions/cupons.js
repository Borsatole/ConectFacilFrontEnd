import Alerta from "../components/comum/alertas";
import { requisicaoPost } from "../services/requisicoes";

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
    const response = await fetch(
      `${import.meta.env.VITE_API}/Backend/Admin/cupons/cupons-adicionar.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      }
    );

    if (!response.ok) {
      throw new Error("Falha na resposta do servidor");
    }

    const data = await response.json();

    if (data.success) {
      // Add new coupon to local data
      Alerta("swal", "success", "Cupom adicionado com sucesso!");

      console.log(data);

      // relistar cupons
      const updatedCupons = [data.novocupon, ...cupons];
      setCupons(updatedCupons);
      handleCloseModal();
    } else {
      throw new Error(data.message || "Erro ao adicionar cupom");
    }
  } catch (error) {
    Alerta("swal", "error", `Erro ao adicionar cupom: ${error.message}`);
  }
}

export async function handleUpdateCoupon(
  e,
  selectedCoupon,
  setCupons,
  handleCloseModal
) {
  e.preventDefault();

  const form = e.target;

  const selectedServers = Array.from(
    form.querySelectorAll('input[name="aplicavel"]:checked')
  ).map((checkbox) => checkbox.value);

  const dados = {
    token: localStorage.getItem("token"),
    couponId: selectedCoupon.id,
    codigo: form.codigo.value,
    desconto: form.desconto.value,
    tipo: form.tipo.value,
    validade: form.validade.value,
    maxuse: form.maxuse.value,
    valido: form.valido.checked ? 1 : 0,
    produtos: selectedServers,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API}/Backend/Admin/cupons/cupons-editar.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      }
    );

    if (!response.ok) {
      throw new Error("Falha na resposta do servidor");
    }

    const data = await response.json();

    if (data.success) {
      // Atualiza lista de cupons
      const listResponse = await fetch(
        `${import.meta.env.VITE_API}/Backend/Admin/cupons/cupons-listagem.php`,
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

      if (!listResponse.ok) {
        throw new Error("Falha ao atualizar lista de cupons");
      }

      const listData = await listResponse.json();
      if (listData.success && Array.isArray(listData.todosCupons)) {
        setCupons(listData.todosCupons);
      }

      Alerta("swal", "success", "Cupom atualizado com sucesso!");

      handleCloseModal();
    } else {
      throw new Error(data.message || "Erro ao atualizar cupom");
    }
  } catch (error) {
    Alerta("swal", "error", `Erro ao atualizar cupom: ${error.message}`);
  }
}

export async function handleDeleteCoupon(cupom) {
  const response = await requisicaoPost(
    "/Backend/Admin/cupons/cupons-deletar.php",
    {
      codigo: cupom.codigo,
    }
  );
  if (response?.data?.success) {
    Alerta("toast", "success", `${response?.data?.message}`);

    // console.log(response);
  } else {
    Alerta("toast", "error", `${response?.data?.message}`);
  }
}

export function determinarStatus(cupom) {
  if (cupom.valido === 0) return "Inativo";

  const dataValidade = new Date(cupom.validade);
  const hoje = new Date();

  if (dataValidade < hoje) return "Expirado";
  if (cupom.usos >= cupom.maxuse) return "Excedido";

  return "Ativo";
}

export function formatarDesconto(cupom) {
  return cupom.tipo === "percent"
    ? `${parseFloat(cupom.desconto).toFixed(0)}%`
    : `R$ ${parseFloat(cupom.desconto).toFixed(2)}`;
}
