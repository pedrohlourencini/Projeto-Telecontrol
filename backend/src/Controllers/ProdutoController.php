<?php

namespace App\Controllers;

use App\Models\Produto;

class ProdutoController
{
    private $produtoModel;

    public function __construct()
    {
        $this->produtoModel = new Produto();
    }

    public function index()
    {
        $produtos = $this->produtoModel->findAll();
        $this->sendResponse($produtos);
    }

    public function store()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['codigo']) || empty($data['descricao'])) {
            $this->sendResponse(['error' => 'Código e descrição são obrigatórios'], 400);
            return;
        }

        $id = $this->produtoModel->create($data);
        $this->sendResponse(['id' => $id, 'message' => 'Produto criado com sucesso']);
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['codigo']) || empty($data['descricao'])) {
            $this->sendResponse(['error' => 'Código e descrição são obrigatórios'], 400);
            return;
        }

        $this->produtoModel->update($id, $data);
        $this->sendResponse(['message' => 'Produto atualizado com sucesso']);
    }

    public function destroy($id)
    {
        $this->produtoModel->delete($id);
        $this->sendResponse(['message' => 'Produto removido com sucesso']);
    }

    private function sendResponse($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
