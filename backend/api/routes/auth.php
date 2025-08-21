<?php

use App\Controllers\AuthController;
use App\Middleware\AuthMiddleware;

$authController = new AuthController();

// Rotas públicas
$router->post('/auth/login', [$authController, 'login']);

// Rotas protegidas
$router->get('/auth/me', [$authController, 'me'], [new AuthMiddleware()]);
$router->post('/auth/logout', [$authController, 'logout'], [new AuthMiddleware()]);
