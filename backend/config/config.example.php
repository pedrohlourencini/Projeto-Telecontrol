<?php

return [
    'database' => [
        'host' => $_ENV['DB_HOST'] ?? 'localhost',
        'port' => $_ENV['DB_PORT'] ?? 5432,
        'name' => $_ENV['DB_NAME'] ?? 'telecontrol_db',
        'user' => $_ENV['DB_USER'] ?? 'telecontrol_user',
        'pass' => $_ENV['DB_PASS'] ?? 'telecontrol_pass'
    ],
    'jwt' => [
        'secret' => $_ENV['JWT_SECRET'] ?? 'your-secret-key',
        'expiration' => 3600 // 1 hora
    ],
    'app' => [
        'name' => 'Telecontrol OS',
        'version' => '1.0.0',
        'debug' => $_ENV['APP_DEBUG'] ?? false
    ]
];
