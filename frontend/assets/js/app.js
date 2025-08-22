// Configuração da API
const API_BASE_URL = 'http://localhost:8000/api';

// Funções de validação de CPF/CNPJ
function validateCpfCnpj(cpfCnpj) {
    const clean = cpfCnpj.replace(/\D/g, '');

    if (clean.length === 11) {
        return validateCpf(clean);
    } else if (clean.length === 14) {
        return validateCnpj(clean);
    }
    return false;
}

function validateCpf(cpf) {
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Calcular primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;

    // Calcular segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;

    // Verificar se os dígitos calculados são iguais aos fornecidos
    return parseInt(cpf[9]) === digit1 && parseInt(cpf[10]) === digit2;
}

function validateCnpj(cnpj) {
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    // Calcular primeiro dígito verificador
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj[i]) * weights1[i];
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;

    // Calcular segundo dígito verificador
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj[i]) * weights2[i];
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;

    // Verificar se os dígitos calculados são iguais aos fornecidos
    return parseInt(cnpj[12]) === digit1 && parseInt(cnpj[13]) === digit2;
}

function formatCpfCnpj(value) {
    const clean = value.replace(/\D/g, '');

    if (clean.length <= 11) {
        // Formatar como CPF: 000.000.000-00
        return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (clean.length <= 14) {
        // Formatar como CNPJ: 00.000.000/0000-00
        return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return clean;
}

// Funções de validação de CPF/CNPJ
function validateCpfCnpj(cpfCnpj) {
    const clean = cpfCnpj.replace(/\D/g, '');

    if (clean.length === 11) {
        return validateCpf(clean);
    } else if (clean.length === 14) {
        return validateCnpj(clean);
    }
    return false;
}

function validateCpf(cpf) {
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Calcular primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;

    // Calcular segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;

    // Verificar se os dígitos calculados são iguais aos fornecidos
    return parseInt(cpf[9]) === digit1 && parseInt(cpf[10]) === digit2;
}

function validateCnpj(cnpj) {
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    // Calcular primeiro dígito verificador
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj[i]) * weights1[i];
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;

    // Calcular segundo dígito verificador
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj[i]) * weights2[i];
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;

    // Verificar se os dígitos calculados são iguais aos fornecidos
    return parseInt(cnpj[12]) === digit1 && parseInt(cnpj[13]) === digit2;
}

