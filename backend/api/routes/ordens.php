<?php

use App\Controllers\OrdemController;
use App\Core\AuthMiddleware;

$ordemController = new OrdemController();

$router->get('/ordens', [$ordemController, 'index', [AuthMiddleware::class, 'authenticate']]);
$router->post('/ordens', [$ordemController, 'store', [AuthMiddleware::class, 'authenticate']]);
$router->put('/ordens/:id', [$ordemController, 'update', [AuthMiddleware::class, 'authenticate']]);
$router->delete('/ordens/:id', [$ordemController, 'destroy', [AuthMiddleware::class, 'authenticate']]);
