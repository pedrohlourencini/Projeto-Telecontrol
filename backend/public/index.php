<?php
require_once __DIR__ . '/../vendor/autoload.php';

// Set error handling to return JSON
set_error_handler(function($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) {
        return;
    }
    throw new ErrorException($message, 0, $severity, $file, $line);
});

// Set exception handler to return JSON
set_exception_handler(function($exception) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Erro interno do servidor',
        'message' => $exception->getMessage(),
        'file' => $exception->getFile(),
        'line' => $exception->getLine()
    ]);
    exit;
});

use App\Core\Router;
use App\Core\Database;

// Initialize database
Database::getInstance();

// Create router
$router = new Router();

// API Routes
require_once __DIR__ . '/../api/routes/auth.php';
require_once __DIR__ . '/../api/routes/clientes.php';
require_once __DIR__ . '/../api/routes/produtos.php';
require_once __DIR__ . '/../api/routes/ordens.php';
require_once __DIR__ . '/../api/routes/usuarios.php';

// Handle request
$router->handle();
