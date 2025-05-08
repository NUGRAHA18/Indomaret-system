/**
 * Inventory Module
 * Handles inventory management functionality for the Indomaret Management System
 */

// Inventory module
const InventoryModule = (() => {
    // Sample inventory data
    const inventoryData = [
        { id: 'P001', name: 'Indomie Goreng', category: 'Makanan', stock: 120, min_stock: 50, max_stock: 200, price: 3500 },
        { id: 'P002', name: 'Aqua 600ml', category: 'Minuman', stock: 85, min_stock: 40, max_stock: 150, price: 4000 },
        { id: 'P003', name: 'Pocari Sweat', category: 'Minuman', stock: 42, min_stock: 20, max_stock: 100, price: 7500 },
        { id: 'P004', name: 'Chitato Original', category: 'Makanan Ringan', stock: 35, min_stock: 15, max_stock: 80, price: 9500 },
        { id: 'P005', name: 'Teh Botol Sosro', category: 'Minuman', stock: 48, min_stock: 20, max_stock: 100, price: 5000 },
        { id: 'P006', name: 'Indomie Rebus', category: 'Makanan', stock: 95, min_stock: 40, max_stock: 180, price: 3200 },
        { id: 'P007', name: 'Ultra Milk', category: 'Minuman', stock: 38, min_stock: 20, max_stock: 90, price: 6000 },
        { id: 'P008', name: 'Good Day Coffee', category: 'Minuman', stock: 52, min_stock: 25, max_stock: 120, price: 7000 },
        { id: 'P009', name: 'Silverqueen', category: 'Makanan Ringan', stock: 29, min_stock: 15, max_stock: 70, price: 12500 },
        { id: 'P010', name: 'Indomie Kari Ayam', category: 'Makanan', stock: 78, min_stock: 35, max_stock: 150, price: 3300 }
    ];
    
    // Load audit stock page
    function loadAuditStok() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        const html = `
            <div class="dashboard-header">
                <h2>Audit Stok</h2>
                <p>Kelola dan pantau akurasi stok barang di outlet</p>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Jadwal Audit</h3>
                    <button class="action-btn btn-primary" onclick="ModalManager.openModal('stockAuditModal')">Audit Baru</button>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Audit</th>
                                    <th>Tanggal</th>
                                    <th>Outlet</th>
                                    <th>Petugas</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>AUD-20250508-001</td>
                                    <td>2025-05-08</td>
                                    <td>Indomaret Jl. Sudirman No. 123</td>
                                    <td>Budi Santoso</td>
                                    <td><span class="status success">Selesai</span></td>
                                    <td>
                                        <button class="action-btn btn-primary">Lihat</button>
                                        <button class="action-btn btn-secondary">Cetak</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>AUD-20250501-001</td>
                                    <td>2025-05-01</td>
                                    <td>Indomaret Jl. Sudirman No. 123</td>
                                    <td>Budi Santoso</td>
                                    <td><span class="status success">Selesai</span></td>
                                    <td>
                                        <button class="action-btn btn-primary">Lihat</button>
                                        <button class="action-btn btn-secondary">Cetak</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>AUD-20250422-001</td>
                                    <td>2025-04-22</td>
                                    <td>Indomaret Jl. Sudirman No. 123</td>
                                    <td>Budi Santoso</td>
                                    <td><span class="status success">Selesai</span></td>
                                    <td>
                                        <button class="action-btn btn-primary">Lihat</button>
                                        <button class="action-btn btn-secondary">Cetak</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Rekap Selisih Stok</h3>
                </div>
                <div class="panel-body">
                    <div class="tabs">
                        <div class="tab active">Minggu Ini</div>
                        <div class="tab">Bulan Ini</div>
                        <div class="tab">Triwulan</div>
                    </div>
                    <div class="tab-content active">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Outlet</th>
                                        <th>Total Item</th>
                                        <th>Item Sesuai</th>
                                        <th>Item Selisih</th>
                                        <th>Persentase Akurasi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2025-05-08</td>
                                        <td>Indomaret Jl. Sudirman No. 123</td>
                                        <td>325</td>
                                        <td>318</td>
                                        <td>7</td>
                                        <td>97.8%</td>
                                    </tr>
                                    <tr>
                                        <td>2025-05-08</td>
                                        <td>Indomaret Jl. Gatot Subroto No. 45</td>
                                        <td>310</td>
                                        <td>305</td>
                                        <td>5</td>
                                        <td>98.4%</td>
                                    </tr>
                                    <tr>
                                        <td>2025-05-01</td>
                                        <td>Indomaret Jl. Sudirman No. 123</td>
                                        <td>325</td>
                                        <td>320</td>
                                        <td>5</td>
                                        <td>98.5%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Contenido para la pestaña "Bulan Ini" -->
                    </div>
                    <div class="tab-content">
                        <!-- Contenido para la pestaña "Triwulan" -->
                    </div>
                </div>
            </div>
        `;
        
        contentArea.innerHTML = html;
    }
    
    // Load stock monitoring page
    function loadMonitoringStok() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        const html = `
            <div class="dashboard-header">
                <h2>Monitoring Kebutuhan Stock</h2>
                <p>Pantau dan analisa kebutuhan stok barang di outlet</p>
            </div>
            
            <div class="inventory-cards">
                <div class="inventory-card">
                    <div class="icon">📦</div>
                    <h4>Total SKU</h4>
                    <div class="count">${inventoryData.length}</div>
                </div>
                <div class="inventory-card">
                    <div class="icon">⚠️</div>
                    <h4>Perlu Restock</h4>
                    <div class="count">${inventoryData.filter(item => item.stock < item.min_stock).length}</div>
                </div>
                <div class="inventory-card">
                    <div class="icon">🔍</div>
                    <h4>Perlu Perhatian</h4>
                    <div class="count">${inventoryData.filter(item => item.stock >= item.min_stock && item.stock < item.min_stock * 1.2).length}</div>
                </div>
                <div class="inventory-card">
                    <div class="icon">✅</div>
                    <h4>Stok Aman</h4>
                    <div class="count">${inventoryData.filter(item => item.stock >= item.min_stock * 1.2).length}</div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Daftar Barang Perlu Restock</h3>
                    <button class="action-btn btn-primary">Generate PO</button>
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
                                    <th>Rekomendasi Order</th>
                                    <th>Supplier</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${inventoryData.filter(item => item.stock < item.min_stock).map(item => `
                                    <tr>
                                        <td>${item.id}</td>
                                        <td>${item.name}</td>
                                        <td>${item.category}</td>
                                        <td>${item.stock}</td>
                                        <td>${item.min_stock}</td>
                                        <td>${Math.ceil(item.max_stock * 0.7 - item.stock)}</td>
                                        <td>PT ${item.category === 'Makanan' ? 'Indofood' : item.category === 'Minuman' ? 'Coca Cola' : 'Mayora'}</td>
                                        <td>
                                            <button class="action-btn btn-primary">Order</button>
                                            <button class="action-btn btn-secondary">Detail</button>
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
                    <h3>Daftar Barang Perlu Perhatian</h3>
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
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${inventoryData.filter(item => item.stock >= item.min_stock && item.stock < item.min_stock * 1.2).map(item => `
                                    <tr>
                                        <td>${item.id}</td>
                                        <td>${item.name}</td>
                                        <td>${item.category}</td>
                                        <td>${item.stock}</td>
                                        <td>${item.min_stock}</td>
                                        <td><span class="status pending">Perhatikan</span></td>
                                        <td>
                                            <button class="action-btn btn-primary">Order</button>
                                            <button class="action-btn btn-secondary">Detail</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        contentArea.innerHTML = html;
    }
    
    // Load stock receipt page
    function loadPenerimaanStock() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        const html = `
            <div class="dashboard-header">
                <h2>Pendataan Penerimaan Stock</h2>
                <p>Kelola penerimaan barang dari supplier</p>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Penerimaan Stock</h3>
                    <button class="action-btn btn-primary" onclick="ModalManager.openModal('stockReceiptModal')">Tambah Penerimaan</button>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>No. Penerimaan</th>
                                    <th>Tanggal</th>
                                    <th>Supplier</th>
                                    <th>Total Item</th>
                                    <th>Total Nilai</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>RCV-20250508-001</td>
                                    <td>2025-05-08</td>
                                    <td>PT Indofood Sukses Makmur</td>
                                    <td>275</td>
                                    <td>Rp 1.425.000</td>
                                    <td><span class="status success">Selesai</span></td>
                                    <td>
                                        <button class="action-btn btn-primary">Lihat</button>
                                        <button class="action-btn btn-secondary">Cetak</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>RCV-20250507-001</td>
                                    <td>2025-05-07</td>
                                    <td>PT Coca Cola Indonesia</td>
                                    <td>185</td>
                                    <td>Rp 1.276.500</td>
                                    <td><span class="status success">Selesai</span></td>
                                    <td>
                                        <button class="action-btn btn-primary">Lihat</button>
                                        <button class="action-btn btn-secondary">Cetak</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>RCV-20250506-001</td>
                                    <td>2025-05-06</td>
                                    <td>PT Mayora Indah</td>
                                    <td>120</td>
                                    <td>Rp 985.000</td>
                                    <td><span class="status success">Selesai</span></td>
                                    <td>
                                        <button class="action-btn btn-primary">Lihat</button>
                                        <button class="action-btn btn-secondary">Cetak</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Pesanan yang Belum Diterima</h3>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>No. Pesanan</th>
                                    <th>Tanggal Pesan</th>
                                    <th>Supplier</th>
                                    <th>Estimasi Tiba</th>
                                    <th>Total Item</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>PO-20250507-001</td>
                                    <td>2025-05-07</td>
                                    <td>PT Wings Food</td>
                                    <td>2025-05-09</td>
                                    <td>145</td>
                                    <td><span class="status pending">Dalam Pengiriman</span></td>
                                    <td>
                                        <button class="action-btn btn-primary">Terima</button>
                                        <button class="action-btn btn-secondary">Detail</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>PO-20250507-002</td>
                                    <td>2025-05-07</td>
                                    <td>PT Danone Indonesia</td>
                                    <td>2025-05-10</td>
                                    <td>110</td>
                                    <td><span class="status pending">Dalam Persiapan</span></td>
                                    <td>
                                        <button class="action-btn btn-primary">Terima</button>
                                        <button class="action-btn btn-secondary">Detail</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        contentArea.innerHTML = html;
    }
    
    // Public methods
    return {
        loadAuditStok,
        loadMonitoringStok,
        loadPenerimaanStock
    };
})();