<?php

use App\Controllers\OrdemController;

$ordemController = new OrdemController();

$router->get('/ordens', [$ordemController, 'index']);
$router->post('/ordens', [$ordemController, 'store']);
$router->put('/ordens/:id', [$ordemController, 'update']);
$router->delete('/ordens/:id', [$ordemController, 'destroy']);
