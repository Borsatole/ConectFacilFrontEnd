# 🛡️ SISTEMA DE RECARGAS ONLINE – PHP + TypeScript

### 💬 Descrição

Este projeto é um sistema de recargas seguro, desenvolvido com **PHP** no backend e **TypeScript** no frontend. Ele oferece proteção contra ataques de força bruta, bloqueando o acesso após várias tentativas de login falhas.

---

## ⚙️ Funcionalidades

- ✅ **Bloqueio após múltiplas tentativas:** Sistema de proteção que bloqueia o IP após um número excessivo de tentativas de login inválidas. Após o bloqueio, o usuário deverá aguardar um tempo mínimo para tentar novamente.
- ✅ **Autenticação com Token (JWT):** Implementação de JSON Web Token para segurança e persistência da sessão do usuário.
- ✅ **Salvamento de token no navegador:** Após o login, o sistema armazena o token no `LocalStorage`. Ao acessar outras páginas, esse token é enviado ao backend para validar a sessão. Tokens inválidos ou expirados resultam em logout automático.
- ✅ **Sistema Multi-Usuarios:** Cada cliente tem sua conta, e seus codigos de recargas.
- ✅ **Integração MercadoPago:** Pagamentos são recebidos pelo sdk do mercado pago, após o pagamento é liberado o codigo de recarga.
- ✅ **Seção de Pedidos:** O cliente poderá visualizar suas compras em meus pedidos.
- ✅ **Seção Administrativa:** O Administrador do sistema poderá criar, deletar e alterar recargas, cupons.
- ✅ **LazyLoading:** O sistema utiliza o sistema de carregamento LazyLoading para melhorar o desempenho do sistema.
- ✅ **Interface Responsiva:** Design adaptável para diferentes dispositivos – desktop, tablets e smartphones.

## 🌐 Acesse o Projeto Online
https://conectfacil.playnetapp.com

🆔 CONTA DE ADMINISTRADOR
👤 usuario1@admin.com
🔐 admin

🆔 CONTA DE USUARIO PADRAO
👤 usuario2@admin.com
🔐 admin

---

## 🤖 Tecnologias Utilizadas

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,html,css,typescript,php,mysql" />
  </a>
</p>

