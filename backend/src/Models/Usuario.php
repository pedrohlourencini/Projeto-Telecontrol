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
            "SELECT id, nome, email, role, ativo, created_at, updated_at FROM usuarios WHERE id = ?",
            [$id]
        );
    }

    public function findAll()
    {
        return $this->db->fetchAll(
            "SELECT id, nome, email, role, ativo, created_at, updated_at FROM usuarios ORDER BY nome"
        );
    }

    public function create($data)
    {
        $sql = "INSERT INTO usuarios (nome, email, senha, role, ativo) VALUES (?, ?, ?, ?, ?)";
        $this->db->query($sql, [
            $data['nome'],
            $data['email'],
            password_hash($data['senha'], PASSWORD_DEFAULT),
            $data['role'] ?? 'usuario',
            isset($data['ativo']) ? ($data['ativo'] ? true : false) : true
        ]);

        return $this->db->lastInsertId();
    }

    public function update($id, $data)
    {
        // Log para debug
        error_log("=== MODELO USUARIO UPDATE ===");
        error_log("ID: " . $id);
        error_log("Dados: " . json_encode($data));
        error_log("Senha presente: " . (isset($data['senha']) && !empty($data['senha']) ? 'SIM' : 'NÃO'));

        // Verificar se há senha para atualizar
        if (isset($data['senha']) && !empty($data['senha'])) {
            error_log("Atualizando COM senha");
            $sql = "UPDATE usuarios SET nome = ?, email = ?, senha = ?, role = ?, ativo = ? WHERE id = ?";

            // Garantir que o valor ativo seja um boolean válido
            $ativo = isset($data['ativo']) ? ($data['ativo'] ? true : false) : true;

            // Hash da nova senha
            $senhaHash = password_hash($data['senha'], PASSWORD_DEFAULT);
            error_log("Senha hash gerada: " . substr($senhaHash, 0, 20) . "...");

            $result = $this->db->query($sql, [
                $data['nome'],
                $data['email'],
                $senhaHash,
                $data['role'],
                $ativo,
                $id
            ]);

            error_log("Resultado da atualização com senha: " . ($result ? 'SUCESSO' : 'ERRO'));
            return $result;
        } else {
            error_log("Atualizando SEM senha");
            // Atualização sem senha
            $sql = "UPDATE usuarios SET nome = ?, email = ?, role = ?, ativo = ? WHERE id = ?";

            // Garantir que o valor ativo seja um boolean válido
            $ativo = isset($data['ativo']) ? ($data['ativo'] ? true : false) : true;

            $result = $this->db->query($sql, [
                $data['nome'],
                $data['email'],
                $data['role'],
                $ativo,
                $id
            ]);

            error_log("Resultado da atualização sem senha: " . ($result ? 'SUCESSO' : 'ERRO'));
            return $result;
        }
    }

    public function delete($id)
    {
        return $this->db->query("DELETE FROM usuarios WHERE id = ?", [$id]);
    }

    public function verifyPassword($email, $password)
    {
        $user = $this->findByEmail($email);
        if ($user && password_verify($password, $user['senha'])) {
            return $user;
        }
        return false;
    }

    public function changePassword($id, $currentPassword, $newPassword)
    {
        // Primeiro, verificar se a senha atual está correta
        $user = $this->findById($id);
        if (!$user) {
            return ['success' => false, 'message' => 'Usuário não encontrado'];
        }

        // Buscar a senha atual do usuário
        $userWithPassword = $this->db->fetch(
            "SELECT id, senha FROM usuarios WHERE id = ?",
            [$id]
        );

        if (!$userWithPassword) {
            return ['success' => false, 'message' => 'Usuário não encontrado'];
        }

        // Verificar se a senha atual está correta
        if (!password_verify($currentPassword, $userWithPassword['senha'])) {
            return ['success' => false, 'message' => 'Senha atual incorreta'];
        }

        // Atualizar a senha
        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $sql = "UPDATE usuarios SET senha = ? WHERE id = ?";

        try {
            $this->db->query($sql, [$hashedNewPassword, $id]);
            return ['success' => true, 'message' => 'Senha alterada com sucesso'];
        } catch (\Exception $e) {
            error_log("Erro ao alterar senha: " . $e->getMessage());
            return ['success' => false, 'message' => 'Erro ao alterar senha'];
        }
    }
}
