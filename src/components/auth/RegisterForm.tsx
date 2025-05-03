import React from 'react';
import { H2 } from "../tailwindComponents/Textos";
import { FormGroup } from "../comum/FormGroup";
import { Input } from "../comum/input";
import { Button } from "../comum/button";

interface RegisterFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  return (
    <div className="w-full bg-gray-100 p-4 h-screen flex items-center">
      <div className="div w-full md:w-1/2 mx-auto bg-white p-8 rounded-lg">
        <H2>Registre-se</H2>
        <form onSubmit={onSubmit}>
          <FormGroup label="Nome" id="nome">
            <Input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
              required
              defaultValue={"Roberio dos teclados"}
            />
          </FormGroup>

          <FormGroup label="E-mail" id="email">
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              defaultValue={"conectboxtecnologia@gmail.com"}
              required
            />
          </FormGroup>

          <FormGroup label="Telefone" id="telefone">
            <Input
              id="telefone"
              type="tel"
              placeholder="Digite seu numero de telefone"
              defaultValue={"11999999999"}
              required
            />
          </FormGroup>

          <FormGroup label="Senha" id="senha">
            <Input
              id="senha"
              type="password"
              placeholder="Digite uma senha"
              defaultValue={"12#34$56"}
              required
            />
          </FormGroup>

          <FormGroup label="Confirme a Senha" id="confirmarsenha">
            <Input
              id="confirmarsenha"
              type="password"
              placeholder="Digite a mesma senha"
              defaultValue={"12#34$56"}
              required
            />
          </FormGroup>

          <div className="mt-8">
            <Button type="submit">Cadastrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
} 