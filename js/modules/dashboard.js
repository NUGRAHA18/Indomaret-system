/**
 * Dashboard Module
 * Handles dashboard functionality for the Indomaret Management System
 */

// Dashboard module
const DashboardModule = (() => {
    // Sample data (in a real app, this would come from an API)
    const salesData = [
        { id: 'S001', date: '2025-05-08', customer: 'Reguler', total: 35000, items: 4, status: 'Sukses', payment: 'Tunai' },
        { id: 'S002', date: '2025-05-08', customer: 'Member (M001)', total: 48500, items: 6, status: 'Sukses', payment: 'QRIS' },
        { id: 'S003', date: '2025-05-08', customer: 'Reguler', total: 12500, items: 2, status: 'Sukses', payment: 'Debit' },
        { id: 'S004', date: '2025-05-07', customer: 'Reguler', total: 27000, items: 3, status: 'Sukses', payment: 'Tunai' },
        { id: 'S005', date: '2025-05-07', customer: 'Member (M003)', total: 64500, items: 8, status: 'Sukses', payment: 'Kredit' }
    ];
    
    const inventoryData = [
        { id: 'P001', name: 'Indomie Goreng', category: 'Makanan', stock: 120, min_stock: 50, max_stock: 200, price: 3500 },
        { id: 'P002', name: 'Aqua 600ml', category: 'Minuman', stock: 85, min_stock: 40, max_stock: 150, price: 4000 },
        { id: 'P003', name: 'Pocari Sweat', category: 'Minuman', stock: 42, min_stock: 20, max_stock: 100, price: 7500 },
        { id: 'P004', name: 'Chitato Original', category: 'Makanan Ringan', stock: 35, min_stock: 15, max_stock: 80, price: 9500 },
        { id: 'P005', name: 'Teh Botol Sosro', category: 'Minuman', stock: 48, min_stock: 20, max_stock: 100, price: 5000 }
    ];
    
    // Load dashboard content
    function loadDashboard() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) {
            console.error('Content area not found');
            return;
        }
        
        // Get current user role
        const currentUser = Auth.getCurrentUser();
        const role = currentUser ? currentUser.username : '';
        
        // Start building dashboard HTML
        let html = `
            <div class="dashboard-header">
                <h2>Dashboard</h2>
                <p>Selamat datang, ${currentUser ? currentUser.name : ''}!</p>
            </div>
            
            <div class="dashboard-stats">
                <div class="stat-card">
                    <h3>Total Penjualan Hari Ini</h3>
                    <div class="value">Rp 96.000</div>
                    <div class="trend up">↑ 12% dari kemarin</div>
                </div>
                <div class="stat-card">
                    <h3>Jumlah Transaksi</h3>
                    <div class="value">23</div>
                    <div class="trend up">↑ 5% dari kemarin</div>
                </div>
                <div class="stat-card">
                    <h3>Produk Terjual</h3>
                    <div class="value">87</div>
                    <div class="trend up">↑ 8% dari kemarin</div>
                </div>
                <div class="stat-card">
                    <h3>Stok Perlu Diperhatikan</h3>
                    <div class="value">4</div>
                    <div class="trend down">↓ 2 dari kemarin</div>
                </div>
            </div>
        `;
        
        // Role-specific dashboard content
        if (role === 'supervisor' || role === 'manager') {
            html += `
                <div class="panel">
                    <div class="panel-header">
                        <h3>Penjualan Terakhir</h3>
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tanggal</th>
                                        <th>Pelanggan</th>
                                        <th>Total</th>
                                        <th>Item</th>
                                        <th>Status</th>
                                        <th>Pembayaran</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${salesData.slice(0, 5).map(sale => `
                                        <tr>
                                            <td>${sale.id}</td>
                                            <td>${sale.date}</td>
                                            <td>${sale.customer}</td>
                                            <td>Rp ${sale.total.toLocaleString()}</td>
                                            <td>${sale.items}</td>
                                            <td><span class="status success">${sale.status}</span></td>
                                            <td>${sale.payment}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="panel">
                    <div class="panel-header">
                        <h3>Stok yang Perlu Diperhatikan</h3>
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kode</th>
                                        <th>Nama Produk</th>
                                        <th>Kategori</th>
                                        <th>Stok Saat Ini</th>
                                        <th>Minimum Stok</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${inventoryData.filter(item => item.stock < item.min_stock * 1.2).map(item => `
                                        <tr>
                                            <td>${item.id}</td>
                                            <td>${item.name}</td>
                                            <td>${item.category}</td>
                                            <td>${item.stock}</td>
                                            <td>${item.min_stock}</td>
                                            <td>
                                                ${item.stock < item.min_stock 
                                                    ? '<span class="status danger">Segera Restock</span>' 
                                                    : '<span class="status pending">Perhatikan</span>'}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }
        
        if (role === 'kasir') {
            html += `
                <div class="panel">
                    <div class="panel-header">
                        <h3>Opsi Cepat</h3>
                    </div>
                    <div class="panel-body">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                            <button class="action-btn btn-primary" style="height: 80px; font-size: 16px;" onclick="ModalManager.openModal('salesModal')">
                                <i style="font-size: 24px; margin-bottom: 5px; display: block;">🛒</i>
                                Transaksi Baru
                            </button>
                            <button class="action-btn btn-primary" style="height: 80px; font-size: 16px;" onclick="UIController.loadContent('rekap-tagihan')">
                                <i style="font-size: 24px; margin-bottom: 5px; display: block;">🧾</i>
                                Rekap Transaksi
                            </button>
                            <button class="action-btn btn-primary" style="height: 80px; font-size: 16px;" onclick="ModalManager.openModal('ppobModal')">
                                <i style="font-size: 24px; margin-bottom: 5px; display: block;">💳</i>
                                Layanan PPOB
                            </button>
                            <button class="action-btn btn-primary" style="height: 80px; font-size: 16px;" onclick="ModalManager.openModal('memberRegistrationModal')">
                                <i style="font-size: 24px; margin-bottom: 5px; display: block;">📝</i>
                                Registrasi Member
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="panel">
                    <div class="panel-header">
                        <h3>Transaksi Hari Ini</h3>
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Waktu</th>
                                        <th>Pelanggan</th>
                                        <th>Total</th>
                                        <th>Pembayaran</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${salesData.filter(sale => sale.date === '2025-05-08').map((sale, index) => `
                                        <tr>
                                            <td>${sale.id}</td>
                                            <td>${sale.date} ${14 - index}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}</td>
                                            <td>${sale.customer}</td>
                                            <td>Rp ${sale.total.toLocaleString()}</td>
                                            <td>${sale.payment}</td>
                                            <td><span class="status success">${sale.status}</span></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }
        
        if (role === 'supplier') {
            html += `
                <div class="panel">
                    <div class="panel-header">
                        <h3>Pengiriman Terakhir</h3>
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No. Pengiriman</th>
                                        <th>Tanggal</th>
                                        <th>Outlet</th>
                                        <th>Total Item</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>DLV-20250507-001</td>
                                        <td>2025-05-07</td>
                                        <td>Indomaret Jl. Sudirman No. 123</td>
                                        <td>275</td>
                                        <td><span class="status success">Diterima</span></td>
                                        <td><button class="action-btn btn-primary">Detail</button></td>
                                    </tr>
                                    <tr>
                                        <td>DLV-20250505-002</td>
                                        <td>2025-05-05</td>
                                        <td>Indomaret Jl. Gatot Subroto No. 45</td>
                                        <td>320</td>
                                        <td><span class="status success">Diterima</span></td>
                                        <td><button class="action-btn btn-primary">Detail</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="panel">
                    <div class="panel-header">
                        <h3>Jadwal Pengiriman</h3>
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No. Pesanan</th>
                                        <th>Tanggal Pesanan</th>
                                        <th>Outlet</th>
                                        <th>Total Item</th>
                                        <th>Jadwal Kirim</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ORD-20250508-001</td>
                                        <td>2025-05-08</td>
                                        <td>Indomaret Jl. Sudirman No. 123</td>
                                        <td>210</td>
                                        <td>2025-05-09</td>
                                        <td><span class="status pending">Menunggu</span></td>
                                        <td>
                                            <button class="action-btn btn-primary">Detail</button>
                                            <button class="action-btn btn-secondary">Perbarui</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Update content area with dashboard HTML
        contentArea.innerHTML = html;
    }
    
    // Public methods
    return {
        loadDashboard
    };
})();