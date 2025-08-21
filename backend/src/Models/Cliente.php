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
        return $this->db->fetchAll("SELECT * FROM clientes WHERE ativo = true ORDER BY nome");
    }

    public function findById($id)
    {
        return $this->db->fetch("SELECT * FROM clientes WHERE id = ?", [$id]);
    }

    public function findByCpf($cpf)
    {
        return $this->db->fetch("SELECT * FROM clientes WHERE cpf = ?", [$cpf]);
    }

    public function create($data)
    {
        $sql = "INSERT INTO clientes (nome, cpf, endereco, telefone, email) VALUES (?, ?, ?, ?, ?)";
        $this->db->query($sql, [
            $data['nome'],
            $data['cpf'],
            $data['endereco'] ?? '',
            $data['telefone'] ?? '',
            $data['email'] ?? ''
        ]);
        return $this->db->lastInsertId();
    }

    public function update($id, $data)
    {
        $sql = "UPDATE clientes SET nome = ?, cpf = ?, endereco = ?, telefone = ?, email = ? WHERE id = ?";
        return $this->db->query($sql, [
            $data['nome'],
            $data['cpf'],
            $data['endereco'] ?? '',
            $data['telefone'] ?? '',
            $data['email'] ?? '',
            $id
        ]);
    }

    public function delete($id)
    {
        return $this->db->query("UPDATE clientes SET ativo = false WHERE id = ?", [$id]);
    }

    public function validateCpf($cpf)
    {
        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        if (strlen($cpf) != 11 || preg_match('/^(\d)\1+$/', $cpf)) {
            return false;
        }

        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) {
                return false;
            }
        }
        return true;
    }
}
