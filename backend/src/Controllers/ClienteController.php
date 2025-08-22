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

    public function show($id)
    {
        $cliente = $this->clienteModel->findById($id);
        if (!$cliente) {
            $this->sendResponse(['error' => 'Cliente não encontrado'], 404);
            return;
        }
        $this->sendResponse($cliente);
    }

    public function store()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        // Validações específicas do sistema Telecontrol
        if (empty(trim($data['nome']))) {
            $this->sendResponse(['error' => 'Nome do cliente é obrigatório'], 400);
            return;
        }

        if (empty($data['cpf_cnpj'])) {
            $this->sendResponse(['error' => 'CPF/CNPJ é obrigatório para cadastro no sistema'], 400);
            return;
        }

        if (!$this->clienteModel->validateCpfCnpj($data['cpf_cnpj'])) {
            $this->sendResponse(['error' => 'CPF/CNPJ informado não é válido'], 400);
            return;
        }

        // Verificar se já existe cliente com este documento
        $existingCliente = $this->clienteModel->findByCpfCnpj($data['cpf_cnpj']);
        if ($existingCliente) {
            $this->sendResponse(['error' => 'Já existe um cliente cadastrado com este CPF/CNPJ'], 400);
            return;
        }

        $id = $this->clienteModel->create($data);
        $this->sendResponse(['id' => $id, 'message' => 'Cliente cadastrado com sucesso no sistema Telecontrol']);
    }

    public function update($id)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Validações específicas do sistema Telecontrol
            if (empty(trim($data['nome']))) {
                $this->sendResponse(['error' => 'Nome do cliente é obrigatório'], 400);
                return;
            }

            if (empty($data['cpf_cnpj'])) {
                $this->sendResponse(['error' => 'CPF/CNPJ é obrigatório para atualização'], 400);
                return;
            }

            if (!$this->clienteModel->validateCpfCnpj($data['cpf_cnpj'])) {
                $this->sendResponse(['error' => 'CPF/CNPJ informado não é válido'], 400);
                return;
            }

            // Verificar se o CPF/CNPJ já existe em outro cliente
            $existingCliente = $this->clienteModel->findByCpfCnpj($data['cpf_cnpj']);
            if ($existingCliente && $existingCliente['id'] != $id) {
                $this->sendResponse(['error' => 'CPF/CNPJ já está cadastrado para outro cliente'], 400);
                return;
            }

            // Processar campo ativo conforme padrão Telecontrol
            if (isset($data['ativo'])) {
                $data['ativo'] = (bool)$data['ativo'];
            }

            $this->clienteModel->update($id, $data);
            $this->sendResponse(['message' => 'Dados do cliente atualizados com sucesso']);

        } catch (\Exception $e) {
            error_log("Telecontrol - Erro ao atualizar cliente ID $id: " . $e->getMessage());
            $this->sendResponse(['error' => 'Erro interno do sistema: ' . $e->getMessage()], 500);
        }
    }

    public function validateCpfCnpj()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['cpf_cnpj'])) {
            $this->sendResponse(['error' => 'CPF/CNPJ é obrigatório'], 400);
            return;
        }

        $isValid = $this->clienteModel->validateCpfCnpj($data['cpf_cnpj']);
        $this->sendResponse(['valid' => $isValid]);
    }

    public function destroy($id)
    {
        try {
            $cliente = $this->clienteModel->findById($id);

            if (!$cliente) {
                $this->sendResponse(['error' => 'Cliente não encontrado no sistema'], 404);
                return;
            }

            // Verificar se o cliente possui ordens de serviço ativas
            if ($this->clienteModel->hasOrdensServico($id)) {
                $this->sendResponse([
                    'error' => 'Operação não permitida',
                    'message' => 'Este cliente possui ordens de serviço ativas no sistema. Para remoção, todas as ordens devem estar canceladas.'
                ], 400);
                return;
            }

            // Exclusão física do cliente
            $this->clienteModel->delete($id);
            $this->sendResponse(['message' => 'Cliente removido do sistema Telecontrol']);

        } catch (\Exception $e) {
            // Fallback para soft delete em caso de erro de integridade
            if (strpos($e->getMessage(), 'foreign key constraint') !== false ||
                strpos($e->getMessage(), 'violates foreign key constraint') !== false) {
                $this->clienteModel->softDelete($id);
                $this->sendResponse(['message' => 'Cliente inativado (possui histórico de ordens de serviço)']);
            } else {
                error_log("Telecontrol - Erro ao remover cliente ID $id: " . $e->getMessage());
                $this->sendResponse(['error' => 'Erro interno do sistema: ' . $e->getMessage()], 500);
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
