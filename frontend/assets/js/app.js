// Main application JavaScript

class TelecontrolApp {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8000/api';
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('loginFormElement')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    async handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            this.showLoading();
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                this.showMainContent();
                this.showToast('Sucesso', 'Login realizado!');
                this.loadPage('dashboard');
            } else {
                this.showToast('Erro', data.error || 'Erro no login');
            }
        } catch (error) {
            this.showToast('Erro', 'Erro de conexão');
        } finally {
            this.hideLoading();
        }
    }

    showMainContent() {
        document.getElementById('loginForm').style.display = 'none';
        document.querySelector('.navbar-nav').style.display = 'flex';
    }

    async loadPage(page) {
        try {
            this.showLoading();
            const response = await fetch(`pages/${page}.html`);
            const content = await response.text();

            document.getElementById('content').innerHTML = content;
            this.initializePage(page);
        } catch (error) {
            this.showToast('Erro', 'Erro ao carregar página');
        } finally {
            this.hideLoading();
        }
    }

    initializePage(page) {
        switch (page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'clientes':
                this.loadClientes();
                break;
            case 'produtos':
                this.loadProdutos();
                break;
            case 'ordens':
                this.loadOrdens();
                break;
        }
    }

    async loadDashboard() {
        try {
            const [clientes, produtos, ordens] = await Promise.all([
                this.apiCall('GET', '/clientes'),
                this.apiCall('GET', '/produtos'),
                this.apiCall('GET', '/ordens')
            ]);

            document.getElementById('clientesCount').textContent = clientes.length || 0;
            document.getElementById('produtosCount').textContent = produtos.length || 0;
            document.getElementById('ordensCount').textContent = ordens.length || 0;
        } catch (error) {
            console.error('Erro ao carregar dashboard:', error);
        }
    }

    async apiCall(method, endpoint, data = null) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${this.apiBaseUrl}${endpoint}`, options);

        if (response.status === 401) {
            this.logout();
            return;
        }

        return await response.json();
    }

    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('d-none');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('d-none');
    }

    showToast(title, message) {
        document.getElementById('toastTitle').textContent = title;
        document.getElementById('toastBody').textContent = message;

        const toast = new bootstrap.Toast(document.getElementById('toast'));
        toast.show();
    }

    logout() {
        localStorage.removeItem('authToken');
        location.reload();
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TelecontrolApp();
});

// Global functions
function loadPage(page) {
    window.app.loadPage(page);
}

function logout() {
    window.app.logout();
}
