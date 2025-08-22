<?php

use App\Controllers\ProdutoController;
use App\Core\AuthMiddleware;

$produtoController = new ProdutoController();

$router->get('/produtos', [$produtoController, 'index', [AuthMiddleware::class, 'authenticate']]);
$router->post('/produtos', [$produtoController, 'store', [AuthMiddleware::class, 'authenticate']]);
$router->put('/produtos/:id', [$produtoController, 'update', [AuthMiddleware::class, 'authenticate']]);
$router->delete('/produtos/:id', [$produtoController, 'destroy', [AuthMiddleware::class, 'authenticate']]);