function formatCpfCnpj(value) {
    const clean = value.replace(/\D/g, '');

    if (clean.length <= 11) {
        // Formatar como CPF: 000.000.000-00
        return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (clean.length <= 14) {
        // Formatar como CNPJ: 00.000.000/0000-00
        return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return clean;
}

// Funções de API
const api = {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Adicionar token de autenticação se disponível
        if (auth.token) {
            headers['Authorization'] = `Bearer ${auth.token}`;
        }

        const config = {
            headers,
            ...options
        };

        try {
            const response = await fetch(url, config);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro na requisição');
            }

            return data;
        } catch (error) {
            console.error('❌ Erro na API:', error);
            throw error;
        }
    },

    // Auth
    async login(email, password) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        return response;
    },

    // Clientes
    async getClientes() {
        return this.request('/clientes');
    },

    async createCliente(data) {
        return this.request('/clientes', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async updateCliente(id, data) {
        return this.request(`/clientes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async deleteCliente(id) {
        return this.request(`/clientes/${id}`, {
            method: 'DELETE'
        });
    },

    async validateCpfCnpj(cpfCnpj) {
        return this.request('/clientes/validate-cpf-cnpj', {
            method: 'POST',
            body: JSON.stringify({ cpf_cnpj: cpfCnpj })
        });
    },

    // Produtos
    async getProdutos() {
        return this.request('/produtos');
    },

    async createProduto(data) {
        return this.request('/produtos', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async updateProduto(id, data) {
        return this.request(`/produtos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async deleteProduto(id) {
        return this.request(`/produtos/${id}`, {
            method: 'DELETE'
        });
    },

    // Ordens
    async getOrdens() {
        return this.request('/ordens');
    },

    async createOrdem(data) {
        return this.request('/ordens', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async updateOrdem(id, data) {
        return this.request(`/ordens/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async deleteOrdem(id) {
        return this.request(`/ordens/${id}`, {
            method: 'DELETE'
        });
    },

    // Auth - Alterar senha
    async changePassword(currentPassword, newPassword) {
        return this.request('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });
    },

    // Auth - Buscar dados do usuário logado
    async getMe() {
        return this.request('/auth/me');
    },

    // Usuários
    async getUsuarios() {
        return this.request('/usuarios');
    },

    async createUsuario(data) {
        return this.request('/usuarios', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async updateUsuario(id, data) {
        return this.request(`/usuarios/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async deleteUsuario(id) {
        return this.request(`/usuarios/${id}`, {
            method: 'DELETE'
        });
    }
};

// Funções de UI
const ui = {
    showLoading() {
        try {
            const spinner = document.getElementById('loadingSpinner');
            if (spinner) {
                spinner.classList.remove('d-none');
            } else {
                console.error('Elemento loadingSpinner não encontrado');
            }
        } catch (error) {
            console.error('Erro ao mostrar loading:', error);
        }
    },

    hideLoading() {
        try {
            const spinner = document.getElementById('loadingSpinner');
            if (spinner) {
                spinner.classList.add('d-none');
            } else {
                console.error('Elemento loadingSpinner não encontrado');
            }
        } catch (error) {
            console.error('Erro ao esconder loading:', error);
        }
    },

    showToast(message, type = 'success') {
        try {
            const toast = document.getElementById('toast');
            const toastBody = document.getElementById('toastBody');

            if (!toast || !toastBody) {
                console.error('Elementos toast não encontrados');
                alert(message);
                return;
            }

            toastBody.textContent = message;
            toast.classList.remove('bg-success', 'bg-danger', 'bg-warning');
            toast.classList.add(`bg-${type}`);

            if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
                const bsToast = new bootstrap.Toast(toast);
                bsToast.show();
            } else {
                console.error('Bootstrap não está disponível');
                alert(message);
            }
        } catch (error) {
            console.error('Erro ao mostrar toast:', error);
            alert(message);
        }
    },

        loadPage(page) {
        // Verificar se o usuário está autenticado (exceto para páginas públicas)
        if (!auth.isAuthenticated() && page !== 'login') {
            ui.showToast('Faça login para acessar esta página', 'warning');
            return;
        }

        // Verificar se o elemento content existe
        const contentElement = document.getElementById('content');
        if (!contentElement) {
            console.error('Elemento content não encontrado!');
            alert('Erro: Elemento content não encontrado');
            return;
        }

        // Mostrar loading
        try {
            ui.showLoading();
        } catch (error) {
            console.error('Erro ao mostrar loading:', error);
        }

        // Fazer a requisição

        // Verificar se fetch está disponível
        if (typeof fetch === 'undefined') {
            console.error('Fetch não está disponível, usando XMLHttpRequest');
            // Fallback para XMLHttpRequest
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `pages/${page}.html`, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    contentElement.innerHTML = xhr.responseText;
                    ui.hideLoading();
                } else {
                    console.error('XMLHttpRequest: Erro', xhr.status);
                    contentElement.innerHTML = `<div class="alert alert-danger">Erro ${xhr.status}: ${xhr.statusText}</div>`;
                    ui.hideLoading();
                }
            };
            xhr.onerror = function() {
                console.error('XMLHttpRequest: Erro de rede');
                contentElement.innerHTML = `<div class="alert alert-danger">Erro de rede</div>`;
                ui.hideLoading();
            };
            xhr.send();
            return;
        }

        fetch(`pages/${page}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                // Atualizar o conteúdo
                contentElement.innerHTML = html;

                // Esconder loading
                try {
                    ui.hideLoading();
                } catch (error) {
                    console.error('Erro ao esconder loading:', error);
                }

                // Executar função de inicialização se existir
                const initFunctionName = `init${page.charAt(0).toUpperCase() + page.slice(1)}`;

                if (window[initFunctionName] && typeof window[initFunctionName] === 'function') {
                    try {
                        window[initFunctionName]();
                    } catch (error) {
                        console.error(`Erro ao executar ${initFunctionName}:`, error);
                    }
                }
            })
            .catch(error => {
                console.error('=== ERRO AO CARREGAR PÁGINA ===');
                console.error('Erro:', error);
                console.error('Mensagem:', error.message);
                console.error('Stack:', error.stack);

                // Esconder loading
                try {
                    ui.hideLoading();
                } catch (hideError) {
                    console.error('Erro ao esconder loading:', hideError);
                }

                // Mostrar erro
                try {
                    ui.showToast(`Erro ao carregar página: ${error.message}`, 'danger');
                } catch (toastError) {
                    console.error('Erro ao mostrar toast:', toastError);
                    alert(`Erro ao carregar página: ${error.message}`);
                }

                // Mostrar conteúdo de erro
                contentElement.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Erro ao carregar a página</h4>
                        <p>Não foi possível carregar a página "${page}".</p>
                        <hr>
                        <p class="mb-0">Detalhes do erro: ${error.message}</p>
                        <button class="btn btn-primary mt-2" onclick="location.reload()">Recarregar Página</button>
                    </div>
                `;
            });
    }
};

// Autenticação
const auth = {
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),

    isAuthenticated() {
        try {
            const hasToken = !!this.token;
            return hasToken;
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            return false;
        }
    },

    login(email, password) {
        return api.login(email, password)
            .then(data => {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                return data;
            });
    },

            logout() {
        // Limpar dados de autenticação
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Aplicar classe para login
        document.body.classList.remove('dashboard-page');
        document.body.classList.add('login-page');

        // Esconder elementos do menu
        const userDropdown = document.getElementById('userDropdown');
        const usuariosMenuItem = document.getElementById('usuariosMenuItem');
        const navbarNav = document.getElementById('navbarNav');
        const loginForm = document.getElementById('loginForm');

        if (userDropdown) {
            userDropdown.style.display = 'none';
        }
        if (usuariosMenuItem) {
            usuariosMenuItem.style.display = 'none';
        }
        if (navbarNav) {
            navbarNav.style.display = 'none';
        }
        if (loginForm) {
            loginForm.style.display = 'block';
        }

        // Limpar conteúdo da página
        const content = document.getElementById('content');
        if (content) {
            content.innerHTML = '';
            content.appendChild(loginForm);
        }

        // Mostrar mensagem de sucesso
        ui.showToast('Logout realizado com sucesso', 'success');

                // Forçar re-inicialização da aplicação sem reload
        setTimeout(() => {
            // Garantir que as classes CSS estão corretas
            document.body.classList.remove('dashboard-page');
            document.body.classList.add('login-page');

            // Esconder navbar completamente
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.display = 'none';
            }

            // Mostrar formulário de login
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.style.display = 'flex';
                loginForm.style.alignItems = 'center';
                loginForm.style.justifyContent = 'center';
                loginForm.style.minHeight = '100vh';
                loginForm.style.width = '100%';
            }

            // Limpar conteúdo da página
            const content = document.getElementById('content');
            if (content) {
                content.innerHTML = '';
                if (loginForm) {
                    content.appendChild(loginForm);
                }
            }



        }, 100);
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Verificar se os elementos necessários existem
        const loginForm = document.getElementById('loginForm');
        const loginFormElement = document.getElementById('loginFormElement');
        const userName = document.getElementById('userName');

        // Verificar autenticação
        if (auth.isAuthenticated()) {
            // Aplicar classe para dashboard
            document.body.classList.remove('login-page');
            document.body.classList.add('dashboard-page');

            // Esconder formulário de login
            if (loginForm) {
                loginForm.style.display = 'none';
            }

            // Atualizar nome do usuário
            if (userName) {
                userName.textContent = auth.user?.nome || 'Usuário';
            }

            // Mostrar navegação principal
            const navbarNav = document.getElementById('navbarNav');
            if (navbarNav) {
                navbarNav.style.display = 'block';
                navbarNav.style.visibility = 'visible';
                navbarNav.style.opacity = '1';
            } else {
                console.error('Elemento navbarNav não encontrado');
            }

            // Mostrar dropdown do usuário
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown) {
                userDropdown.style.display = 'block';
                userDropdown.style.visibility = 'visible';
                userDropdown.style.opacity = '1';
            } else {
                console.error('Elemento userDropdown não encontrado');
            }

            // Mostrar menu de usuários apenas para administradores
            const usuariosMenuItem = document.getElementById('usuariosMenuItem');
            if (usuariosMenuItem && auth.user?.role === 'admin') {
                usuariosMenuItem.style.display = 'block';
                usuariosMenuItem.style.visibility = 'visible';
                usuariosMenuItem.style.opacity = '1';
            } else if (usuariosMenuItem) {
                usuariosMenuItem.style.display = 'none';
            }

            // Debug dos elementos
            debugElements();

            // Carregar dashboard
            ui.loadPage('dashboard');

        } else {

            // Aplicar classe para login
            document.body.classList.remove('dashboard-page');
            document.body.classList.add('login-page');

            // Mostrar formulário de login
            if (loginForm) loginForm.style.display = 'block';

            // Esconder navegação principal
            const navbarNav = document.getElementById('navbarNav');
            if (navbarNav) {
                navbarNav.style.display = 'none';
            }

            // Esconder dropdown do usuário
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown) {
                userDropdown.style.display = 'none';
            }

            // Esconder menu de usuários
            const usuariosMenuItem = document.getElementById('usuariosMenuItem');
            if (usuariosMenuItem) {
                usuariosMenuItem.style.display = 'none';
            }

            // Limpar conteúdo da página
            const content = document.getElementById('content');
            if (content) {
                content.innerHTML = '';
                // Reinserir formulário de login
                content.appendChild(loginForm);
            }
        }

        // Event listeners
        if (loginFormElement) {
            loginFormElement.addEventListener('submit', function(e) {
                e.preventDefault();

                const email = document.getElementById('email')?.value;
                const password = document.getElementById('password')?.value;

                if (!email || !password) {
                    ui.showToast('Email e senha são obrigatórios', 'danger');
                    return;
                }

                ui.showLoading();
                auth.login(email, password)
                    .then(() => {
                        ui.hideLoading();
                        ui.showToast('Login realizado com sucesso!');
                        window.location.reload();
                    })
                    .catch(error => {
                        ui.hideLoading();
                        ui.showToast(error.message, 'danger');
                    });
            });
        } else {
            console.error('Elemento loginFormElement não encontrado');
        }

    } catch (error) {
        console.error('Erro na inicialização:', error);
    }
});

// Funções globais
window.loadPage = ui.loadPage;
window.logout = auth.logout;
window.api = api;
window.ui = ui;

// Teste de disponibilidade das funções



