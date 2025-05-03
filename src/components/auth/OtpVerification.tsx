import React from 'react';
import { H2 } from "../tailwindComponents/Textos";
import { Button } from "../comum/button";
import { OtpInput } from "./OtpInput";
import Alerta from "../comum/alertas";

interface OtpVerificationProps {
  codigo: string;
  setCodigo: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setErro: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  timer: number;
  erro: string | null;
}

export function OtpVerification({ codigo, setCodigo, setStep, setErro, onSubmit, timer, erro }: OtpVerificationProps) {
  return (
    <div className="w-full bg-gray-100 p-4 h-screen flex items-center">
      <div className="div w-full md:w-1/2 mx-auto bg-white p-8 rounded-lg">
      {erro ? (
          <div role="alert" className="border-s-4 border-red-700 bg-red-50 p-4">
            <div className="flex items-center gap-2 text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              <strong className="font-medium"> Ocorreu um erro </strong>
            </div>
            <p className="mt-2 text-sm text-red-700">{erro}</p> 
            <a onClick={() => {
              setStep(1)
              setErro(null)
            }} className="text-gray-600 hover:text-gray-800 cursor-pointer mt-2">
              Voltar
            </a>
          </div>
        ) : (
          <>
            <H2>Nós enviamos um código de 4 dígitos para o seu e-mail.</H2>
            <h3 className="text-xl font-light leading-4 text-gray-900 mb-4">
              Por favor, confirme o código abaixo:
            </h3>

            <form onSubmit={onSubmit} className="mt-8 space-y-6">
              <div className="w-full flex justify-center">
                <input type="hidden" name="codigo" value={codigo} />
                <OtpInput value={codigo} onChange={setCodigo} />
              </div>

              <div className="w-full flex flex-col justify-center items-center">
                <a href="#" onClick={() => 
                  setCodigo("")
                } className="text-gray-600 hover:text-gray-800">
                  Limpar
                </a>
                <Button type="submit" wsize="w-1/2">
                  Confirmar
                </Button>

                {timer === 0 ? (
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 mt-2"
                    onClick={() => {
                      Alerta("toast", "success", "Reenviado com sucesso");
                      setCodigo("");
                    }}
                  >
                    Reenviar Código
                  </a>
                ) : (
                  <a href="#" className="text-gray-600 hover:text-gray-800 mt-2">
                    Reenviar Código em {timer} segundos
                  </a>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
} 