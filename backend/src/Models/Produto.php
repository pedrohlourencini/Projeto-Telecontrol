<?php

namespace App\Models;

use App\Core\Database;

class Produto
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function findAll()
    {
        return $this->db->fetchAll("SELECT * FROM produtos WHERE ativo = true ORDER BY descricao");
    }

    public function findById($id)
    {
        return $this->db->fetch("SELECT * FROM produtos WHERE id = ?", [$id]);
    }

    public function create($data)
    {
        $sql = "INSERT INTO produtos (codigo, descricao, status, tempo_garantia, preco) VALUES (?, ?, ?, ?, ?)";
        $this->db->query($sql, [
            $data['codigo'],
            $data['descricao'],
            $data['status'] ?? 'ativo',
            $data['tempo_garantia'] ?? 12,
            $data['preco'] ?? 0
        ]);
        return $this->db->lastInsertId();
    }

    public function update($id, $data)
    {
        $sql = "UPDATE produtos SET codigo = ?, descricao = ?, status = ?, tempo_garantia = ?, preco = ? WHERE id = ?";
        return $this->db->query($sql, [
            $data['codigo'],
            $data['descricao'],
            $data['status'] ?? 'ativo',
            $data['tempo_garantia'] ?? 12,
            $data['preco'] ?? 0,
            $id
        ]);
    }

    public function delete($id)
    {
        return $this->db->query("UPDATE produtos SET ativo = false WHERE id = ?", [$id]);
    }
}