// Funções específicas das páginas
window.openClienteModal = function() {
    // Verificar se a página de clientes está carregada
    if (!isClientesPageLoaded()) {
        ui.showToast('Erro: Página de clientes não está carregada', 'danger');
        return;
    }

    // Aguardar elementos do modal estarem disponíveis
    const elementIds = ['clienteModal', 'clienteModalTitle', 'clienteForm', 'clienteId', 'clienteStatus'];

    // Aguardar elementos e então abrir o modal
    waitForModalElements(elementIds)
        .then(elements => {
            elements.clienteModalTitle.textContent = 'Novo Cliente';
            elements.clienteForm.reset();
            elements.clienteId.value = '';
            elements.clienteStatus.value = 'true'; // Por padrão, novos clientes são ativos

            // Adicionar formatação automática ao campo CPF/CNPJ
            const cpfCnpjField = document.getElementById('clienteCpfCnpj');
            if (cpfCnpjField) {
                cpfCnpjField.addEventListener('input', function(e) {
                    const value = e.target.value;
                    const formatted = formatCpfCnpj(value);
                    e.target.value = formatted;

                    // Validar em tempo real
                    const isValid = validateCpfCnpj(formatted);
                    if (formatted.length > 0) {
                        if (isValid) {
                            e.target.classList.remove('is-invalid');
                            e.target.classList.add('is-valid');
                        } else {
                            e.target.classList.remove('is-valid');
                            e.target.classList.add('is-invalid');
                        }
                    } else {
                        e.target.classList.remove('is-valid', 'is-invalid');
                    }
                });
            }

            new bootstrap.Modal(elements.clienteModal).show();
        })
        .catch(error => {
            ui.showToast('Erro ao carregar modal: ' + error.message, 'danger');
        });
};

window.saveCliente = function() {
    // Verificar se a página de clientes está carregada
    if (!isClientesPageLoaded()) {
        ui.showToast('Erro: Página de clientes não está carregada', 'danger');
        return;
    }

    // Verificar se todos os elementos existem
    const clienteNome = document.getElementById('clienteNome');
    const clienteCpfCnpj = document.getElementById('clienteCpfCnpj');
    const clienteEndereco = document.getElementById('clienteEndereco');
    const clienteTelefone = document.getElementById('clienteTelefone');
    const clienteEmail = document.getElementById('clienteEmail');
    const clienteStatus = document.getElementById('clienteStatus');

    if (!clienteNome || !clienteCpfCnpj || !clienteEndereco || !clienteTelefone || !clienteEmail || !clienteStatus) {
        ui.showToast('Erro: Elementos do formulário não encontrados', 'danger');
        return;
    }

    const formData = {
        nome: clienteNome.value,
        cpf_cnpj: clienteCpfCnpj.value,
        endereco: clienteEndereco.value,
        telefone: clienteTelefone.value,
        email: clienteEmail.value,
        ativo: clienteStatus.value === 'true'
    };


    const id = document.getElementById('clienteId').value;

    // Validação básica
    if (!formData.nome || !formData.cpf_cnpj) {
        ui.showToast('Nome e CPF/CNPJ são obrigatórios', 'danger');
        return;
    }

    // Validação de CPF/CNPJ
    if (!validateCpfCnpj(formData.cpf_cnpj)) {
        ui.showToast('CPF/CNPJ inválido', 'danger');
        return;
    }

    // Garantir que o status seja um valor booleano
    if (typeof formData.ativo !== 'boolean') {
        formData.ativo = formData.ativo === 'true' || formData.ativo === true;
    }

    ui.showLoading();

    if (id) {

        api.updateCliente(id, formData)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Cliente atualizado com sucesso!');
                bootstrap.Modal.getInstance(document.getElementById('clienteModal')).hide();
                loadClientes();
            })
            .catch(error => {
                ui.hideLoading();
                console.error('❌ Erro na atualização:', error);
                ui.showToast(error.message, 'danger');
            });
    } else {
        api.createCliente(formData)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Cliente criado com sucesso!');
                bootstrap.Modal.getInstance(document.getElementById('clienteModal')).hide();
                loadClientes();
            })
            .catch(error => {
                ui.hideLoading();
                ui.showToast(error.message, 'danger');
            });
    }
};

window.loadClientes = function() {
    ui.showLoading();
    api.getClientes()
        .then(clientes => {
            // Armazenar dados globalmente
            window.clientesData = clientes;

            const tbody = document.getElementById('clientesTableBody');
            tbody.innerHTML = '';

            clientes.forEach(cliente => {
                // Determinar se o cliente está ativo baseado em diferentes campos possíveis
                const isAtivo = cliente.ativo === true ||
                               cliente.ativo === 't' ||
                               cliente.status_display === 'ativo' ||
                               (cliente.status_display !== 'inativo' && cliente.ativo !== false && cliente.ativo !== 'f');

                const statusBadge = isAtivo
                    ? '<span class="badge bg-success">Ativo</span>'
                    : '<span class="badge bg-secondary">Inativo</span>';

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.cpf_cnpj}</td>
                    <td>${cliente.telefone || '-'}</td>
                    <td>${cliente.email || '-'}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editCliente(${cliente.id})" title="Editar cliente">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteCliente(${cliente.id})" title="Excluir cliente">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            ui.hideLoading();
        })
        .catch(error => {
            ui.hideLoading();
            ui.showToast('Erro ao carregar clientes: ' + error.message, 'danger');
        });
};

window.editCliente = function(id) {

    // Debug: verificar todos os elementos da página
    debugClientesPage();

    // Verificar se a página de clientes está carregada
    if (!isClientesPageLoaded()) {
        console.error('❌ Página de clientes não está carregada');
        ui.showToast('Erro: Página de clientes não está carregada', 'danger');
        return;
    }

    // Verificar se o elemento clienteStatus existe especificamente
    const clienteStatusElement = document.getElementById('clienteStatus');
    if (!clienteStatusElement) {
        console.error('❌ Elemento clienteStatus não encontrado. Tentando abordagem alternativa...');

        // Em vez de recarregar a página, tentar uma abordagem mais direta
        // Verificar se o modal existe e criar o elemento se necessário
        const modal = document.getElementById('clienteModal');
        if (modal) {

            // Criar o elemento clienteStatus dinamicamente
            const tempStatusSelect = document.createElement('select');
            tempStatusSelect.id = 'clienteStatus';
            tempStatusSelect.className = 'form-select';
            tempStatusSelect.innerHTML = `
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
            `;

            // Adicionar label e container
            const statusContainer = document.createElement('div');
            statusContainer.className = 'mb-3';
            statusContainer.innerHTML = `
                <label for="clienteStatus" class="form-label">Status</label>
            `;
            statusContainer.appendChild(tempStatusSelect);

            // Adicionar texto explicativo
            const helpText = document.createElement('div');
            helpText.className = 'form-text';
            helpText.textContent = 'Defina se o cliente está ativo ou inativo no sistema';
            statusContainer.appendChild(helpText);

            // Adicionar ao formulário
            const form = document.getElementById('clienteForm');
            if (form) {
                form.appendChild(statusContainer);
            } else {
                console.error('❌ Formulário não encontrado');
                ui.showToast('Erro: Formulário não encontrado', 'danger');
                return;
            }
        } else {
            console.error('❌ Modal não encontrado');
            ui.showToast('Erro: Modal de cliente não encontrado', 'danger');
            return;
        }
    }


    ui.showLoading();
    api.getClientes()
        .then(clientes => {
            const cliente = clientes.find(c => c.id == id);
            if (!cliente) {
                throw new Error('Cliente não encontrado');
            }


            // Tentar acessar elementos diretamente primeiro
            const modal = document.getElementById('clienteModal');
            const modalTitle = document.getElementById('clienteModalTitle');
            const clienteId = document.getElementById('clienteId');
            const clienteNome = document.getElementById('clienteNome');
            const clienteCpfCnpj = document.getElementById('clienteCpfCnpj');
            const clienteEndereco = document.getElementById('clienteEndereco');
            const clienteTelefone = document.getElementById('clienteTelefone');
            const clienteEmail = document.getElementById('clienteEmail');
            const clienteStatus = document.getElementById('clienteStatus');

            // Verificar se o modal existe
            if (!modal) {
                console.error('❌ Modal não encontrado');
                ui.showToast('Erro: Modal de cliente não encontrado', 'danger');
                ui.hideLoading();
                return;
            }


            // Preencher os dados dos elementos que existem
            if (modalTitle) modalTitle.textContent = 'Editar Cliente';
            if (clienteId) clienteId.value = cliente.id;
            if (clienteNome) clienteNome.value = cliente.nome;
            if (clienteCpfCnpj) clienteCpfCnpj.value = cliente.cpf_cnpj;
            if (clienteEndereco) clienteEndereco.value = cliente.endereco || '';
            if (clienteTelefone) clienteTelefone.value = cliente.telefone || '';
            if (clienteEmail) clienteEmail.value = cliente.email || '';

            // Para o status, usar o elemento que foi criado dinamicamente se necessário
            const statusElement = document.getElementById('clienteStatus');
            if (statusElement) {
                const isAtivo = cliente.ativo === true ||
                               cliente.ativo === 't' ||
                               cliente.status_display === 'ativo' ||
                               (cliente.status_display !== 'inativo' && cliente.ativo !== false && cliente.ativo !== 'f');
                statusElement.value = isAtivo ? 'true' : 'false';
            } else {
                console.warn('⚠️ Elemento clienteStatus ainda não encontrado após criação dinâmica');
            }

            // Adicionar formatação automática ao campo CPF/CNPJ na edição
            if (clienteCpfCnpj) {
                // Remover event listeners anteriores para evitar duplicação
                const newCpfCnpjField = clienteCpfCnpj.cloneNode(true);
                clienteCpfCnpj.parentNode.replaceChild(newCpfCnpjField, clienteCpfCnpj);

                newCpfCnpjField.addEventListener('input', function(e) {
                    const value = e.target.value;
                    const formatted = formatCpfCnpj(value);
                    e.target.value = formatted;

                    // Validar em tempo real
                    const isValid = validateCpfCnpj(formatted);
                    if (formatted.length > 0) {
                        if (isValid) {
                            e.target.classList.remove('is-invalid');
                            e.target.classList.add('is-valid');
                        } else {
                            e.target.classList.remove('is-valid');
                            e.target.classList.add('is-invalid');
                        }
                    } else {
                        e.target.classList.remove('is-valid', 'is-invalid');
                    }
                });
            }

            // Abrir o modal
            new bootstrap.Modal(modal).show();
            ui.hideLoading();

        })
        .catch(error => {
            ui.hideLoading();
            console.error('❌ Erro ao buscar cliente:', error);
            ui.showToast('Erro ao carregar dados do cliente: ' + error.message, 'danger');
        });
};

window.deleteCliente = function(id) {
    const cliente = window.clientesData?.find(c => c.id == id);
    const nome = cliente ? cliente.nome : 'este cliente';

    if (confirm(`Tem certeza que deseja remover ${nome}?\n\nEsta ação não pode ser desfeita.`)) {
        ui.showLoading();
        api.deleteCliente(id)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Cliente removido com sucesso!');
                loadClientes();
            })
            .catch(error => {
                ui.hideLoading();
                ui.showToast(error.message, 'danger');
            });
    }
};

