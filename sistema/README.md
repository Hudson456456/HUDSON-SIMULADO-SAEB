# Simulado - Sistema de Gestão - Oficina Mecânica

Simulado de treino no mesmo formato do SAEP. Sistema de cadastro e
gerenciamento de clientes, veículos e ordens de serviço, com
autenticação de usuários e controle seguro de dados.

## Tecnologias

- Front-end: HTML, CSS e JavaScript puros (sem framework)
- Back-end: Node.js + Express 5 (CommonJS: `require` / `module.exports`)
- Banco de dados: SQLite (pacotes `sqlite` + `sqlite3`)
- Sessão: `express-session` | Senha: `bcrypt` | CPF: `crypto` (nativo do Node)

## Estrutura

```
sistema/
├── src/
│   ├── index.js                 # servidor (pronto)
│   ├── db/
│   │   ├── conexao.js           # conectarComBancoDeDados() (pronto)
│   │   ├── criarBanco.js        # gera o oficina.db a partir do oficina_db.sql (pronto)
│   │   └── oficina.db           # arquivo do banco SQLite
│   ├── routes/                  # URL + método HTTP -> controller (prontos)
│   ├── controllers/             # validação, criptografia, resposta JSON (VOCÊ COMPLETA)
│   ├── models/                  # SQL (VOCÊ COMPLETA)
│   ├── middlewares/
│   │   └── autenticacao.js      # verificarSessao (pronto)
│   └── utils/
│       └── criptografia.js      # hash de senha e criptografia de CPF (pronto)
├── public/                      # telas HTML/CSS/JS (JS: VOCÊ COMPLETA)
└── exemplos/                    # exemplos de consulta (não fazem parte do sistema)
```

## Como rodar

Dentro da pasta `sistema/`:

1. `npm install`
2. `npm run criar-banco` (gera `src/db/oficina.db` a partir do
   `oficina_db.sql` da raiz do projeto - rode de novo sempre que
   alterar o script)
3. `npm run rodar`
4. Acesse http://localhost:3000/

Usuários de teste:

| Usuário | Senha  |
|---------|--------|
| admin   | 123456 |
| marcos  | 123456 |
| paula   | 123456 |

Para conferir o banco, use a extensão **SQLite Viewer** (ou similar)
no VS Code e abra o arquivo `src/db/oficina.db`.

Veja **GUIA_DE_DESENVOLVIMENTO.md** para o roteiro de cada parte
pendente.
