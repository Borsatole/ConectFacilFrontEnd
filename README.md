# 🛡️ SISTEMA DE RECARGAS ONLINE – PHP + TypeScript

### 💬 Descrição

Este projeto é um sistema de recargas seguro, desenvolvido com **PHP** no backend e **TypeScript** no frontend. Ele oferece proteção contra ataques de força bruta, bloqueando o acesso após várias tentativas de login falhas.

---

## ⚙️ Funcionalidades

- ✅ **Bloqueio após múltiplas tentativas:** Sistema de proteção que bloqueia o IP após um número excessivo de tentativas de login inválidas. Após o bloqueio, o usuário deverá aguardar um tempo mínimo para tentar novamente.
- ✅ **Autenticação com Token (JWT):** Implementação de JSON Web Token para segurança e persistência da sessão do usuário.
- ✅ **Salvamento de token no navegador:** Após o login, o sistema armazena o token no `LocalStorage`. Ao acessar outras páginas, esse token é enviado ao backend para validar a sessão. Tokens inválidos ou expirados resultam em logout automático.
- ✅ **Interface Responsiva:** Design adaptável para diferentes dispositivos – desktop, tablets e smartphones.

---

## 🤖 Tecnologias Utilizadas

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,html,css,react,php,mysql" />
  </a>
</p>

---

## 🚀 Como Instalar?

### 📥 1. Clone o Repositório

```bash
git clone https://github.com/Borsatole/SistemaAutenticacao.git
cd SistemaAutenticacao
```