// Funções para Produtos
window.openProdutoModal = function() {
    document.getElementById('produtoModalTitle').textContent = 'Novo Produto';
    document.getElementById('produtoForm').reset();
    document.getElementById('produtoId').value = '';
    document.getElementById('produtoStatus').value = 'ativo'; // Por padrão, novos produtos são ativos
    new bootstrap.Modal(document.getElementById('produtoModal')).show();
};

window.saveProduto = function() {
    const formData = {
        codigo: document.getElementById('produtoCodigo').value,
        descricao: document.getElementById('produtoDescricao').value,
        status: document.getElementById('produtoStatus').value,
        tempo_garantia: parseInt(document.getElementById('produtoGarantia').value) || 12,
        preco: parseFloat(document.getElementById('produtoPreco').value) || 0,
        ativo: document.getElementById('produtoStatus').value === 'ativo'
    };


    const id = document.getElementById('produtoId').value;

    // Validação básica
    if (!formData.codigo || !formData.descricao) {
        ui.showToast('Código e descrição são obrigatórios', 'danger');
        return;
    }

    ui.showLoading();

    if (id) {

        api.updateProduto(id, formData)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Produto atualizado com sucesso!');
                bootstrap.Modal.getInstance(document.getElementById('produtoModal')).hide();
                loadProdutos();
            })
            .catch(error => {
                ui.hideLoading();
                console.error('❌ Erro na atualização do produto:', error);
                ui.showToast(error.message, 'danger');
            });
    } else {
        api.createProduto(formData)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Produto criado com sucesso!');
                bootstrap.Modal.getInstance(document.getElementById('produtoModal')).hide();
                loadProdutos();
            })
            .catch(error => {
                ui.hideLoading();
                ui.showToast(error.message, 'danger');
            });
    }
};

window.loadProdutos = function() {
    ui.showLoading();
    api.getProdutos()
        .then(produtos => {
            // Armazenar dados globalmente
            window.produtosData = produtos;

            const tbody = document.getElementById('produtosTableBody');
            tbody.innerHTML = '';

            produtos.forEach(produto => {
                const row = document.createElement('tr');

                // Determinar se o produto está ativo baseado em diferentes campos possíveis
                const isAtivo = produto.ativo === true ||
                               produto.ativo === 't' ||
                               produto.status_display === 'ativo' ||
                               (produto.status_display !== 'inativo' && produto.ativo !== false && produto.ativo !== 'f');
                const statusBadge = isAtivo
                    ? '<span class="badge bg-success">Ativo</span>'
                    : '<span class="badge bg-secondary">Inativo</span>';

                row.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.codigo}</td>
                    <td>${produto.descricao}</td>
                    <td>${statusBadge}</td>
                    <td>${produto.tempo_garantia} meses</td>
                    <td>${formatCurrency(produto.preco)}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editProduto(${produto.id})" title="Editar produto">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteProduto(${produto.id})" title="Excluir produto">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            ui.hideLoading();
        })
        .catch(error => {
            ui.hideLoading();
            ui.showToast('Erro ao carregar produtos: ' + error.message, 'danger');
        });
};

window.editProduto = function(id) {
    ui.showLoading();
    api.getProdutos()
        .then(produtos => {
            const produto = produtos.find(p => p.id == id);
            if (!produto) {
                throw new Error('Produto não encontrado');
            }

            // Preencher o modal com os dados do produto
            document.getElementById('produtoModalTitle').textContent = 'Editar Produto';
            document.getElementById('produtoId').value = produto.id;
            document.getElementById('produtoCodigo').value = produto.codigo;
            document.getElementById('produtoDescricao').value = produto.descricao;

            // Determinar se o produto está ativo baseado em diferentes campos possíveis
            const isAtivo = produto.ativo === true ||
                           produto.ativo === 't' ||
                           produto.status_display === 'ativo' ||
                           (produto.status_display !== 'inativo' && produto.ativo !== false && produto.ativo !== 'f');
            document.getElementById('produtoStatus').value = isAtivo ? 'ativo' : 'inativo';

            document.getElementById('produtoGarantia').value = produto.tempo_garantia || 12;
            document.getElementById('produtoPreco').value = produto.preco || '';

            // Abrir o modal
            new bootstrap.Modal(document.getElementById('produtoModal')).show();
            ui.hideLoading();
        })
        .catch(error => {
            ui.hideLoading();
            ui.showToast('Erro ao carregar dados do produto: ' + error.message, 'danger');
        });
};

window.deleteProduto = function(id) {
    const produto = window.produtosData?.find(p => p.id == id);
    const descricao = produto ? produto.descricao : 'este produto';

    if (confirm(`Tem certeza que deseja remover ${descricao}?\n\nEsta ação não pode ser desfeita.`)) {
        ui.showLoading();
        api.deleteProduto(id)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Produto removido com sucesso!');
                loadProdutos();
            })
            .catch(error => {
                ui.hideLoading();
                ui.showToast(error.message, 'danger');
            });
    }
};

