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
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Log para debug
            error_log("UPDATE PRODUTO - ID: $id");
            error_log("UPDATE PRODUTO - Dados recebidos: " . json_encode($data));
            error_log("UPDATE PRODUTO - Campo ativo: " . (isset($data['ativo']) ? $data['ativo'] : 'não definido') . " - Tipo: " . (isset($data['ativo']) ? gettype($data['ativo']) : 'não definido'));

            if (empty($data['codigo']) || empty($data['descricao'])) {
                $this->sendResponse(['error' => 'Código e descrição são obrigatórios'], 400);
                return;
            }

            // Garantir que o campo ativo seja um boolean válido
            if (isset($data['ativo'])) {
                $data['ativo'] = (bool)$data['ativo'];
                error_log("UPDATE PRODUTO - Campo ativo processado: " . ($data['ativo'] ? 'true' : 'false'));
            }

            $this->produtoModel->update($id, $data);
            $this->sendResponse(['message' => 'Produto atualizado com sucesso']);

        } catch (\Exception $e) {
            error_log("UPDATE PRODUTO - Erro: " . $e->getMessage());
            error_log("UPDATE PRODUTO - Stack trace: " . $e->getTraceAsString());
            $this->sendResponse(['error' => 'Erro interno do servidor: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Primeiro, verificar se o produto está inativo
            $produto = $this->produtoModel->findById($id);

            if (!$produto) {
                $this->sendResponse(['error' => 'Produto não encontrado'], 404);
                return;
            }

            // Se o produto está inativo, verificar se tem ordens de serviço
            if (!$produto['ativo']) {
                if ($this->produtoModel->hasOrdensServico($id)) {
                    $this->sendResponse([
                        'error' => 'Não é possível excluir este produto',
                        'message' => 'O produto está inativo e possui ordens de serviço vinculadas. A exclusão não é permitida.'
                    ], 400);
                    return;
                }
            }

            // Tentar exclusão física
            $this->produtoModel->delete($id);
            $this->sendResponse(['message' => 'Produto removido com sucesso']);

        } catch (\Exception $e) {
            // Se houver erro de integridade referencial, fazer soft delete
            if (strpos($e->getMessage(), 'foreign key constraint') !== false ||
                strpos($e->getMessage(), 'violates foreign key constraint') !== false) {
                $this->produtoModel->softDelete($id);
                $this->sendResponse(['message' => 'Produto inativado com sucesso (possui ordens de serviço vinculadas)']);
            } else {
                $this->sendResponse(['error' => 'Erro ao remover produto: ' . $e->getMessage()], 500);
            }
        }
    }

    private function sendResponse($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
