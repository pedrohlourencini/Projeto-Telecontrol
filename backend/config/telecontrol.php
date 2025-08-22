<?php

/**
 * Configurações específicas do sistema Telecontrol
 *
 * Este arquivo contém configurações específicas do domínio
 * da empresa Telecontrol para o sistema de ordens de serviço
 */

return [
    // Configurações do sistema
    'system' => [
        'name' => 'Telecontrol - Sistema de Ordens de Serviço',
        'version' => '1.0.0',
        'company' => 'Telecontrol Ltda',
        'support_email' => 'suporte@telecontrol.com.br'
    ],

    // Configurações de negócio
    'business' => [
        // Status padrão para novos clientes
        'default_client_status' => 'ativo',

        // Status padrão para novos produtos
        'default_product_status' => 'ativo',

        // Status inicial para ordens de serviço
        'default_order_status' => 'pendente',

        // Status disponíveis para ordens
        'order_statuses' => [
            'pendente' => 'Pendente',
            'em_andamento' => 'Em Andamento',
            'concluida' => 'Concluída',
            'cancelada' => 'Cancelada'
        ],

        // Validações específicas
        'validations' => [
            'client_name_min_length' => 3,
            'client_name_max_length' => 100,
            'product_name_min_length' => 2,
            'product_name_max_length' => 80
        ]
    ],

    // Configurações de segurança
    'security' => [
        'jwt_expiration' => 3600, // 1 hora
        'password_min_length' => 6,
        'max_login_attempts' => 5,
        'lockout_duration' => 900 // 15 minutos
    ],

    // Configurações de paginação
    'pagination' => [
        'default_per_page' => 20,
        'max_per_page' => 100
    ],

    // Configurações de logs
    'logging' => [
        'enabled' => true,
        'level' => 'info',
        'prefix' => 'Telecontrol'
    ]
];
