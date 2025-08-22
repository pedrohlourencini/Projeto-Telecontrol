<?php

use App\Controllers\ClienteController;
use App\Core\AuthMiddleware;

$clienteController = new ClienteController();

$router->get('/clientes', [$clienteController, 'index', [AuthMiddleware::class, 'authenticate']]);
$router->get('/clientes/:id', [$clienteController, 'show', [AuthMiddleware::class, 'authenticate']]);
$router->post('/clientes', [$clienteController, 'store', [AuthMiddleware::class, 'authenticate']]);
$router->put('/clientes/:id', [$clienteController, 'update', [AuthMiddleware::class, 'authenticate']]);
$router->delete('/clientes/:id', [$clienteController, 'destroy', [AuthMiddleware::class, 'authenticate']]);
$router->post('/clientes/validate-cpf-cnpj', [$clienteController, 'validateCpfCnpj', [AuthMiddleware::class, 'authenticate']]);
