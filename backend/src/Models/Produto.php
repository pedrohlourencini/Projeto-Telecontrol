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
        return $this->db->fetchAll("
            SELECT
                id,
                codigo,
                descricao,
                status,
                CASE
                    WHEN ativo = 't' THEN 'ativo'
                    ELSE 'inativo'
                END as status_display,
                tempo_garantia,
                preco,
                ativo,
                created_at,
                updated_at
            FROM produtos
            ORDER BY descricao
        ");
    }

    public function findById($id)
    {
        return $this->db->fetch("SELECT * FROM produtos WHERE id = ?", [$id]);
    }

    public function create($data)
    {
        $sql = "INSERT INTO produtos (codigo, descricao, status, tempo_garantia, preco, ativo) VALUES (?, ?, ?, ?, ?, ?) RETURNING id";

        // Garantir que o valor ativo seja um boolean válido para PostgreSQL
        $ativo = isset($data['ativo']) ? ($data['ativo'] ? 't' : 'f') : 't';

        $result = $this->db->query($sql, [
            $data['codigo'],
            $data['descricao'],
            $data['status'] ?? 'ativo',
            $data['tempo_garantia'] ?? 12,
            $data['preco'] ?? 0,
            $ativo
        ]);
        return $result->fetchColumn();
    }

    public function update($id, $data)
    {
        $sql = "UPDATE produtos SET codigo = ?, descricao = ?, status = ?, tempo_garantia = ?, preco = ?, ativo = ? WHERE id = ?";

        // Garantir que o valor ativo seja um boolean válido para PostgreSQL
        $ativo = isset($data['ativo']) ? ($data['ativo'] ? 't' : 'f') : 't';

        try {
            $result = $this->db->query($sql, [
                $data['codigo'],
                $data['descricao'],
                $data['status'] ?? 'ativo',
                $data['tempo_garantia'] ?? 12,
                $data['preco'] ?? 0,
                $ativo,
                $id
            ]);

            error_log("MODEL PRODUTO UPDATE - Query executada com sucesso");
            return $result;

        } catch (\Exception $e) {
            error_log("MODEL PRODUTO UPDATE - Erro na query: " . $e->getMessage());
            error_log("MODEL PRODUTO UPDATE - SQL: $sql");
            error_log("MODEL PRODUTO UPDATE - Parâmetros: " . json_encode([
                $data['codigo'],
                $data['descricao'],
                $data['status'] ?? 'ativo',
                $data['tempo_garantia'] ?? 12,
                $data['preco'] ?? 0,
                $ativo,
                $id
            ]));
            throw $e;
        }
    }

    public function delete($id)
    {
        return $this->db->query("DELETE FROM produtos WHERE id = ?", [$id]);
    }

    public function softDelete($id)
    {
        return $this->db->query("UPDATE produtos SET ativo = 'f' WHERE id = ?", [$id]);
    }

    public function hasOrdensServico($id)
    {
        $result = $this->db->fetch("SELECT COUNT(*) as count FROM ordens_servico WHERE produto_id = ?", [$id]);
        return $result['count'] > 0;
    }
}
