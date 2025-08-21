<?php

use App\Controllers\ClienteController;

$clienteController = new ClienteController();

$router->get('/clientes', [$clienteController, 'index']);
$router->post('/clientes', [$clienteController, 'store']);
$router->put('/clientes/:id', [$clienteController, 'update']);
$router->delete('/clientes/:id', [$clienteController, 'destroy']);
