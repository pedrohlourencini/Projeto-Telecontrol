<?php

namespace App\Models;

use App\Core\Database;

class Cliente
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function findAll()
    {
        // Lista todos os clientes ordenados por nome para facilitar busca
        return $this->db->fetchAll("
            SELECT
                id,
                nome,
                cpf_cnpj,
                endereco,
                telefone,
                email,
                CASE
                    WHEN ativo = 't' THEN 'ativo'
                    ELSE 'inativo'
                END as status_display,
                ativo,
                created_at,
                updated_at
            FROM clientes
            ORDER BY nome
        ");
    }

    public function findById($id)
    {
        return $this->db->fetch("SELECT * FROM clientes WHERE id = ?", [$id]);
    }

    public function findByCpfCnpj($cpf_cnpj)
    {
        return $this->db->fetch("SELECT * FROM clientes WHERE cpf_cnpj = ?", [$cpf_cnpj]);
    }

    public function create($data)
    {
        $sql = "INSERT INTO clientes (nome, cpf_cnpj, endereco, telefone, email, ativo) VALUES (?, ?, ?, ?, ?, ?)";

        // Padrão: clientes são ativos por padrão no sistema Telecontrol
        $ativo = isset($data['ativo']) ? ($data['ativo'] ? 't' : 'f') : 't';

        $this->db->query($sql, [
            trim($data['nome']),
            preg_replace('/[^0-9]/', '', $data['cpf_cnpj']),
            trim($data['endereco'] ?? ''),
            trim($data['telefone'] ?? ''),
            trim(strtolower($data['email'] ?? '')),
            $ativo
        ]);
        return $this->db->lastInsertId();
    }

    public function update($id, $data)
    {
        $sql = "UPDATE clientes SET nome = ?, cpf_cnpj = ?, endereco = ?, telefone = ?, email = ?, ativo = ? WHERE id = ?";

        // Padrão Telecontrol: clientes ativos por padrão
        $ativo = isset($data['ativo']) ? ($data['ativo'] ? 't' : 'f') : 't';

        try {
            $result = $this->db->query($sql, [
                trim($data['nome']),
                preg_replace('/[^0-9]/', '', $data['cpf_cnpj']),
                trim($data['endereco'] ?? ''),
                trim($data['telefone'] ?? ''),
                trim(strtolower($data['email'] ?? '')),
                $ativo,
                $id
            ]);

            return $result;

        } catch (\Exception $e) {
            // Log específico para Telecontrol
            error_log("Telecontrol - Erro ao atualizar cliente ID $id: " . $e->getMessage());
            throw $e;
        }
    }

    public function delete($id)
    {
        return $this->db->query("DELETE FROM clientes WHERE id = ?", [$id]);
    }

    public function softDelete($id)
    {
        return $this->db->query("UPDATE clientes SET ativo = 'f' WHERE id = ?", [$id]);
    }

    public function hasOrdensServico($id)
    {
        // Verifica se o cliente possui ordens de serviço ativas no sistema Telecontrol
        $result = $this->db->fetch("SELECT COUNT(*) as count FROM ordens_servico WHERE cliente_id = ? AND status != 'cancelada'", [$id]);
        return $result['count'] > 0;
    }

    public function validateCpfCnpj($cpf_cnpj)
    {
        // Remove caracteres não numéricos para validação
        $cpf_cnpj = preg_replace('/[^0-9]/', '', $cpf_cnpj);

        // Valida CPF (11 dígitos) ou CNPJ (14 dígitos)
        if (strlen($cpf_cnpj) == 11) {
            return $this->validateCpf($cpf_cnpj);
        } elseif (strlen($cpf_cnpj) == 14) {
            return $this->validateCnpj($cpf_cnpj);
        }
        return false;
    }

    private function validateCpf($cpf)
    {
        // Verificar se todos os dígitos são iguais
        if (preg_match('/^(\d)\1{10}$/', $cpf)) {
            return false;
        }

        // Calcular primeiro dígito verificador
        $sum = 0;
        for ($i = 0; $i < 9; $i++) {
            $sum += $cpf[$i] * (10 - $i);
        }
        $remainder = $sum % 11;
        $digit1 = ($remainder < 2) ? 0 : 11 - $remainder;

        // Calcular segundo dígito verificador
        $sum = 0;
        for ($i = 0; $i < 10; $i++) {
            $sum += $cpf[$i] * (11 - $i);
        }
        $remainder = $sum % 11;
        $digit2 = ($remainder < 2) ? 0 : 11 - $remainder;

        // Verificar se os dígitos calculados são iguais aos fornecidos
        return ($cpf[9] == $digit1 && $cpf[10] == $digit2);
    }

    private function validateCnpj($cnpj)
    {
        // Verificar se todos os dígitos são iguais
        if (preg_match('/^(\d)\1{13}$/', $cnpj)) {
            return false;
        }

        // Calcular primeiro dígito verificador
        $weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        $sum = 0;
        for ($i = 0; $i < 12; $i++) {
            $sum += $cnpj[$i] * $weights[$i];
        }
        $remainder = $sum % 11;
        $digit1 = ($remainder < 2) ? 0 : 11 - $remainder;

        // Calcular segundo dígito verificador
        $weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        $sum = 0;
        for ($i = 0; $i < 13; $i++) {
            $sum += $cnpj[$i] * $weights[$i];
        }
        $remainder = $sum % 11;
        $digit2 = ($remainder < 2) ? 0 : 11 - $remainder;

        // Verificar se os dígitos calculados são iguais aos fornecidos
        return ($cnpj[12] == $digit1 && $cnpj[13] == $digit2);
    }
}
