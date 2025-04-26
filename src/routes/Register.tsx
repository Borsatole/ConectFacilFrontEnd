import React, { useEffect, useState } from "react";
import { H2, H3 } from "../components/tailwindComponents/Textos"
import Container from "../components/tailwindComponents/Container"
import { FormGroup } from "../components/comum/FormGroup"
import { Input } from "../components/comum/input"
import { Button } from "../components/comum/button"
import Alerta from "../components/comum/alertas"


function Register() {
    const [step, setStep] = useState(1);
    const [codigo, setCodigo] = useState('');
    const [dadosUsuario, setDadosUsuario] = useState({});

    useEffect (() => {
        if (step === 2) {
          axios.post(`${import.meta.env.VITE_API}/Backend/Auth/OtpCode/gerar.php`, {dadosUsuario})
            .then((response) => {
                // Alerta("toast", "success", `${response.data.message}`);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [step]);
    


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        if (form.senha.value !== form.confirmarsenha.value) {
            Alerta("toast", "error", "As senhas não coincidem");
            return;
        }

        if (isNaN(form.telefone.value)){
            Alerta("toast", "error", "Telefone inválido deve conter apenas números");
            return;
        }

        if (form.telefone.value.length < 11 || form.telefone.value.length > 15) {
            Alerta("toast", "error", "Telefone inválido");
            return;
        }
  
        const formData = new FormData();
        formData.append('nome', form.nome.value);
        formData.append('email', form.email.value);
        formData.append('telefone', form.telefone.value);
        formData.append('senha', form.senha.value);
        formData.append('confirmarsenha', form.confirmarsenha.value);
        
        const formDataObj: { [key: string]: string } = {};
        formData.forEach((value, key) => {
          formDataObj[key] = value as string;
        });

        setDadosUsuario(formDataObj);
        console.log(dadosUsuario);
        setStep(2);

    }

    function handleConfirmarCodigo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        console.log(form.codigo.value);

        if (form.codigo.value !== codigo) {
            Alerta("toast", "error", "Código inválido");
            return;
        }
    }
  return (
    <>
    {step === 0 && (
        <div className="h-full">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                      alt="Your Company"
                      src="/images/logo.png"
                      className="mx-auto h-20 w-auto"
                    />
                  </div>
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" id="formLogin" onSubmit={e => handleSubmit(e)}>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-left font-medium text-gray-900"
                        >
                          E-mail
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-left font-medium text-gray-900"
                          >
                            Senha
                          </label>
                          <div className="text-sm">
                            <a
                              href="#"
                              className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                              Esqueceu a senha?
                            </a>
                          </div>
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      <div>
                        <Button type="submit" >
                          Acessar
                        </Button>
                        
                      </div>
                    </form>
                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                      Não tem cadastro?{" "}
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Cadastre-se
                      </a>
                    </p>
                  </div>
                </div>
              </div>
    )}
    {step === 1 && (
        
    <div className="w-full p-20 bg-gray-100 h-screen">
    <Container tipo="secundario">
        <H2>Registre-se</H2>
        <form onSubmit={(e) => handleSubmit(e)}>

            <FormGroup label="Nome" id="nome">
                <Input id="nome" type="text" placeholder="Digite seu nome completo" defaultValue={"Fulano de tal"} required/>
            </FormGroup>

            <FormGroup label="E-mail" id="email">
                <Input id="email" type="email" placeholder="Digite seu e-mail" 
                value={"conectboxtecnologia@gmail.com"} required/>
            </FormGroup>

            <FormGroup label="Telefone" id="telefone">
                <Input id="telefone" type="tel" placeholder="Digite seu numero de telefone" 
                value={"11999999999"}
                 required/>
            </FormGroup>

            <FormGroup label="Senha" id="senha">
                <Input id="senha" type="password" placeholder="Digite uma senha" 
                value={"12345678"} required/>
            </FormGroup>

            <FormGroup label="Confirme a Senha" id="confirmarsenha">
                <Input id="confirmarsenha" type="password" placeholder="Digite a mesma senha" 
                value={"12345678"} required/>
            </FormGroup>

            <div className="mt-8">
            <Button type="submit">Cadastrar</Button>
            </div>

        </form>
        

    </Container>
    </div>
    )} 
    
    
    {step === 2 && (
  <div className="w-full p-20 bg-gray-100 h-screen">
    <Container tipo="secundario">
      <H2>Nós enviamos um código de 4 dígitos para o seu e-mail.</H2>
      <h3 className="text-xl font-light leading-4 text-gray-900 mb-4">Por favor, confirme o código abaixo:</h3>

      <form onSubmit={handleConfirmarCodigo} className="mt-8 space-y-6">
        <div className="w-full flex justify-center">
          <input type="hidden" name="codigo" value={codigo} />
          <OtpInput value={codigo} onChange={setCodigo} />
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <Button type="submit" wsize="w-1/2">Confirmar</Button>
          <a href="#" className="text-gray-600 hover:text-gray-800 mt-2" onClick={() => {Alerta("toast", "success", "Reenviado com sucesso"), setCodigo("")}}>Reenviar Código</a>
        </div>
      </form>
    </Container>
  </div>
)}


    
    </>
  )
}

export default Register


import { useRef } from 'react';
import axios from "axios";

export function OtpInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const inputs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/, ''); // remove não numéricos
    if (!val) return;

    const newValue = value.substring(0, index) + val + value.substring(index + 1);
    onChange(newValue);

    if (index < 3) inputs[index + 1].current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          ref={inputs[i]}
          type="text"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        />
      ))}
    </div>
  );
}
