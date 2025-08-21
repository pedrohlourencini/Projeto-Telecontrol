<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\Router;
use App\Core\Database;

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Initialize database
Database::getInstance();

// Create router
$router = new Router();

// API Routes
require_once __DIR__ . '/../api/routes/auth.php';
require_once __DIR__ . '/../api/routes/clientes.php';
require_once __DIR__ . '/../api/routes/produtos.php';
require_once __DIR__ . '/../api/routes/ordens.php';

// Handle request
$router->handle();
