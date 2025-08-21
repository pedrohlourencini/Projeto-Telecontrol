<?php

namespace App\Controllers;

use App\Models\Cliente;

class ClienteController
{
    private $clienteModel;

    public function __construct()
    {
        $this->clienteModel = new Cliente();
    }

    public function index()
    {
        $clientes = $this->clienteModel->findAll();
        $this->sendResponse($clientes);
    }

    public function store()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['nome']) || empty($data['cpf'])) {
            $this->sendResponse(['error' => 'Nome e CPF são obrigatórios'], 400);
            return;
        }

        if (!$this->clienteModel->validateCpf($data['cpf'])) {
            $this->sendResponse(['error' => 'CPF inválido'], 400);
            return;
        }

        $existingCliente = $this->clienteModel->findByCpf($data['cpf']);
        if ($existingCliente) {
            $this->sendResponse(['error' => 'CPF já cadastrado'], 400);
            return;
        }

        $id = $this->clienteModel->create($data);
        $this->sendResponse(['id' => $id, 'message' => 'Cliente criado com sucesso']);
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['nome']) || empty($data['cpf'])) {
            $this->sendResponse(['error' => 'Nome e CPF são obrigatórios'], 400);
            return;
        }

        if (!$this->clienteModel->validateCpf($data['cpf'])) {
            $this->sendResponse(['error' => 'CPF inválido'], 400);
            return;
        }

        $this->clienteModel->update($id, $data);
        $this->sendResponse(['message' => 'Cliente atualizado com sucesso']);
    }

    public function destroy($id)
    {
        $this->clienteModel->delete($id);
        $this->sendResponse(['message' => 'Cliente removido com sucesso']);
    }

    private function sendResponse($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
