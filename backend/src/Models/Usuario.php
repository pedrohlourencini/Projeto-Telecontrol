<?php

namespace App\Models;

use App\Core\Database;

class Usuario
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function findByEmail($email)
    {
        return $this->db->fetch(
            "SELECT * FROM usuarios WHERE email = ? AND ativo = true",
            [$email]
        );
    }

    public function findById($id)
    {
        return $this->db->fetch(
            "SELECT id, nome, email, role, ativo FROM usuarios WHERE id = ?",
            [$id]
        );
    }

    public function create($data)
    {
        $sql = "INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)";
        $this->db->query($sql, [
            $data['nome'],
            $data['email'],
            password_hash($data['senha'], PASSWORD_DEFAULT),
            $data['role'] ?? 'usuario'
        ]);

        return $this->db->lastInsertId();
    }

    public function update($id, $data)
    {
        $sql = "UPDATE usuarios SET nome = ?, email = ?, role = ? WHERE id = ?";
        return $this->db->query($sql, [
            $data['nome'],
            $data['email'],
            $data['role'],
            $id
        ]);
    }

    public function verifyPassword($email, $password)
    {
        $user = $this->findByEmail($email);
        if ($user && password_verify($password, $user['senha'])) {
            return $user;
        }
        return false;
    }
}
