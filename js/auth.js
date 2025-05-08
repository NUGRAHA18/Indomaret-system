/**
 * Authentication Module
 * Handles login, logout, and session management for the Indomaret Management System
 */

// Authentication module
const Auth = (() => {
    // Current logged in user
    let currentUser = null;

    // DOM Elements
    const loginScreen = document.getElementById('loginScreen');
    const appScreen = document.getElementById('appScreen');
    const userRoleSelect = document.getElementById('userRole');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');
    const logoutBtn = document.getElementById('logoutBtn');
    const userDisplayName = document.getElementById('userDisplayName');
    const userRoleDisplay = document.getElementById('userRoleDisplay');

    // Handle login
    function handleLogin() {
        const role = userRoleSelect.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        // Check if credentials match
        if (users[role] && users[role].username === username && users[role].password === password) {
            currentUser = users[role];
            showApp();
        } else {
            loginError.style.display = 'block';
        }
    }

    // Handle logout
    function handleLogout() {
        currentUser = null;
        showLogin();
    }

    // Show app screen
    function showApp() {
        loginScreen.style.display = 'none';
        appScreen.style.display = 'block';
        
        // Update user display
        userDisplayName.textContent = currentUser.name;
        userRoleDisplay.textContent = currentUser.role;
        
        // Load menu based on role
        MenuManager.loadMenu(userRoleSelect.value);
        
        // Load dashboard as default
        UIController.loadContent('dashboard');
        
        // Check screen size for mobile
        UIController.checkScreenSize();
        
        // Add resize event listener
        window.addEventListener('resize', UIController.checkScreenSize);
    }

    // Show login screen
    function showLogin() {
        appScreen.style.display = 'none';
        loginScreen.style.display = 'flex';
        loginError.style.display = 'none';
        
        // Clear inputs
        passwordInput.value = '';
        
        // Remove resize event listener
        window.removeEventListener('resize', UIController.checkScreenSize);
    }

    // Initialize auth events
    function init() {
        // Login functionality
        loginBtn.addEventListener('click', handleLogin);
        
        // Logout functionality
        logoutBtn.addEventListener('click', handleLogout);

        // Set default username based on selected role
        userRoleSelect.addEventListener('change', function() {
            usernameInput.value = this.value;
            passwordInput.value = 'pass123';
        });
        
        // Trigger role change to set default username
        userRoleSelect.dispatchEvent(new Event('change'));
        
        // Start with login screen
        showLogin();
    }

    // Public methods
    return {
        init,
        getCurrentUser: () => currentUser,
        showLogin,
        showApp
    };
})();