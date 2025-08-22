-- Seed data for Telecontrol Database

-- Insert default admin user (password: admin123)
INSERT INTO usuarios (nome, email, senha, role) VALUES
('Administrador', 'admin@telecontrol.com', '$2y$10$f162.m5P6zo0hGQZNsjazOwj6FJI9EptJZ9.jnT0YDsamVI3Pcama', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample users
INSERT INTO usuarios (nome, email, senha, role) VALUES
('Pedro Henrique', 'pedro.henrique@telecontrol.com', '$2y$10$f162.m5P6zo0hGQZNsjazOwj6FJI9EptJZ9.jnT0YDsamVI3Pcama', 'usuario'),
('João Paulo', 'joao.paulo@telecontrol.com', '$2y$10$f162.m5P6zo0hGQZNsjazOwj6FJI9EptJZ9.jnT0YDsamVI3Pcama', 'usuario')
ON CONFLICT (email) DO NOTHING;

-- Insert sample clientes
INSERT INTO clientes (nome, cpf_cnpj, endereco, telefone, email) VALUES
('Empresa ABC', '12345678000190', 'Rua Inconfidencia, 668 - Centro', '(14) 99999-9999', 'contato@empresaabc.com'),
('Pedro Lourenci', '12345678900', 'Av. Principal, 456 - Jardim', '(14) 88888-8888', 'pedro.lourenci@email.com'),
('João Paulo', '98765432100', 'Rua do Comércio, 789 - Vila', '(14) 77777-7777', 'joao.paulo@email.com')
ON CONFLICT (cpf_cnpj) DO NOTHING;

-- Insert sample produtos
INSERT INTO produtos (codigo, descricao, status, tempo_garantia, preco) VALUES
('PROD-001', 'Produto 1', 'ativo', 12, 3500.00),
('PROD-002', 'Produto 2', 'ativo', 24, 1200.00),
('PROD-003', 'Produto 3', 'ativo', 36, 2500.00)
ON CONFLICT (codigo) DO NOTHING;

-- Insert sample ordens de serviço
INSERT INTO ordens_servico (numero, cliente_id, produto_id, descricao_problema, status, prioridade) VALUES
('OS-2024-001', 1, 1, 'Produto 1 com problema', 'aberta', 'alta'),
('OS-2024-002', 2, 2, 'Produto 2 com problema', 'em_andamento', 'normal'),
('OS-2024-003', 3, 3, 'Produto 3 com problema', 'concluida', 'baixa'),
('OS-2024-004', 1, 2, 'Produto 2 com problema', 'aberta', 'normal'),
('OS-2024-005', 2, 1, 'Produto 1 com problema', 'em_andamento', 'alta'),
('OS-2024-006', 3, 3, 'Produto 3 com problema', 'cancelada', 'baixa'),
('OS-2024-007', 1, 1, 'Produto 1 com problema', 'aberta', 'normal'),
('OS-2024-008', 2, 2, 'Produto 2 com problema', 'concluida', 'normal')
ON CONFLICT (numero) DO NOTHING;
