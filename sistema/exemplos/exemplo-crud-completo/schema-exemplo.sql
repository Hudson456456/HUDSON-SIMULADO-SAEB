-- ============================================================
-- exemplos/exemplo-crud-completo/schema-exemplo.sql
-- ============================================================
-- Apenas para consulta - não faz parte do banco da oficina
-- (oficina_db.sql).
-- ============================================================

CREATE TABLE categorias (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT NOT NULL
);

CREATE TABLE livros (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo        TEXT NOT NULL,
    autor         TEXT,
    categoria_id  INTEGER NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

INSERT INTO categorias (nome) VALUES ('Ficção'), ('Técnico'), ('Biografia');

INSERT INTO livros (titulo, autor, categoria_id) VALUES
('Duna', 'Frank Herbert', 1),
('Clean Code', 'Robert C. Martin', 2),
('Steve Jobs', 'Walter Isaacson', 3);
