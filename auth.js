// Authentication Module for mylivesite
// NOTE: This requires a backend API to work. Update API_BASE_URL with your backend endpoint.

const API_BASE_URL = 'https://your-backend-api.com/api';

class AuthManager {
    constructor() {
        this.token = localStorage.getItem('auth_token');
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }

    /**
     * Register a new user
     * Backend endpoint should accept: { email, password, name }
     * Backend should return: { token, user }
     */
    async register(email, password, name) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Registration failed');
            }

            const data = await response.json();
            this.setAuth(data.token, data.user);
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    /**
     * Login user
     * Backend endpoint should accept: { email, password }
     * Backend should return: { token, user }
     */
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }

            const data = await response.json();
            this.setAuth(data.token, data.user);
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Logout user
     */
    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!this.token;
    }

    /**
     * Get current user
     */
    getUser() {
        return this.user;
    }

    /**
     * Get authentication token
     */
    getToken() {
        return this.token;
    }

    /**
     * Set authentication data
     */
    setAuth(token, user) {
        this.token = token;
        this.user = user;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Make authenticated API request
     */
    async apiRequest(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
            ...options.headers
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        if (response.status === 401) {
            // Token expired or invalid
            this.logout();
            throw new Error('Session expired. Please login again.');
        }

        return response;
    }

    /**
     * Verify token validity (optional)
     * Backend endpoint: GET /auth/verify
     */
    async verifyToken() {
        if (!this.token) return false;

        try {
            const response = await this.apiRequest('/auth/verify');
            return response.ok;
        } catch (error) {
            console.error('Token verification failed:', error);
            return false;
        }
    }

    /**
     * Update user profile
     * Backend endpoint: PUT /auth/profile
     */
    async updateProfile(updates) {
        try {
            const response = await this.apiRequest('/auth/profile', {
                method: 'PUT',
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Profile update failed');
            }

            const data = await response.json();
            this.user = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
            return data.user;
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    }

    /**
     * Request password reset
     * Backend endpoint: POST /auth/forgot-password
     */
    async forgotPassword(email) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Password reset request failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        }
    }
}

// Initialize global auth manager
const auth = new AuthManager();

// Protect pages that require authentication
function requireAuth() {
    if (!auth.isAuthenticated()) {
        window.location.href = '/login.html';
    }
}

// Example: Protect current page
// Uncomment the following line on pages that require authentication:
// requireAuth();