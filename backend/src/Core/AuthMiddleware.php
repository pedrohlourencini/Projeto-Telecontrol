<?php

namespace App\Core;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\Usuario;

class AuthMiddleware
{
    public static function authenticate()
    {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            http_response_code(401);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Token de autenticação não fornecido']);
            exit;
        }

        $token = substr($authHeader, 7); // Remove 'Bearer ' prefix

        try {
            $config = require __DIR__ . '/../../config/config.php';
            $decoded = JWT::decode($token, new Key($config['jwt']['secret'], 'HS256'));

            // Verificar se o usuário ainda existe e está ativo
            $usuarioModel = new Usuario();
            $user = $usuarioModel->findById($decoded->id);

            if (!$user || !$user['ativo']) {
                http_response_code(401);
                header('Content-Type: application/json');
                echo json_encode(['error' => 'Usuário não encontrado ou inativo']);
                exit;
            }

            // Definir o usuário atual globalmente
            $GLOBALS['currentUser'] = (object) [
                'id' => $user['id'],
                'nome' => $user['nome'],
                'email' => $user['email'],
                'role' => $user['role']
            ];

        } catch (\Exception $e) {
            http_response_code(401);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Token inválido']);
            exit;
        }
    }
}
