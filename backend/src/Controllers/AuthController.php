<?php

namespace App\Controllers;

use App\Models\Usuario;
use Firebase\JWT\JWT;

class AuthController
{
    private $usuarioModel;

    public function __construct()
    {
        $this->usuarioModel = new Usuario();
    }

    public function login()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['email']) || !isset($data['password'])) {
            $this->sendResponse(['error' => 'Email e senha são obrigatórios'], 400);
            return;
        }

        // Log para debug
        error_log("Tentativa de login para email: " . $data['email']);

        $user = $this->usuarioModel->verifyPassword($data['email'], $data['password']);

        // Log para debug
        if ($user) {
            error_log("Usuário encontrado: " . $user['nome'] . " - Role: " . $user['role'] . " - Ativo: " . $user['ativo']);
        } else {
            error_log("Usuário não encontrado ou senha incorreta para: " . $data['email']);
        }

        if (!$user) {
            $this->sendResponse(['error' => 'Email ou senha inválidos'], 401);
            return;
        }

        // Verificar se o usuário está ativo
        if (!$user['ativo']) {
            error_log("Usuário inativo: " . $user['nome'] . " - Ativo: " . $user['ativo']);
            $this->sendResponse(['error' => 'Usuário inativo'], 401);
            return;
        }

        $config = require __DIR__ . '/../../config/config.php';
        $token = JWT::encode([
            'id' => $user['id'],
            'nome' => $user['nome'],
            'email' => $user['email'],
            'role' => $user['role'],
            'iat' => time(),
            'exp' => time() + $config['jwt']['expiration']
        ], $config['jwt']['secret'], 'HS256');

        $this->sendResponse([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'nome' => $user['nome'],
                'email' => $user['email'],
                'role' => $user['role']
            ]
        ]);
    }

    public function me()
    {
        $user = $GLOBALS['currentUser'];
        $userData = $this->usuarioModel->findById($user->id);

        if (!$userData) {
            $this->sendResponse(['error' => 'Usuário não encontrado'], 404);
            return;
        }

        $this->sendResponse($userData);
    }

    public function logout()
    {
        $this->sendResponse(['message' => 'Logout realizado com sucesso']);
    }

    public function changePassword()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $user = $GLOBALS['currentUser'];

        // Validação dos dados
        if (!isset($data['currentPassword']) || !isset($data['newPassword'])) {
            $this->sendResponse(['error' => 'Senha atual e nova senha são obrigatórias'], 400);
            return;
        }

        if (strlen($data['newPassword']) < 6) {
            $this->sendResponse(['error' => 'A nova senha deve ter pelo menos 6 caracteres'], 400);
            return;
        }

        // Tentar alterar a senha
        $result = $this->usuarioModel->changePassword(
            $user->id,
            $data['currentPassword'],
            $data['newPassword']
        );

        if ($result['success']) {
            $this->sendResponse(['message' => $result['message']]);
        } else {
            $this->sendResponse(['error' => $result['message']], 400);
        }
    }

    private function sendResponse($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
