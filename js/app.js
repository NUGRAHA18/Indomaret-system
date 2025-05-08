// Main application module
const UIController = (() => {
    // DOM Elements
    const contentArea = document.getElementById('contentArea');
    const sidebarToggle = document.getElementById('sidebarToggle');

    // Check screen size and adjust UI
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            sidebarToggle.style.display = 'block';
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('sidebar-expanded');
            contentArea.classList.remove('content-expanded');
        } else {
            sidebarToggle.style.display = 'none';
        }
    }

    // Load content based on menu selection
    function loadContent(menuId) {
        switch(menuId) {
            case 'dashboard':
                DashboardModule.loadDashboard();
                break;
            case 'audit-stok':
                InventoryModule.loadAuditStok();
                break;
            case 'monitoring-stok':
                InventoryModule.loadMonitoringStok();
                break;
            case 'penerimaan-stock':
                InventoryModule.loadPenerimaanStock();
                break;
            case 'update-stock':
                UpdateStockModule.loadUpdateStock();
                break;
            case 'kadaluarsa':
                KadaluarsaModule.loadKadaluarsa();
                break;
            case 'kebijakan-stock':
                KebijakanStockModule.loadKebijakanStock();
                break;
                case 'update-stock':
                UpdateStockModule.loadUpdateStock();
                break;
            case 'kadaluarsa':
                KadaluarsaModule.loadKadaluarsa();
                break;
            case 'promosi-lokal':
                PromosiLokalModule.loadPromosiLokal();
                break;
            case 'sinkron-harga':
                // Update once module is created
                loadUnderConstruction(menuId);
                break;
            case 'update-harga':
                // Update once module is created
                loadUnderConstruction(menuId);
                break;
            case 'update-file':
                // Update once module is created
                loadUnderConstruction(menuId);
                break;
            case 'shift-karyawan':
                // Update once module is created
                loadUnderConstruction(menuId);
                break;
            case 'user-outlet':
                // Update once module is created
                loadUnderConstruction(menuId);
                break;
            case 'penjualan':
                SalesModule.loadPenjualan();
                break;
            case 'layanan-ppob':
                PPOBModule.loadLayananPPOB();
                break;
            case 'registrasi-member':
                MembershipModule.loadRegistrasiMember();
                break;
            case 'laporan-penjualan':
                ReportsModule.loadLaporanPenjualan();
                break;

            default:
                loadUnderConstruction(menuId);
        }
    }

    // Load under construction content
    function loadUnderConstruction(menuId) {
        // Get menu text based on ID
        let menuText = MenuManager.getMenuTextById(menuId);
        
        const html = `
            <div class="dashboard-header">
                <h2>${menuText}</h2>
                <p>Halaman ini sedang dalam pengembangan</p>
            </div>
            
            <div style="text-align: center; padding: 50px 20px;">
                <div style="font-size: 72px; margin-bottom: 20px;">🚧</div>
                <h3 style="font-size: 24px; margin-bottom: 10px;">Halaman Sedang Dalam Pengembangan</h3>
                <p style="color: #666; margin-bottom: 20px;">Mohon maaf, fitur "${menuText}" sedang dalam tahap pengembangan dan akan segera tersedia.</p>
                <button class="action-btn btn-primary" onclick="UIController.loadContent('dashboard')">Kembali ke Dashboard</button>
            </div>
        `;
        
        contentArea.innerHTML = html;
    }

    // Toggle sidebar on mobile
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('contentArea');
        
        sidebar.classList.toggle('sidebar-expanded');
        content.classList.toggle('content-expanded');
    }

    // Initialize application
    function init() {
        // Initialize modals
        ModalManager.init();
        
        // Initialize tabs
        TabManager.init();
        
        // Sidebar toggle for mobile
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', toggleSidebar);
        }
        
        // Initialize date inputs with current date
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        document.querySelectorAll('input[type="date"]').forEach(input => {
            input.value = formattedDate;
        });
        
        // Initialize authentication
        Auth.init();
    }

    // Public methods
    return {
        init,
        loadContent,
        checkScreenSize,
        toggleSidebar
    };
})();

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    UIController.init();
});