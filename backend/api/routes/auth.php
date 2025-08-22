<?php

use App\Controllers\AuthController;
use App\Core\AuthMiddleware;

$authController = new AuthController();

// Rotas públicas
$router->post('/auth/login', [$authController, 'login']);
$router->post('/auth/logout', [$authController, 'logout']);

// Rotas protegidas (requerem autenticação)
$router->get('/auth/me', [$authController, 'me', [AuthMiddleware::class, 'authenticate']]);
$router->post('/auth/change-password', [$authController, 'changePassword', [AuthMiddleware::class, 'authenticate']]);
