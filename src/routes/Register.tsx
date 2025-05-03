import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { requisicaoPost } from "../services/requisicoes";
import Alerta from "../components/comum/alertas";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";
import { OtpVerification } from "../components/auth/OtpVerification";
import { useNavigate } from "react-router-dom";

interface DadosUsuario {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarsenha: string;
}

function Register() {
  const Navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [codigo, setCodigo] = useState('');
  const [dadosUsuario, setDadosUsuario] = useState<DadosUsuario>({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarsenha: ''
  });
  
  const [erro, setErro] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer === 0) {
      return;
    }
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  async function gerarCodigo() {
    const promise = axios.post(`${import.meta.env.VITE_API}/Backend/Auth/OtpCode/gerar.php`, { dadosUsuario }).then(response => {
      if (!response.data.success) {
        setErro(response.data.message);
        throw new Error(response.data.message);
      }
      return response;
    });
    
    toast.promise(promise, {
      pending: {
        render: () => "Enviando código"
      },
      success: {
        render: () => "Código enviado com sucesso"
      },
      error: {
        render: () => "Erro ao enviar o código"
      }
    });

    try {
      const response = await promise;
      setTimer(25);
      console.log(response);
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (step === 2) {
      gerarCodigo();
    }
  }, [step]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    if (form.senha.value !== form.confirmarsenha.value) {
      Alerta("toast", "error", "As senhas não coincidem");
      return;
    }

    if (isNaN(Number(form.telefone.value))) {
      Alerta("toast", "error", "Telefone inválido deve conter apenas números");
      return;
    }

    if (form.telefone.value.length < 11 || form.telefone.value.length > 15) {
      Alerta("toast", "error", "Telefone inválido");
      return;
    }

    const formDataObj: DadosUsuario = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
      senha: form.senha.value,
      confirmarsenha: form.confirmarsenha.value
    };
    
    setDadosUsuario(formDataObj);
    setStep(2);
  }

  async function handleConfirmarCodigo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const codigo = form.codigo.value;
  
    if (isNaN(Number(codigo))) {
      Alerta("toast", "error", "Código inválido, deve conter apenas números");
      return;
    }
  
    const formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('nome', dadosUsuario.nome);
    formData.append('telefone', dadosUsuario.telefone);
    formData.append('email', dadosUsuario.email);
    formData.append('senha', dadosUsuario.senha);
    
    try {
      const response = await requisicaoPost(`/Backend/Auth/OtpCode/validar.php`, formData) as any;
      console.log(response);

      if (response.data.success) {
        
        Alerta("toast", "success", `${response.data.message || "Código validado com sucesso"}`);
        Navigate("/dashboard");
      } else {
        setErro(erro);
        Alerta("toast", "error", `${response.data.message || "Erro ao validar o código"}`);
      }
    } catch (error) {
      console.error(error);
      Alerta("toast", "error", "Erro ao validar o código");
    }
  }

  return (
    <>
      {step === 0 && <LoginForm onSubmit={handleSubmit} />}
      {step === 1 && <RegisterForm onSubmit={handleSubmit} />}
      {step === 2 && (
        <OtpVerification
          codigo={codigo}
          setCodigo={setCodigo}
          onSubmit={handleConfirmarCodigo}
          setStep={setStep}
          timer={timer}
          setErro={setErro}
          erro={erro}
        />
      )}
    </>
  );
}

export default Register;


