<?php

namespace App\Controllers;

use App\Models\OrdemServico;
use App\Models\Cliente;

class OrdemController
{
    private $ordemModel;
    private $clienteModel;

    public function __construct()
    {
        $this->ordemModel = new OrdemServico();
        $this->clienteModel = new Cliente();
    }

    public function index()
    {
        $ordens = $this->ordemModel->findAll();
        $this->sendResponse($ordens);
    }

    public function store()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['cliente_id']) || empty($data['produto_id'])) {
            $this->sendResponse(['error' => 'Cliente e produto são obrigatórios'], 400);
            return;
        }

        $id = $this->ordemModel->create($data);
        $this->sendResponse(['id' => $id, 'message' => 'Ordem criada com sucesso']);
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['cliente_id']) || empty($data['produto_id'])) {
            $this->sendResponse(['error' => 'Cliente e produto são obrigatórios'], 400);
            return;
        }

        $this->ordemModel->update($id, $data);
        $this->sendResponse(['message' => 'Ordem atualizada com sucesso']);
    }

    public function destroy($id)
    {
        $this->ordemModel->delete($id);
        $this->sendResponse(['message' => 'Ordem cancelada com sucesso']);
    }

    private function sendResponse($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
