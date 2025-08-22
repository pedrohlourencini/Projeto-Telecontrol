<?php

namespace App\Controllers;

use App\Models\Usuario;

class UsuarioController
{
    private $usuarioModel;

    public function __construct()
    {
        $this->usuarioModel = new Usuario();
    }

    public function index()
    {
        // Verificar se o usuário atual é admin
        $currentUser = $GLOBALS['currentUser'];
        if ($currentUser->role !== 'admin') {
            $this->sendResponse(['error' => 'Acesso negado. Apenas administradores podem gerenciar usuários.'], 403);
            return;
        }

        $usuarios = $this->usuarioModel->findAll();
        $this->sendResponse($usuarios);
    }

    public function show($id)
    {
        // Verificar se o usuário atual é admin
        $currentUser = $GLOBALS['currentUser'];
        if ($currentUser->role !== 'admin') {
            $this->sendResponse(['error' => 'Acesso negado. Apenas administradores podem visualizar usuários.'], 403);
            return;
        }

        $usuario = $this->usuarioModel->findById($id);
        if (!$usuario) {
            $this->sendResponse(['error' => 'Usuário não encontrado'], 404);
            return;
        }

        $this->sendResponse($usuario);
    }

    public function store()
    {
        // Verificar se o usuário atual é admin
        $currentUser = $GLOBALS['currentUser'];
        if ($currentUser->role !== 'admin') {
            $this->sendResponse(['error' => 'Acesso negado. Apenas administradores podem criar usuários.'], 403);
            return;
        }

        $data = json_decode(file_get_contents('php://input'), true);

        // Validações
        if (empty($data['nome']) || empty($data['email']) || empty($data['senha'])) {
            $this->sendResponse(['error' => 'Nome, email e senha são obrigatórios'], 400);
            return;
        }

        if (strlen($data['senha']) < 6) {
            $this->sendResponse(['error' => 'A senha deve ter pelo menos 6 caracteres'], 400);
            return;
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->sendResponse(['error' => 'Email inválido'], 400);
            return;
        }

        // Verificar se o email já existe
        if ($this->usuarioModel->findByEmail($data['email'])) {
            $this->sendResponse(['error' => 'Este email já está em uso'], 400);
            return;
        }

        // Validar role
        $allowedRoles = ['admin', 'usuario'];
        if (!in_array($data['role'], $allowedRoles)) {
            $this->sendResponse(['error' => 'Perfil inválido'], 400);
            return;
        }

        try {
            $id = $this->usuarioModel->create($data);
            $this->sendResponse(['id' => $id, 'message' => 'Usuário criado com sucesso']);
        } catch (\Exception $e) {
            error_log("Erro ao criar usuário: " . $e->getMessage());
            $this->sendResponse(['error' => 'Erro interno do servidor'], 500);
        }
    }

    public function update($id)
    {
        // Verificar se o usuário atual é admin
        $currentUser = $GLOBALS['currentUser'];
        if ($currentUser->role !== 'admin') {
            $this->sendResponse(['error' => 'Acesso negado. Apenas administradores podem editar usuários.'], 403);
            return;
        }

        $data = json_decode(file_get_contents('php://input'), true);

        // Log para debug
        error_log("=== ATUALIZANDO USUÁRIO ===");
        error_log("ID: " . $id);
        error_log("Dados recebidos: " . json_encode($data));
        error_log("Senha presente: " . (isset($data['senha']) && !empty($data['senha']) ? 'SIM' : 'NÃO'));

        // Verificar se o usuário existe
        $existingUser = $this->usuarioModel->findById($id);
        if (!$existingUser) {
            $this->sendResponse(['error' => 'Usuário não encontrado'], 404);
            return;
        }

        // Validações
        if (empty($data['nome']) || empty($data['email'])) {
            $this->sendResponse(['error' => 'Nome e email são obrigatórios'], 400);
            return;
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->sendResponse(['error' => 'Email inválido'], 400);
            return;
        }

        // Verificar se o email já existe (exceto para o usuário atual)
        $userWithEmail = $this->usuarioModel->findByEmail($data['email']);
        if ($userWithEmail && $userWithEmail['id'] != $id) {
            $this->sendResponse(['error' => 'Este email já está em uso'], 400);
            return;
        }

        // Validar role
        $allowedRoles = ['admin', 'usuario'];
        if (!in_array($data['role'], $allowedRoles)) {
            $this->sendResponse(['error' => 'Perfil inválido'], 400);
            return;
        }

        // Não permitir que o usuário se desative a si mesmo
        if ($currentUser->id == $id && isset($data['ativo']) && !$data['ativo']) {
            $this->sendResponse(['error' => 'Você não pode desativar sua própria conta'], 400);
            return;
        }

        try {
            $this->usuarioModel->update($id, $data);
            $this->sendResponse(['message' => 'Usuário atualizado com sucesso']);
        } catch (\Exception $e) {
            error_log("Erro ao atualizar usuário: " . $e->getMessage());
            $this->sendResponse(['error' => 'Erro interno do servidor'], 500);
        }
    }

    public function destroy($id)
    {
        // Verificar se o usuário atual é admin
        $currentUser = $GLOBALS['currentUser'];
        if ($currentUser->role !== 'admin') {
            $this->sendResponse(['error' => 'Acesso negado. Apenas administradores podem excluir usuários.'], 403);
            return;
        }

        // Não permitir que o usuário se exclua a si mesmo
        if ($currentUser->id == $id) {
            $this->sendResponse(['error' => 'Você não pode excluir sua própria conta'], 400);
            return;
        }

        // Verificar se o usuário existe
        $existingUser = $this->usuarioModel->findById($id);
        if (!$existingUser) {
            $this->sendResponse(['error' => 'Usuário não encontrado'], 404);
            return;
        }

        try {
            $this->usuarioModel->delete($id);
            $this->sendResponse(['message' => 'Usuário excluído com sucesso']);
        } catch (\Exception $e) {
            error_log("Erro ao excluir usuário: " . $e->getMessage());
            $this->sendResponse(['error' => 'Erro interno do servidor'], 500);
        }
    }

    private function sendResponse($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
