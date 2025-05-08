/**
 * Menu Manager Module
 * Handles sidebar menu functionality for the Indomaret Management System
 */

// Menu manager module
const MenuManager = (() => {
    // Menu configuration based on user role
    const menuConfig = {
        supervisor: [
            { category: 'Dashboard', items: [
                { id: 'dashboard', text: 'Dashboard', icon: '📊' }
            ]},
            { category: 'Inventory Management', items: [
                { id: 'audit-stok', text: 'Audit Stok', icon: '📋' },
                { id: 'monitoring-stok', text: 'Monitoring Kebutuhan Stock', icon: '📈' },
                { id: 'kebijakan-stock', text: 'Kebijakan Stock Outlet', icon: '📑' }
            ]},
            { category: 'Price Management', items: [
                { id: 'promosi-lokal', text: 'Pengelolaan Promosi Lokal', icon: '🏷️' }
            ]},
            { category: 'Management', items: [
                { id: 'laporan-penjualan', text: 'Laporan Penjualan', icon: '📃' }
            ]}
        ],
        manager: [
            { category: 'Dashboard', items: [
                { id: 'dashboard', text: 'Dashboard', icon: '📊' }
            ]},
            { category: 'Inventory Management', items: [
                { id: 'monitoring-stok', text: 'Monitoring Kebutuhan Stock', icon: '📈' },
                { id: 'kebijakan-stock', text: 'Kebijakan Stock Outlet', icon: '📑' },
                { id: 'penerimaan-stock', text: 'Pendataan Penerimaan Stock', icon: '📦' },
                { id: 'update-stock', text: 'Update Data Stock', icon: '🔄' },
                { id: 'kadaluarsa', text: 'Pengelolaan Produk Kadaluarsa', icon: '⚠️' }
            ]},
            { category: 'Price Management', items: [
                { id: 'promosi-lokal', text: 'Pengelolaan Promosi Lokal', icon: '🏷️' },
                { id: 'sinkron-harga', text: 'Sinkron Harga Online', icon: '🔄' },
                { id: 'update-harga', text: 'Update Harga Jual Outlet', icon: '💰' },
                { id: 'update-file', text: 'Sinkron Harga Via Update File', icon: '📂' }
            ]},
            { category: 'Management', items: [
                { id: 'shift-karyawan', text: 'Pengelolaan Shift Karyawan', icon: '👥' },
                { id: 'user-outlet', text: 'Manajemen User Outlet', icon: '👤' },
                { id: 'laporan-penjualan', text: 'Laporan Penjualan', icon: '📃' }
            ]}
        ],
        kasir: [
            { category: 'Dashboard', items: [
                { id: 'dashboard', text: 'Dashboard', icon: '📊' }
            ]},
            { category: 'Sales Operations', items: [
                { id: 'penjualan', text: 'Penjualan', icon: '🛒' },
                { id: 'rekap-tagihan', text: 'Rekap Tagihan', icon: '🧾' }
            ]},
            { category: 'Customer Service', items: [
                { id: 'layanan-ppob', text: 'Layanan PPOB', icon: '💳' },
                { id: 'registrasi-member', text: 'Registrasi Member', icon: '📝' }
            ]}
        ],
        supplier: [
            { category: 'Dashboard', items: [
                { id: 'dashboard', text: 'Dashboard', icon: '📊' }
            ]},
            { category: 'Inventory Management', items: [
                { id: 'penerimaan-stock', text: 'Pendataan Penerimaan Stock', icon: '📦' }
            ]}
        ]
    };
    
    // DOM elements
    const mainMenu = document.getElementById('mainMenu');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    // Get menu text by ID
    function getMenuTextById(menuId) {
        let menuText = '';
        Object.values(menuConfig).forEach(role => {
            role.forEach(section => {
                section.items.forEach(item => {
                    if (item.id === menuId) {
                        menuText = item.text;
                    }
                });
            });
        });
        
        if (!menuText) {
            menuText = menuId.replace(/-/g, ' ');
            // Capitalize first letter of each word
            menuText = menuText.replace(/\b\w/g, l => l.toUpperCase());
        }
        
        return menuText;
    }
    
    // Load menu based on user role
    function loadMenu(role) {
        if (!mainMenu) {
            console.error('Main menu container not found');
            return;
        }
        
        // Clear existing menu
        mainMenu.innerHTML = '';
        
        // Get menu configuration for the role
        const roleMenu = menuConfig[role];
        if (!roleMenu) {
            console.error('Menu configuration not found for role: ' + role);
            return;
        }
        
        // Generate menu HTML
        roleMenu.forEach(section => {
            // Create category header
            const categoryLi = document.createElement('li');
            categoryLi.className = 'menu-category';
            categoryLi.textContent = section.category;
            mainMenu.appendChild(categoryLi);
            
            // Create items
            section.items.forEach(item => {
                const itemLi = document.createElement('li');
                itemLi.className = 'menu-item';
                itemLi.setAttribute('data-menu', item.id);
                itemLi.innerHTML = `<i>${item.icon}</i><span class="menu-text">${item.text}</span>`;
                mainMenu.appendChild(itemLi);
                
                // Add click event
                itemLi.addEventListener('click', function() {
                    // Remove active class from all items
                    document.querySelectorAll('.menu-item').forEach(menuItem => {
                        menuItem.classList.remove('active');
                    });
                    
                    // Add active class to clicked item
                    this.classList.add('active');
                    
                    // Load content
                    UIController.loadContent(item.id);
                    
                    // Close sidebar on mobile
                    if (window.innerWidth <= 768) {
                        const sidebar = document.getElementById('sidebar');
                        const contentArea = document.getElementById('contentArea');
                        if (sidebar) sidebar.classList.remove('sidebar-expanded');
                        if (contentArea) contentArea.classList.remove('content-expanded');
                    }
                });
            });
        });
    }
    
    // Public methods
    return {
        loadMenu,
        getMenuTextById
    };
})();