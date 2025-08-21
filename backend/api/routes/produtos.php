<?php

use App\Controllers\ProdutoController;

$produtoController = new ProdutoController();

$router->get('/produtos', [$produtoController, 'index']);
$router->post('/produtos', [$produtoController, 'store']);
$router->put('/produtos/:id', [$produtoController, 'update']);
$router->delete('/produtos/:id', [$produtoController, 'destroy']);
