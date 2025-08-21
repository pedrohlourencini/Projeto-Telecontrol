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

        $user = $this->usuarioModel->verifyPassword($data['email'], $data['password']);

        if (!$user) {
            $this->sendResponse(['error' => 'Email ou senha inválidos'], 401);
            return;
        }

        if (!$user['ativo']) {
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
        // Em uma implementação real, você poderia invalidar o token
        // Por simplicidade, apenas retornamos sucesso
        $this->sendResponse(['message' => 'Logout realizado com sucesso']);
    }

    private function sendResponse($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