// Funções para Ordens
window.openOrdemModal = function() {
    document.getElementById('ordemModalTitle').textContent = 'Nova Ordem de Serviço';
    document.getElementById('ordemForm').reset();
    document.getElementById('ordemId').value = '';
    document.getElementById('ordemStatus').value = 'aberta'; // Por padrão, novas ordens são abertas
    document.getElementById('ordemPrioridade').value = 'normal'; // Por padrão, prioridade normal
    loadOrdemSelects();
    new bootstrap.Modal(document.getElementById('ordemModal')).show();
};

window.saveOrdem = function() {
    const formData = {
        cliente_id: parseInt(document.getElementById('ordemCliente').value),
        produto_id: parseInt(document.getElementById('ordemProduto').value),
        descricao_problema: document.getElementById('ordemDescricao').value,
        status: document.getElementById('ordemStatus').value,
        prioridade: document.getElementById('ordemPrioridade').value
    };

    const id = document.getElementById('ordemId').value;

    // Validação básica
    if (!formData.cliente_id || !formData.produto_id) {
        ui.showToast('Cliente e produto são obrigatórios', 'danger');
        return;
    }

    ui.showLoading();

    if (id) {
        api.updateOrdem(id, formData)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Ordem atualizada com sucesso!');
                bootstrap.Modal.getInstance(document.getElementById('ordemModal')).hide();
                loadOrdens();
            })
            .catch(error => {
                ui.hideLoading();
                ui.showToast(error.message, 'danger');
            });
    } else {
        api.createOrdem(formData)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Ordem criada com sucesso!');
                bootstrap.Modal.getInstance(document.getElementById('ordemModal')).hide();
                loadOrdens();
            })
            .catch(error => {
                ui.hideLoading();
                ui.showToast(error.message, 'danger');
            });
    }
};

