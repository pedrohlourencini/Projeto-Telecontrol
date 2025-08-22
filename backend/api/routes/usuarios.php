<?php

use App\Controllers\UsuarioController;
use App\Core\AuthMiddleware;

$usuarioController = new UsuarioController();

// Todas as rotas de usuários requerem autenticação e permissão de admin
$router->get('/usuarios', [$usuarioController, 'index', [AuthMiddleware::class, 'authenticate']]);
$router->get('/usuarios/:id', [$usuarioController, 'show', [AuthMiddleware::class, 'authenticate']]);
$router->post('/usuarios', [$usuarioController, 'store', [AuthMiddleware::class, 'authenticate']]);
$router->put('/usuarios/:id', [$usuarioController, 'update', [AuthMiddleware::class, 'authenticate']]);
$router->delete('/usuarios/:id', [$usuarioController, 'destroy', [AuthMiddleware::class, 'authenticate']]);
