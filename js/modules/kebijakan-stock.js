/**
 * Kebijakan Stock Module
 * Manages outlet stock policies for the Indomaret Management System
 */

// Kebijakan Stock module
const KebijakanStockModule = (() => {
    // Sample outlet data
    const outletData = [
        { id: 1, name: 'Indomaret Jl. Sudirman No. 123', type: 'Reguler', area: 'Jakarta Pusat', isActive: true },
        { id: 2, name: 'Indomaret Jl. Gatot Subroto No. 45', type: 'Super', area: 'Jakarta Selatan', isActive: true },
        { id: 3, name: 'Indomaret Jl. Asia Afrika No. 67', type: 'Point', area: 'Jakarta Barat', isActive: true },
        { id: 4, name: 'Indomaret Jl. Thamrin No. 89', type: 'Reguler', area: 'Jakarta Pusat', isActive: true },
        { id: 5, name: 'Indomaret Jl. Kuningan No. 12', type: 'Super', area: 'Jakarta Selatan', isActive: false }
    ];

    // Sample stock policy data
    const policyData = [
        { 
            id: 'POL001', 
            name: 'Kebijakan Default',
            description: 'Kebijakan default untuk semua outlet tipe reguler',
            outletType: 'Reguler',
            minStockMultiplier: 1.0,
            maxStockMultiplier: 1.5,
            restockThreshold: 0.3,
            autoRestock: true,
            createdDate: '2025-01-15',
            updatedDate: '2025-04-20',
            isActive: true
        },
        { 
            id: 'POL002', 
            name: 'Kebijakan Super Outlet',
            description: 'Kebijakan khusus untuk outlet tipe super dengan kapasitas lebih besar',
            outletType: 'Super',
            minStockMultiplier: 1.5,
            maxStockMultiplier: 2.0,
            restockThreshold: 0.4,
            autoRestock: true,
            createdDate: '2025-02-10',
            updatedDate: '2025-04-22',
            isActive: true
        },
        { 
            id: 'POL003', 
            name: 'Kebijakan Point Outlet',
            description: 'Kebijakan khusus untuk outlet tipe point dengan kapasitas terbatas',
            outletType: 'Point',
            minStockMultiplier: 0.8,
            maxStockMultiplier: 1.2,
            restockThreshold: 0.25,
            autoRestock: false,
            createdDate: '2025-02-15',
            updatedDate: '2025-03-10',
            isActive: true
        },
        { 
            id: 'POL004', 
            name: 'Kebijakan Seasonal (Ramadhan)',
            description: 'Kebijakan stock untuk periode Ramadhan dengan kebutuhan yang meningkat',
            outletType: 'All',
            minStockMultiplier: 1.8,
            maxStockMultiplier: 2.5,
            restockThreshold: 0.5,
            autoRestock: true,
            createdDate: '2025-03-01',
            updatedDate: '2025-03-01',
            isActive: false
        }
    ];

    // Load kebijakan stock page
    function loadKebijakanStock() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        const html = `
            <div class="dashboard-header">
                <h2>Kebijakan Stock Outlet</h2>
                <p>Kelola dan terapkan kebijakan stok untuk setiap outlet</p>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Daftar Kebijakan Stock</h3>
                    <button class="action-btn btn-primary" id="addNewPolicyBtn">Tambah Kebijakan Baru</button>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama Kebijakan</th>
                                    <th>Tipe Outlet</th>
                                    <th>Min Stock</th>
                                    <th>Max Stock</th>
                                    <th>Restock Threshold</th>
                                    <th>Auto Restock</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${policyData.map(policy => `
                                    <tr>
                                        <td>${policy.id}</td>
                                        <td>${policy.name}</td>
                                        <td>${policy.outletType}</td>
                                        <td>${policy.minStockMultiplier}x</td>
                                        <td>${policy.maxStockMultiplier}x</td>
                                        <td>${policy.restockThreshold * 100}%</td>
                                        <td>${policy.autoRestock ? 'Ya' : 'Tidak'}</td>
                                        <td><span class="status ${policy.isActive ? 'success' : 'pending'}">${policy.isActive ? 'Aktif' : 'Non-aktif'}</span></td>
                                        <td>
                                            <button class="action-btn btn-primary btn-view-policy" data-id="${policy.id}">Detail</button>
                                            <button class="action-btn btn-secondary btn-edit-policy" data-id="${policy.id}">Edit</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Penerapan Kebijakan Outlet</h3>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Outlet</th>
                                    <th>Nama Outlet</th>
                                    <th>Tipe</th>
                                    <th>Area</th>
                                    <th>Kebijakan Aktif</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${outletData.map(outlet => {
                                    const policy = getPolicyForOutletType(outlet.type);
                                    return `
                                        <tr>
                                            <td>${outlet.id}</td>
                                            <td>${outlet.name}</td>
                                            <td>${outlet.type}</td>
                                            <td>${outlet.area}</td>
                                            <td>${policy ? policy.name : '-'}</td>
                                            <td><span class="status ${outlet.isActive ? 'success' : 'danger'}">${outlet.isActive ? 'Aktif' : 'Non-aktif'}</span></td>
                                            <td>
                                                <button class="action-btn btn-primary btn-assign-policy" data-id="${outlet.id}">Assign Kebijakan</button>
                                                <button class="action-btn btn-secondary btn-view-outlet" data-id="${outlet.id}">Detail</button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Analisis Performa Kebijakan</h3>
                </div>
                <div class="panel-body">
                    <div class="tabs">
                        <div class="tab active">Statistik</div>
                        <div class="tab">Tren Bulanan</div>
                        <div class="tab">Perbandingan Kebijakan</div>
                    </div>
                    <div class="tab-content active">
                        <div class="dashboard-stats">
                            <div class="stat-card">
                                <h3>Rata-rata Stock Coverage</h3>
                                <div class="value">14.5 hari</div>
                                <div class="trend up">↑ 2.3 hari dari bulan lalu</div>
                            </div>
                            <div class="stat-card">
                                <h3>Out of Stock Rate</h3>
                                <div class="value">1.2%</div>
                                <div class="trend down">↓ 0.8% dari bulan lalu</div>
                            </div>
                            <div class="stat-card">
                                <h3>Frekuensi Restock</h3>
                                <div class="value">3.5x/bulan</div>
                                <div class="trend down">↓ 0.3x dari bulan lalu</div>
                            </div>
                            <div class="stat-card">
                                <h3>Efisiensi Penggunaan Storage</h3>
                                <div class="value">87.2%</div>
                                <div class="trend up">↑ 4.5% dari bulan lalu</div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 20px;">
                            <h4>Distribusi Penerapan Kebijakan</h4>
                            <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-top: 10px;">
                                <div style="display: flex; height: 30px; border-radius: 4px; overflow: hidden; margin-bottom: 10px;">
                                    <div style="width: 45%; background-color: #3498db;" title="Kebijakan Default"></div>
                                    <div style="width: 30%; background-color: #2ecc71;" title="Kebijakan Super Outlet"></div>
                                    <div style="width: 25%; background-color: #f39c12;" title="Kebijakan Point Outlet"></div>
                                </div>
                                <div style="display: flex; justify-content: space-between; font-size: 13px; color: #666;">
                                    <div>Kebijakan Default: 45%</div>
                                    <div>Kebijakan Super Outlet: 30%</div>
                                    <div>Kebijakan Point Outlet: 25%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Tren Bulanan content goes here -->
                        <p style="margin: 15px 0;">Data tren bulanan akan ditampilkan di sini dalam bentuk grafik.</p>
                    </div>
                    <div class="tab-content">
                        <!-- Perbandingan Kebijakan content goes here -->
                        <p style="margin: 15px 0;">Data perbandingan antar kebijakan akan ditampilkan di sini.</p>
                    </div>
                </div>
            </div>
        `;
        
        contentArea.innerHTML = html;
        
        // Initialize event listeners
        initializeEventListeners();
    }
    
    // Helper function to get policy for a specific outlet type
    function getPolicyForOutletType(outletType) {
        return policyData.find(policy => 
            (policy.outletType === outletType || policy.outletType === 'All') && 
            policy.isActive
        );
    }
    
    // Initialize event listeners for interactive elements
    function initializeEventListeners() {
        // Add new policy button
        const addNewPolicyBtn = document.getElementById('addNewPolicyBtn');
        if (addNewPolicyBtn) {
            addNewPolicyBtn.addEventListener('click', function() {
                alert('Form pembuatan kebijakan baru akan ditampilkan di sini.');
                // Here you would typically open a modal for creating a new policy
            });
        }
        
        // View policy details buttons
        document.querySelectorAll('.btn-view-policy').forEach(button => {
            button.addEventListener('click', function() {
                const policyId = this.getAttribute('data-id');
                const policy = policyData.find(p => p.id === policyId);
                if (policy) {
                    alert(`Detail kebijakan ${policy.name}:\n\nDeskripsi: ${policy.description}\nTanggal Dibuat: ${policy.createdDate}\nTerakhir Diperbarui: ${policy.updatedDate}`);
                }
            });
        });
        
        // Edit policy buttons
        document.querySelectorAll('.btn-edit-policy').forEach(button => {
            button.addEventListener('click', function() {
                const policyId = this.getAttribute('data-id');
                alert(`Form edit kebijakan dengan ID: ${policyId} akan ditampilkan di sini.`);
            });
        });
        
        // Assign policy buttons
        document.querySelectorAll('.btn-assign-policy').forEach(button => {
            button.addEventListener('click', function() {
                const outletId = this.getAttribute('data-id');
                const outlet = outletData.find(o => o.id === parseInt(outletId));
                if (outlet) {
                    alert(`Form assignment kebijakan untuk outlet: ${outlet.name} akan ditampilkan di sini.`);
                }
            });
        });
        
        // View outlet details buttons
        document.querySelectorAll('.btn-view-outlet').forEach(button => {
            button.addEventListener('click', function() {
                const outletId = this.getAttribute('data-id');
                const outlet = outletData.find(o => o.id === parseInt(outletId));
                if (outlet) {
                    alert(`Detail outlet ${outlet.name}:\n\nTipe: ${outlet.type}\nArea: ${outlet.area}\nStatus: ${outlet.isActive ? 'Aktif' : 'Non-aktif'}`);
                }
            });
        });
    }
    
    // Public methods
    return {
        loadKebijakanStock
    };
})();