window.loadOrdens = function() {
    ui.showLoading();
    api.getOrdens()
        .then(ordens => {
            // Armazenar dados globalmente
            window.ordensData = ordens;

            const tbody = document.getElementById('ordensTableBody');
            tbody.innerHTML = '';

            ordens.forEach(ordem => {
                const row = document.createElement('tr');
                // Mapeamento de cores para status
                const statusColors = {
                    'aberta': 'bg-warning',
                    'em_andamento': 'bg-info',
                    'concluida': 'bg-success',
                    'cancelada': 'bg-secondary'
                };

                const statusColor = statusColors[ordem.status] || 'bg-primary';
                const statusDisplay = {
                    'aberta': 'Aberta',
                    'em_andamento': 'Em Andamento',
                    'concluida': 'Concluída',
                    'cancelada': 'Cancelada'
                };

                row.innerHTML = `
                    <td>${ordem.numero}</td>
                    <td>${new Date(ordem.data_abertura).toLocaleDateString()}</td>
                    <td>${ordem.cliente_nome || 'N/A'}</td>
                    <td>${ordem.produto_descricao || 'N/A'}</td>
                    <td><span class="badge ${statusColor}">${statusDisplay[ordem.status] || ordem.status}</span></td>
                    <td><span class="badge bg-${ordem.prioridade === 'alta' ? 'danger' : ordem.prioridade === 'media' ? 'warning' : 'success'}">${ordem.prioridade}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editOrdem(${ordem.id})" title="Editar ordem">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteOrdem(${ordem.id})" title="Excluir ordem">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            ui.hideLoading();
        })
        .catch(error => {
            ui.hideLoading();
            ui.showToast('Erro ao carregar ordens: ' + error.message, 'danger');
        });
};

window.editOrdem = function(id) {
    ui.showLoading();
    Promise.all([
        api.getOrdens(),
        api.getClientes(),
        api.getProdutos()
    ]).then(([ordens, clientes, produtos]) => {
        const ordem = ordens.find(o => o.id == id);
        if (!ordem) {
            throw new Error('Ordem não encontrada');
        }

        // Preencher o modal com os dados da ordem
        document.getElementById('ordemModalTitle').textContent = 'Editar Ordem de Serviço';
        document.getElementById('ordemId').value = ordem.id;

        // Preencher select de clientes
        const clienteSelect = document.getElementById('ordemCliente');
        clienteSelect.innerHTML = '<option value="">Selecione um cliente</option>';
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nome;
            option.selected = cliente.id == ordem.cliente_id;
            clienteSelect.appendChild(option);
        });

        // Preencher select de produtos
        const produtoSelect = document.getElementById('ordemProduto');
        produtoSelect.innerHTML = '<option value="">Selecione um produto</option>';
        produtos.forEach(produto => {
            const option = document.createElement('option');
            option.value = produto.id;
            option.textContent = produto.descricao;
            option.selected = produto.id == ordem.produto_id;
            produtoSelect.appendChild(option);
        });

        document.getElementById('ordemDescricao').value = ordem.descricao_problema || '';
        document.getElementById('ordemStatus').value = ordem.status || 'aberta';
        document.getElementById('ordemPrioridade').value = ordem.prioridade || 'normal';

        // Abrir o modal
        new bootstrap.Modal(document.getElementById('ordemModal')).show();
        ui.hideLoading();
    }).catch(error => {
        ui.hideLoading();
        ui.showToast('Erro ao carregar dados da ordem: ' + error.message, 'danger');
    });
};

window.deleteOrdem = function(id) {
    const ordem = window.ordensData?.find(o => o.id == id);
    const numero = ordem ? ordem.numero : 'esta ordem';

    if (confirm(`Tem certeza que deseja remover a ordem ${numero}?\n\nEsta ação não pode ser desfeita.`)) {
        ui.showLoading();
        api.deleteOrdem(id)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Ordem removida com sucesso!');
                loadOrdens();
            })
            .catch(error => {
                ui.hideLoading();
                ui.showToast(error.message, 'danger');
            });
    }
};

// Funções de inicialização das páginas
window.initClientes = function() {
    loadClientes();

    // Adicionar event listeners para busca e filtro
    const searchInput = document.getElementById('clienteSearch');
    const statusFilter = document.getElementById('clienteStatusFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterClientes);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterClientes);
    }
};

window.initProdutos = function() {
    loadProdutos();

    // Adicionar event listeners para busca e filtro
    const searchInput = document.getElementById('produtoSearch');
    const statusFilter = document.getElementById('produtoStatusFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterProdutos);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterProdutos);
    }
};

window.initOrdens = function() {
    loadOrdens();
    loadOrdemSelects();

    // Adicionar event listeners para busca e filtro
    const searchInput = document.getElementById('ordemSearch');
    const statusFilter = document.getElementById('ordemStatusFilter');
    const prioridadeFilter = document.getElementById('ordemPrioridadeFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterOrdens);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterOrdens);
    }

    if (prioridadeFilter) {
        prioridadeFilter.addEventListener('change', filterOrdens);
    }
};

window.initPerfil = function() {

    // Carregar dados do usuário logado
    carregarDadosUsuario();

    // Carregar estatísticas do perfil
    Promise.all([
        api.getClientes(),
        api.getProdutos(),
        api.getOrdens()
    ]).then(([clientes, produtos, ordens]) => {
        document.getElementById('totalClientes').textContent = clientes.length;
        document.getElementById('totalProdutos').textContent = produtos.length;
        document.getElementById('totalOrdens').textContent = ordens.length;

        const ordensAbertas = ordens.filter(ordem => ordem.status === 'aberta').length;
        document.getElementById('ordensAbertas').textContent = ordensAbertas;
    }).catch(error => {
        console.error('Erro ao carregar estatísticas:', error);
    });

    // Adicionar event listener para o formulário de alteração de senha
    const senhaForm = document.getElementById('senhaForm');
    if (senhaForm) {
        senhaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alterarSenha();
        });
    }
};

// Função para carregar dados do usuário logado
window.carregarDadosUsuario = function() {

    // Verificar se o usuário está autenticado
    if (!auth.isAuthenticated()) {
        console.error('Usuário não autenticado');
        ui.showToast('Usuário não autenticado', 'danger');
        return;
    }


    // Preencher campos do formulário de perfil
    const perfilNome = document.getElementById('perfilNome');
    const perfilEmail = document.getElementById('perfilEmail');
    const perfilCargo = document.getElementById('perfilCargo');
    const perfilDataCadastro = document.getElementById('perfilDataCadastro');

    if (perfilNome && auth.user) {
        perfilNome.value = auth.user.nome || 'N/A';
    } else {
        console.error('Elemento perfilNome não encontrado ou usuário não autenticado');
    }

    if (perfilEmail && auth.user) {
        perfilEmail.value = auth.user.email || 'N/A';
    } else {
        console.error('Elemento perfilEmail não encontrado ou usuário não autenticado');
    }

    if (perfilCargo && auth.user) {
        // Mapear role para cargo
        const cargoMap = {
            'admin': 'Administrador do Sistema',
            'usuario': 'Usuário do Sistema'
        };
        perfilCargo.value = cargoMap[auth.user.role] || 'N/A';
    } else {
        console.error('Elemento perfilCargo não encontrado ou usuário não autenticado');
    }

    if (perfilDataCadastro && auth.user) {
        // Buscar dados completos do usuário via API
        api.getMe()
            .then(userData => {
                if (userData.created_at) {
                    const data = new Date(userData.created_at);
                    perfilDataCadastro.value = data.toLocaleDateString('pt-BR');
                } else {
                    perfilDataCadastro.value = 'N/A';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados completos do usuário:', error);
                perfilDataCadastro.value = 'N/A';
            });
    }
};

// Função para alterar senha
window.alterarSenha = function() {
    const senhaAtual = document.getElementById('senhaAtual').value;
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    // Validações
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
        ui.showToast('Todos os campos são obrigatórios', 'danger');
        return;
    }

    if (novaSenha.length < 6) {
        ui.showToast('A nova senha deve ter pelo menos 6 caracteres', 'danger');
        return;
    }

    if (novaSenha !== confirmarSenha) {
        ui.showToast('As senhas não coincidem', 'danger');
        return;
    }

    if (senhaAtual === novaSenha) {
        ui.showToast('A nova senha deve ser diferente da senha atual', 'danger');
        return;
    }

    ui.showLoading();

    api.changePassword(senhaAtual, novaSenha)
        .then(() => {
            ui.hideLoading();
            ui.showToast('Senha alterada com sucesso!');

            // Limpar formulário
            document.getElementById('senhaForm').reset();
        })
        .catch(error => {
            ui.hideLoading();
            ui.showToast(error.message, 'danger');
        });
};

// Função de inicialização do Dashboard
window.initDashboard = function() {

    try {
        // Verificar se os elementos existem
        const clientesCount = document.getElementById('clientesCount');
        const produtosCount = document.getElementById('produtosCount');
        const ordensCount = document.getElementById('ordensCount');

            clientesCount: !!clientesCount,
            produtosCount: !!produtosCount,
            ordensCount: !!ordensCount
        });

        if (!clientesCount || !produtosCount || !ordensCount) {
            console.error('Elementos do dashboard não encontrados');
            return;
        }

        // Carregar dados do dashboard
        Promise.all([
            api.getClientes(),
            api.getProdutos(),
            api.getOrdens()
        ]).then(([clientes, produtos, ordens]) => {
            // Atualizar contadores
            clientesCount.textContent = clientes.length;
            produtosCount.textContent = produtos.length;
            ordensCount.textContent = ordens.length;


            // Criar gráfico de status
            createStatusChart(ordens);

            // Carregar últimas ordens
            loadRecentOrders(ordens);


        }).catch(error => {
            console.error('❌ Erro ao carregar dados do dashboard:', error);
            console.error('Detalhes do erro:', {
                message: error.message,
                stack: error.stack
            });
            ui.showToast('Erro ao carregar dados do dashboard: ' + error.message, 'danger');
        });

    } catch (error) {
        console.error('❌ Erro na inicialização do dashboard:', error);
        ui.showToast('Erro na inicialização do dashboard: ' + error.message, 'danger');
    }
};

// Função para criar o gráfico de status
function createStatusChart(ordens) {
    const ctx = document.getElementById('statusChart');
    if (!ctx) {
        console.error('Elemento statusChart não encontrado');
        return;
    }

    // Contar ordens por status
    const statusCount = {};
    ordens.forEach(ordem => {
        statusCount[ordem.status] = (statusCount[ordem.status] || 0) + 1;
    });

    // Preparar dados para o gráfico
    const labels = Object.keys(statusCount);
    const data = Object.values(statusCount);
    const colors = {
        'aberta': '#007bff',
        'em_andamento': '#ffc107',
        'concluida': '#28a745',
        'cancelada': '#dc3545'
    };

    const backgroundColor = labels.map(status => colors[status] || '#6c757d');

    // Destruir gráfico existente se houver
    if (window.statusChartInstance) {
        window.statusChartInstance.destroy();
    }

    // Criar novo gráfico
    window.statusChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.map(status => status.charAt(0).toUpperCase() + status.slice(1)),
            datasets: [{
                data: data,
                backgroundColor: backgroundColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Função para carregar últimas ordens
function loadRecentOrders(ordens) {
    const recentOrdersContainer = document.getElementById('recentOrders');
    if (!recentOrdersContainer) {
        console.error('Elemento recentOrders não encontrado');
        return;
    }

    // Pegar as 5 últimas ordens
    const recentOrders = ordens.slice(0, 5);

    if (recentOrders.length === 0) {
        recentOrdersContainer.innerHTML = `
            <div class="text-center text-muted">
                <i class="bi bi-inbox fs-1"></i>
                <p>Nenhuma ordem encontrada</p>
            </div>
        `;
        return;
    }

    let html = '';
    recentOrders.forEach(ordem => {
        const statusBadge = getStatusBadge(ordem.status);
        const prioridadeBadge = getPrioridadeBadge(ordem.prioridade);
        const data = new Date(ordem.data_abertura).toLocaleDateString('pt-BR');

        html += `
            <div class="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom recent-order-item">
                <div>
                    <strong>${ordem.numero}</strong>
                    <br>
                    <small class="text-muted">${ordem.cliente_nome || 'Cliente não informado'}</small>
                </div>
                <div class="text-end">
                    ${statusBadge}
                    ${prioridadeBadge}
                    <br>
                    <small class="text-muted">${data}</small>
                </div>
            </div>
        `;
    });

    recentOrdersContainer.innerHTML = html;
}

// Função para gerar badge de status
function getStatusBadge(status) {
    const statusConfig = {
        'aberta': { class: 'bg-primary', text: 'Aberta' },
        'em_andamento': { class: 'bg-warning', text: 'Em Andamento' },
        'concluida': { class: 'bg-success', text: 'Concluída' },
        'cancelada': { class: 'bg-danger', text: 'Cancelada' }
    };

    const config = statusConfig[status] || { class: 'bg-secondary', text: status };
    return `<span class="badge ${config.class}">${config.text}</span>`;
}

// Função para gerar badge de prioridade
function getPrioridadeBadge(prioridade) {
    const prioridadeConfig = {
        'baixa': { class: 'bg-success', text: 'Baixa' },
        'normal': { class: 'bg-warning', text: 'Normal' },
        'alta': { class: 'bg-danger', text: 'Alta' }
    };

    const config = prioridadeConfig[prioridade] || { class: 'bg-secondary', text: prioridade };
    return `<span class="badge ${config.class} ms-1">${config.text}</span>`;
}

// Função para formatar valores monetários
function formatCurrency(value) {
    if (!value || value === 0) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Função para validar CPF/CNPJ
function validateCpfCnpj(value) {
    if (!value) return false;

    // Remove caracteres não numéricos
    const cleanValue = value.replace(/\D/g, '');

    // Valida CPF (11 dígitos)
    if (cleanValue.length === 11) {
        return validateCPF(cleanValue);
    }

    // Valida CNPJ (14 dígitos)
    if (cleanValue.length === 14) {
        return validateCNPJ(cleanValue);
    }

    return false;
}

// Função para validar CPF
function validateCPF(cpf) {
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return true;
}

// Função para validar CNPJ
function validateCNPJ(cnpj) {
    if (cnpj.length !== 14) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * weights[i];
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (digit1 !== parseInt(cnpj.charAt(12))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    if (digit2 !== parseInt(cnpj.charAt(13))) return false;

    return true;
}

// Função para carregar selects da ordem
window.loadOrdemSelects = function() {
    Promise.all([
        api.getClientes(),
        api.getProdutos()
    ]).then(([clientes, produtos]) => {
        // Preencher select de clientes
        const clienteSelect = document.getElementById('ordemCliente');
        clienteSelect.innerHTML = '<option value="">Selecione um cliente</option>';
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nome;
            clienteSelect.appendChild(option);
        });

        // Preencher select de produtos
        const produtoSelect = document.getElementById('ordemProduto');
        produtoSelect.innerHTML = '<option value="">Selecione um produto</option>';
        produtos.forEach(produto => {
            const option = document.createElement('option');
            option.value = produto.id;
            option.textContent = produto.descricao;
            produtoSelect.appendChild(option);
        });
    }).catch(error => {
        console.error('Erro ao carregar selects:', error);
        ui.showToast('Erro ao carregar dados dos selects: ' + error.message, 'danger');
    });
};

// Função auxiliar para verificar se a página de clientes está carregada
function isClientesPageLoaded() {
    const modal = document.getElementById('clienteModal');
    const tableBody = document.getElementById('clientesTableBody');
    const searchInput = document.getElementById('clienteSearch');

        modal: !!modal,
        tableBody: !!tableBody,
        searchInput: !!searchInput
    });

    return modal !== null && tableBody !== null && searchInput !== null;
}

// Função de debug para verificar todos os elementos da página de clientes
function debugClientesPage() {

    const elements = [
        'clienteModal', 'clienteModalTitle', 'clienteForm', 'clienteId',
        'clienteNome', 'clienteCpfCnpj', 'clienteEndereco', 'clienteTelefone',
        'clienteEmail', 'clienteStatus', 'clientesTableBody', 'clienteSearch'
    ];

    const results = {};
    elements.forEach(id => {
        const element = document.getElementById(id);
        results[id] = {
            exists: !!element,
            tagName: element ? element.tagName : null,
            className: element ? element.className : null
        };
    });

    console.table(results);
    return results;
}

// Função auxiliar para aguardar elementos do modal estarem disponíveis
function waitForModalElements(elementIds, maxAttempts = 50) {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        const checkElements = () => {
            attempts++;

            const elements = {};
            let allFound = true;
            const missingElements = [];


            for (const id of elementIds) {
                elements[id] = document.getElementById(id);
                if (!elements[id]) {
                    allFound = false;
                    missingElements.push(id);
                } else {
                }
            }

            if (allFound) {
                resolve(elements);
            } else if (attempts >= maxAttempts) {
                console.error('❌ Timeout: Elementos não encontrados:', missingElements);

                // Debug adicional: verificar se o modal existe
                const modal = document.getElementById('clienteModal');
                if (modal) {
                }

                reject(new Error(`Timeout: Elementos do modal não foram carregados. Faltando: ${missingElements.join(', ')}`));
            } else {
                setTimeout(checkElements, 100);
            }
        };

        checkElements();
    });
}

// Funções de filtro e busca
window.filterClientes = function() {
    const searchTerm = document.getElementById('clienteSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('clienteStatusFilter')?.value || '';
    const rows = document.querySelectorAll('#clientesTableBody tr');

    rows.forEach(row => {
        const nome = row.cells[1]?.textContent.toLowerCase() || '';
        const cpfCnpj = row.cells[2]?.textContent.toLowerCase() || '';
        const email = row.cells[4]?.textContent.toLowerCase() || '';
        const status = row.cells[5]?.textContent.toLowerCase() || '';

        const matchesSearch = nome.includes(searchTerm) ||
                             cpfCnpj.includes(searchTerm) ||
                             email.includes(searchTerm);

        const matchesStatus = !statusFilter ||
                             (statusFilter === 'true' && status.includes('ativo')) ||
                             (statusFilter === 'false' && status.includes('inativo'));

        row.style.display = matchesSearch && matchesStatus ? '' : 'none';
    });
};

window.filterProdutos = function() {
    const searchTerm = document.getElementById('produtoSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('produtoStatusFilter')?.value || '';
    const rows = document.querySelectorAll('#produtosTableBody tr');

    rows.forEach(row => {
        const codigo = row.cells[1]?.textContent.toLowerCase() || '';
        const descricao = row.cells[2]?.textContent.toLowerCase() || '';
        const status = row.cells[3]?.textContent.toLowerCase() || '';

        const matchesSearch = codigo.includes(searchTerm) ||
                             descricao.includes(searchTerm);

        const matchesStatus = !statusFilter ||
                             (statusFilter === 'ativo' && status.includes('ativo')) ||
                             (statusFilter === 'inativo' && status.includes('inativo'));

        row.style.display = matchesSearch && matchesStatus ? '' : 'none';
    });
};

window.filterOrdens = function() {
    const searchTerm = document.getElementById('ordemSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('ordemStatusFilter')?.value || '';
    const prioridadeFilter = document.getElementById('ordemPrioridadeFilter')?.value || '';
    const rows = document.querySelectorAll('#ordensTableBody tr');


    rows.forEach(row => {
        const numero = row.cells[0]?.textContent.toLowerCase() || '';
        const cliente = row.cells[2]?.textContent.toLowerCase() || '';
        const produto = row.cells[3]?.textContent.toLowerCase() || '';
        const status = row.cells[4]?.textContent.toLowerCase() || '';
        const prioridade = row.cells[5]?.textContent.toLowerCase() || '';


        const matchesSearch = numero.includes(searchTerm) ||
                             cliente.includes(searchTerm) ||
                             produto.includes(searchTerm);

        // Mapeamento de status para comparação
        const statusMapping = {
            'aberta': ['aberta'],
            'em_andamento': ['em andamento', 'em_andamento'],
            'concluida': ['concluída', 'concluida'],
            'cancelada': ['cancelada']
        };

        let matchesStatus = true;
        if (statusFilter) {
            const validStatuses = statusMapping[statusFilter] || [];
            matchesStatus = validStatuses.some(validStatus =>
                status.includes(validStatus.toLowerCase())
            );
        }

        // Mapeamento de prioridade para comparação
        const prioridadeMapping = {
            'alta': ['alta'],
            'media': ['média', 'media'],
            'baixa': ['baixa'],
            'normal': ['normal']
        };

        let matchesPrioridade = true;
        if (prioridadeFilter) {
            const validPrioridades = prioridadeMapping[prioridadeFilter] || [];
            matchesPrioridade = validPrioridades.some(validPrioridade =>
                prioridade.includes(validPrioridade.toLowerCase())
            );
        }



        row.style.display = matchesSearch && matchesStatus && matchesPrioridade ? '' : 'none';
    });
};

// Funções para Usuários
window.initUsuarios = function() {
    loadUsuarios();
    const searchInput = document.getElementById('usuarioSearch');
    const roleFilter = document.getElementById('usuarioRoleFilter');
    const statusFilter = document.getElementById('usuarioStatusFilter');
    if (searchInput) searchInput.addEventListener('input', filterUsuarios);
    if (roleFilter) roleFilter.addEventListener('change', filterUsuarios);
    if (statusFilter) statusFilter.addEventListener('change', filterUsuarios);
};

window.loadUsuarios = function() {
    ui.showLoading();
    api.getUsuarios()
        .then(usuarios => {
            window.usuariosData = usuarios;
            const tbody = document.getElementById('usuariosTableBody');
            tbody.innerHTML = '';
            usuarios.forEach(usuario => {
                const row = document.createElement('tr');
                const statusColor = usuario.ativo === true || usuario.ativo === 't' ? 'bg-success' : 'bg-secondary';
                const statusDisplay = usuario.ativo === true || usuario.ativo === 't' ? 'Ativo' : 'Inativo';
                const roleColor = usuario.role === 'admin' ? 'bg-danger' : 'bg-info';
                const roleDisplay = usuario.role === 'admin' ? 'Administrador' : 'Usuário';
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td><span class="badge ${roleColor}">${roleDisplay}</span></td>
                    <td><span class="badge ${statusColor}">${statusDisplay}</span></td>
                    <td>${new Date(usuario.created_at).toLocaleDateString()}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editUsuario(${usuario.id})" title="Editar usuário">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteUsuario(${usuario.id})" title="Excluir usuário">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            ui.hideLoading();
        })
        .catch(error => {
            ui.hideLoading();
            ui.showToast('Erro ao carregar usuários: ' + error.message, 'danger');
        });
};

window.openUsuarioModal = function() {
    document.getElementById('usuarioModalTitle').textContent = 'Novo Usuário';
    document.getElementById('usuarioForm').reset();
    document.getElementById('usuarioId').value = '';
    document.getElementById('usuarioRole').value = 'usuario';
    document.getElementById('usuarioAtivo').value = 'true';
    new bootstrap.Modal(document.getElementById('usuarioModal')).show();
};

window.editUsuario = function(id) {
    ui.showLoading();
    api.getUsuarios()
        .then(usuarios => {
            const usuario = usuarios.find(u => u.id == id);
            if (!usuario) throw new Error('Usuário não encontrado');
            document.getElementById('usuarioModalTitle').textContent = 'Editar Usuário';
            document.getElementById('usuarioId').value = usuario.id;
            document.getElementById('usuarioNome').value = usuario.nome;
            document.getElementById('usuarioEmail').value = usuario.email;
            document.getElementById('usuarioSenha').value = '';
            document.getElementById('usuarioSenha').required = false;
            document.getElementById('usuarioSenha').dataset.touched = 'false';
            document.getElementById('usuarioRole').value = usuario.role;
            const isAtivo = usuario.ativo === true || usuario.ativo === 't';
            document.getElementById('usuarioAtivo').value = isAtivo ? 'true' : 'false';

            // Adicionar event listener para marcar quando o campo de senha foi tocado
            const senhaField = document.getElementById('usuarioSenha');
            senhaField.addEventListener('input', function() {
                this.dataset.touched = 'true';
            });

            new bootstrap.Modal(document.getElementById('usuarioModal')).show();
            ui.hideLoading();
        }).catch(error => {
            ui.hideLoading();
            ui.showToast('Erro ao carregar dados do usuário: ' + error.message, 'danger');
        });
};

window.saveUsuario = function() {

    const formData = {
        nome: document.getElementById('usuarioNome').value,
        email: document.getElementById('usuarioEmail').value,
        role: document.getElementById('usuarioRole').value,
        ativo: document.getElementById('usuarioAtivo').value === 'true'
    };
    const senha = document.getElementById('usuarioSenha').value;


    if (senha) {
        formData.senha = senha;
    }

    const id = document.getElementById('usuarioId').value;
    if (!formData.nome || !formData.email || !formData.role) {
        ui.showToast('Nome, email e perfil são obrigatórios', 'danger');
        return;
    }
    if (senha && senha.length < 6) {
        ui.showToast('A senha deve ter pelo menos 6 caracteres', 'danger');
        return;
    }

    // Se o campo de senha foi tocado mas está vazio, avisar o usuário
    const senhaField = document.getElementById('usuarioSenha');
    if (senhaField && senhaField.value === '' && senhaField.dataset.touched === 'true') {
        ui.showToast('Se você deseja alterar a senha, preencha o campo. Caso contrário, deixe em branco.', 'warning');
        return;
    }
    ui.showLoading();
    if (id) {
        api.updateUsuario(id, formData)
            .then(() => {
                ui.hideLoading();
                const mensagem = senha ? 'Usuário atualizado com sucesso! Senha alterada.' : 'Usuário atualizado com sucesso!';
                ui.showToast(mensagem);
                bootstrap.Modal.getInstance(document.getElementById('usuarioModal')).hide();
                loadUsuarios();
            })
            .catch(error => {
                ui.hideLoading();
                ui.showToast(error.message, 'danger');
            });
    } else {
        if (!formData.senha) {
            ui.hideLoading();
            ui.showToast('Senha é obrigatória para novos usuários', 'danger');
            return;
        }
        api.createUsuario(formData)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Usuário criado com sucesso!');
                bootstrap.Modal.getInstance(document.getElementById('usuarioModal')).hide();
                loadUsuarios();
            })
            .catch(error => {
                ui.hideLoading();
                ui.showToast(error.message, 'danger');
            });
    }
};

window.deleteUsuario = function(id) {
    const usuario = window.usuariosData?.find(u => u.id == id);
    const nome = usuario ? usuario.nome : 'este usuário';
    if (confirm(`Tem certeza que deseja excluir o usuário ${nome}?\n\nEsta ação não pode ser desfeita.`)) {
        ui.showLoading();
        api.deleteUsuario(id)
            .then(() => {
                ui.hideLoading();
                ui.showToast('Usuário excluído com sucesso!');
                loadUsuarios();
            })
            .catch(error => {
                ui.hideLoading();
                ui.showToast(error.message, 'danger');
            });
    }
};

window.filterUsuarios = function() {
    const searchTerm = document.getElementById('usuarioSearch')?.value.toLowerCase() || '';
    const roleFilter = document.getElementById('usuarioRoleFilter')?.value || '';
    const statusFilter = document.getElementById('usuarioStatusFilter')?.value || '';
    const rows = document.querySelectorAll('#usuariosTableBody tr');
    rows.forEach(row => {
        const nome = row.cells[1]?.textContent.toLowerCase() || '';
        const email = row.cells[2]?.textContent.toLowerCase() || '';
        const role = row.cells[3]?.textContent.toLowerCase() || '';
        const status = row.cells[4]?.textContent.toLowerCase() || '';
        const matchesSearch = nome.includes(searchTerm) || email.includes(searchTerm);
        const matchesRole = !roleFilter || role.includes(roleFilter.toLowerCase());
        const matchesStatus = !statusFilter || status.includes(statusFilter.toLowerCase());
        row.style.display = matchesSearch && matchesRole && matchesStatus ? '' : 'none';
    });
};
