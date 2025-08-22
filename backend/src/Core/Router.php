<?php

namespace App\Core;

class Router
{
    private $routes = [];

    public function get($path, $handler)
    {
        $this->routes['GET'][$path] = $handler;
    }

    public function post($path, $handler)
    {
        $this->routes['POST'][$path] = $handler;
    }

    public function put($path, $handler)
    {
        $this->routes['PUT'][$path] = $handler;
    }

    public function delete($path, $handler)
    {
        $this->routes['DELETE'][$path] = $handler;
    }

    public function options($path, $handler)
    {
        $this->routes['OPTIONS'][$path] = $handler;
    }

    public function handle()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $path = str_replace('/api', '', $path);

        if ($method === 'OPTIONS') {
            http_response_code(200);
            exit(0);
        }

        if (isset($this->routes[$method][$path])) {
            $handler = $this->routes[$method][$path];
            $this->executeHandler($handler);
            return;
        }

        foreach ($this->routes[$method] ?? [] as $route => $handler) {
            $pattern = $this->convertRouteToPattern($route);
            if (preg_match($pattern, $path, $matches)) {
                array_shift($matches); // Remove the full match
                $this->executeHandler($handler, $matches);
                return;
            }
        }

        $this->sendResponse(['error' => 'Rota não encontrada'], 404);
    }

    private function convertRouteToPattern($route)
    {
        // Convert :id to ([^/]+) for pattern matching
        $pattern = preg_replace('/:([^\/]+)/', '([^/]+)', $route);
        return '#^' . $pattern . '$#';
    }

    private function executeHandler($handler, $params = [])
    {
        // Verificar se há middleware definido
        if (is_array($handler) && isset($handler[2]) && is_callable($handler[2])) {
            // Executar middleware antes do handler
            $handler[2]();
        }

        if (is_array($handler)) {
            $controller = new $handler[0]();
            if (!empty($params)) {
                call_user_func_array([$controller, $handler[1]], $params);
            } else {
                $controller->{$handler[1]}();
            }
        } else {
            if (!empty($params)) {
                call_user_func_array($handler, $params);
            } else {
                $handler();
            }
        }
    }

    public function sendResponse($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
