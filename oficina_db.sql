-- ============================================================
-- SIMULADO SAEP - Técnico em Desenvolvimento de Sistemas
-- Sistema de Gestão - Oficina Mecânica
-- Script de criação e população do banco de dados (SQLite)
-- ============================================================
-- Este script já está pronto (BASE FORNECIDA).
-- Para gerar o arquivo do banco (sistema/src/db/oficina.db),
-- rode dentro da pasta sistema/:  npm run criar-banco
-- ============================================================

DROP TABLE IF EXISTS ordens_servico;
DROP TABLE IF EXISTS veiculos;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS usuarios;

-- ============================================================
-- TABELA: usuarios (funcionários da oficina que fazem login)
-- ============================================================
CREATE TABLE usuarios (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    nome   TEXT NOT NULL,
    login  TEXT UNIQUE NOT NULL,
    senha  TEXT NOT NULL -- hash (bcrypt)
);

-- ============================================================
-- TABELA: clientes
-- ============================================================
CREATE TABLE clientes (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nome      TEXT NOT NULL,
    cpf       TEXT NOT NULL, -- criptografado (reversível)
    telefone  TEXT
);

-- ============================================================
-- TABELA: veiculos (cada veículo pertence a um único cliente)
-- ============================================================
CREATE TABLE veiculos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    placa       TEXT NOT NULL,
    modelo      TEXT,
    cliente_id  INTEGER NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- ============================================================
-- TABELA: ordens_servico (cada ordem é vinculada a um veículo;
-- o cliente é obtido via JOIN: ordens_servico -> veiculos -> clientes)
-- ============================================================
CREATE TABLE ordens_servico (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    veiculo_id        INTEGER NOT NULL,
    data_abertura     TEXT NOT NULL, -- formato AAAA-MM-DD
    descricao         TEXT,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
);

-- ============================================================
-- POPULAÇÃO - USUARIOS
-- Login de exemplo: usuario = "admin", senha = "123456"
-- Login de exemplo: usuario = "marcos", senha = "123456"
-- Login de exemplo: usuario = "paula", senha = "123456"
-- Hash gerado de verdade com bcrypt (10 rounds) para "123456"
-- ============================================================
INSERT INTO usuarios (nome, login, senha) VALUES
('Administrador', 'admin', '$2b$10$KwxQbwyaa1psc0E4DVRrv.zPS2/zMvaF76jHRf/r2dZFDVLQhrCbi'),
('Marcos Aurélio', 'marcos', '$2b$10$KwxQbwyaa1psc0E4DVRrv.zPS2/zMvaF76jHRf/r2dZFDVLQhrCbi'),
('Paula Nogueira', 'paula', '$2b$10$KwxQbwyaa1psc0E4DVRrv.zPS2/zMvaF76jHRf/r2dZFDVLQhrCbi');

-- ============================================================
-- POPULAÇÃO - CLIENTES
-- CPFs abaixo já estão CRIPTOGRAFADOS (gerados com o mesmo
-- utilitário src/utils/criptografia.js). Os CPFs originais eram:
--   Roberto Alves  -> 444.444.444-44
--   Fernanda Lima  -> 555.555.555-55
--   Diego Ramos    -> 666.666.666-66
-- ============================================================
INSERT INTO clientes (nome, cpf, telefone) VALUES
('Roberto Alves', 'c6afb5db4a253c2489bac4e23ff54377', '(49) 98888-0001'),
('Fernanda Lima', '3d7363e98a464f405e3041af419be809', '(49) 98888-0002'),
('Diego Ramos',   '5df174831d3162faa54738f8b524a4e7', '(49) 98888-0003');

-- ============================================================
-- POPULAÇÃO - VEICULOS
-- ============================================================
INSERT INTO veiculos (placa, modelo, cliente_id) VALUES
('ABC1D23', 'Fiat Uno',        1),
('XYZ9E88', 'VW Gol',          2),
('QWE4F77', 'Honda Civic',     3);

-- ============================================================
-- POPULAÇÃO - ORDENS_SERVICO
-- ============================================================
INSERT INTO ordens_servico (veiculo_id, data_abertura, descricao) VALUES
(1, '2026-09-20', 'Troca de óleo e filtro'),
(2, '2026-09-18', 'Revisão de freios'),
(3, '2026-09-22', 'Diagnóstico de motor');
