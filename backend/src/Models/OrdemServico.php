<?php

namespace App\Models;

use App\Core\Database;

class OrdemServico
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function findAll()
    {
        $sql = "SELECT os.*, c.nome as cliente_nome, p.descricao as produto_descricao
                FROM ordens_servico os
                LEFT JOIN clientes c ON os.cliente_id = c.id
                LEFT JOIN produtos p ON os.produto_id = p.id
                ORDER BY os.data_abertura DESC";
        return $this->db->fetchAll($sql);
    }

    public function findById($id)
    {
        $sql = "SELECT os.*, c.nome as cliente_nome, p.descricao as produto_descricao
                FROM ordens_servico os
                LEFT JOIN clientes c ON os.cliente_id = c.id
                LEFT JOIN produtos p ON os.produto_id = p.id
                WHERE os.id = ?";
        return $this->db->fetch($sql, [$id]);
    }

    public function create($data)
    {
        $numero = 'OS-' . date('Y') . '-' . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT);

        $sql = "INSERT INTO ordens_servico (numero, cliente_id, produto_id, descricao_problema, status, prioridade)
                VALUES (?, ?, ?, ?, ?, ?)";
        $this->db->query($sql, [
            $numero,
            $data['cliente_id'],
            $data['produto_id'],
            $data['descricao_problema'] ?? '',
            $data['status'] ?? 'aberta',
            $data['prioridade'] ?? 'normal'
        ]);
        return $this->db->lastInsertId();
    }

    public function update($id, $data)
    {
        $sql = "UPDATE ordens_servico SET cliente_id = ?, produto_id = ?, descricao_problema = ?, status = ?, prioridade = ? WHERE id = ?";
        return $this->db->query($sql, [
            $data['cliente_id'],
            $data['produto_id'],
            $data['descricao_problema'] ?? '',
            $data['status'] ?? 'aberta',
            $data['prioridade'] ?? 'normal',
            $id
        ]);
    }

    public function delete($id)
    {
        return $this->db->query("UPDATE ordens_servico SET status = 'cancelada' WHERE id = ?", [$id]);
    }
}
