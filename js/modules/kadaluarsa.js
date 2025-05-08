/**
 * Expired Product Management Module
 * Handles expired and expiring product management for the Indomaret Management System
 */

// Expired Product Management module
const KadaluarsaModule = (() => {
    // Sample expired/expiring product data
    const expiredProducts = [
        { 
            id: 'P045', 
            name: 'Susu Ultra UHT 1L', 
            category: 'Minuman', 
            batch: 'BTC-UHT-2024-12',
            expDate: '2025-05-15', 
            quantity: 5, 
            price: 16000,
            status: 'Mendekati Kedaluwarsa',
            location: 'Rak Display',
            supplier: 'PT Ultrajaya',
            daysRemaining: 7
        },
        { 
            id: 'P102', 
            name: 'Roti Tawar', 
            category: 'Makanan', 
            batch: 'BTC-RT-2024-05',
            expDate: '2025-05-11', 
            quantity: 3, 
            price: 12500,
            status: 'Mendekati Kedaluwarsa',
            location: 'Rak Display',
            supplier: 'PT Nippon Indosari',
            daysRemaining: 3
        },
        { 
            id: 'P087', 
            name: 'Yogurt Cimory', 
            category: 'Minuman', 
            batch: 'BTC-YC-2024-01',
            expDate: '2025-05-10', 
            quantity: 8, 
            price: 9500,
            status: 'Mendekati Kedaluwarsa',
            location: 'Kulkas',
            supplier: 'PT Cimory',
            daysRemaining: 2
        },
        { 
            id: 'P032', 
            name: 'Mayonaise Maestro', 
            category: 'Bumbu', 
            batch: 'BTC-MM-2023-11',
            expDate: '2025-05-08', 
            quantity: 2, 
            price: 21000,
            status: 'Mendekati Kedaluwarsa',
            location: 'Rak Bumbu',
            supplier: 'PT Heinz ABC',
            daysRemaining: 0
        },
        { 
            id: 'P215', 
            name: 'Nugget Fiesta', 
            category: 'Frozen Food', 
            batch: 'BTC-NF-2023-10',
            expDate: '2025-05-05', 
            quantity: 4, 
            price: 45000,
            status: 'Kedaluwarsa',
            location: 'Freezer',
            supplier: 'PT Charoen Pokphand',
            daysRemaining: -3
        },
        { 
            id: 'P056', 
            name: 'Sosis So Nice', 
            category: 'Frozen Food', 
            batch: 'BTC-SN-2023-10',
            expDate: '2025-05-04', 
            quantity: 6, 
            price: 27500,
            status: 'Kedaluwarsa',
            location: 'Freezer',
            supplier: 'PT So Good Food',
            daysRemaining: -4
        },
        { 
            id: 'P129', 
            name: 'Keju Kraft Cheddar', 
            category: 'Dairy', 
            batch: 'BTC-KC-2023-09',
            expDate: '2025-05-02', 
            quantity: 3, 
            price: 23000,
            status: 'Kedaluwarsa',
            location: 'Kulkas',
            supplier: 'PT Kraft Indonesia',
            daysRemaining: -6
        }
    ];
    
    // Sample disposal history data
    const disposalHistory = [
        { 
            id: 'DSP001', 
            date: '2025-05-01', 
            products: [
                { id: 'P128', name: 'Yogurt Activia', quantity: 5, batch: 'BTC-YA-2023-08', expDate: '2025-04-30' }
            ],
            totalValue: 47500,
            disposalMethod: 'Dibuang',
            approvedBy: 'Joko Widodo',
            notes: 'Produk sudah berubah warna dan bau'
        },
        { 
            id: 'DSP002', 
            date: '2025-04-25', 
            products: [
                { id: 'P112', name: 'Puding Silky', quantity: 8, batch: 'BTC-PS-2023-07', expDate: '2025-04-23' },
                { id: 'P118', name: 'Jelly Nutrijell', quantity: 3, batch: 'BTC-JN-2023-07', expDate: '2025-04-22' }
            ],
            totalValue: 63000,
            disposalMethod: 'Dibuang',
            approvedBy: 'Joko Widodo',
            notes: 'Produk sudah terkontaminasi'
        },
        { 
            id: 'DSP003', 
            date: '2025-04-18', 
            products: [
                { id: 'P075', name: 'Susu Kental Manis', quantity: 4, batch: 'BTC-SKM-2023-06', expDate: '2025-04-15' }
            ],
            totalValue: 38000,
            disposalMethod: 'Return ke Supplier',
            approvedBy: 'Joko Widodo',
            notes: 'Return sesuai perjanjian dengan supplier'
        }
    ];
    
    // Load main page content
    function loadKadaluarsa() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        const html = `
            <div class="dashboard-header">
                <h2>Pengelolaan Produk Kadaluwarsa</h2>
                <p>Kelola produk yang mendekati tanggal kedaluwarsa atau sudah kedaluwarsa</p>
            </div>
            
            <div class="dashboard-stats">
                <div class="stat-card">
                    <h3>Total Produk Bermasalah</h3>
                    <div class="value">${expiredProducts.length}</div>
                    <div class="trend">${expiredProducts.filter(p => p.daysRemaining <= 0).length} sudah kedaluwarsa</div>
                </div>
                <div class="stat-card">
                    <h3>Kedaluwarsa Hari Ini</h3>
                    <div class="value">${expiredProducts.filter(p => p.daysRemaining === 0).length}</div>
                    <div class="trend down">Perlu perhatian segera</div>
                </div>
                <div class="stat-card">
                    <h3>Mendekati Kedaluwarsa</h3>
                    <div class="value">${expiredProducts.filter(p => p.daysRemaining > 0).length}</div>
                    <div class="trend">${expiredProducts.filter(p => p.daysRemaining > 0 && p.daysRemaining <= 3).length} dalam 3 hari</div>
                </div>
                <div class="stat-card">
                    <h3>Total Nilai Kedaluwarsa</h3>
                    <div class="value">Rp ${calculateTotalValue().toLocaleString()}</div>
                    <div class="trend">Dari ${expiredProducts.reduce((sum, p) => sum + p.quantity, 0)} produk</div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Daftar Produk Kedaluwarsa & Mendekati Kedaluwarsa</h3>
                    <div>
                        <button class="action-btn btn-danger" id="disposalBtn">Proses Disposal</button>
                        <button class="action-btn btn-secondary" id="exportBtn">Export Data</button>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="tabs">
                        <div class="tab active">Semua Produk</div>
                        <div class="tab">Kedaluwarsa</div>
                        <div class="tab">Mendekati Kedaluwarsa</div>
                    </div>
                    <div class="tab-content active">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" id="selectAll"></th>
                                        <th>Kode</th>
                                        <th>Nama Produk</th>
                                        <th>Batch</th>
                                        <th>Tanggal Kedaluwarsa</th>
                                        <th>Jumlah</th>
                                        <th>Lokasi</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${expiredProducts.map(product => `
                                        <tr>
                                            <td><input type="checkbox" class="product-select" data-id="${product.id}"></td>
                                            <td>${product.id}</td>
                                            <td>${product.name}</td>
                                            <td>${product.batch}</td>
                                            <td>${product.expDate}</td>
                                            <td>${product.quantity}</td>
                                            <td>${product.location}</td>
                                            <td>
                                                <span class="status ${product.daysRemaining <= 0 ? 'danger' : 'warning'}">
                                                    ${product.status}
                                                    ${product.daysRemaining > 0 ? ` (${product.daysRemaining} hari)` : ''}
                                                </span>
                                            </td>
                                            <td>
                                                <button class="action-btn btn-primary btn-detail" data-id="${product.id}">Detail</button>
                                                <button class="action-btn btn-danger btn-dispose" data-id="${product.id}">Dispose</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Content for "Kedaluwarsa" tab -->
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" class="select-expired-all"></th>
                                        <th>Kode</th>
                                        <th>Nama Produk</th>
                                        <th>Batch</th>
                                        <th>Tanggal Kedaluwarsa</th>
                                        <th>Jumlah</th>
                                        <th>Lokasi</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${expiredProducts.filter(p => p.daysRemaining <= 0).map(product => `
                                        <tr>
                                            <td><input type="checkbox" class="product-select-expired" data-id="${product.id}"></td>
                                            <td>${product.id}</td>
                                            <td>${product.name}</td>
                                            <td>${product.batch}</td>
                                            <td>${product.expDate}</td>
                                            <td>${product.quantity}</td>
                                            <td>${product.location}</td>
                                            <td>
                                                <span class="status danger">
                                                    ${product.status}
                                                    ${product.daysRemaining < 0 ? ` (${Math.abs(product.daysRemaining)} hari)` : ''}
                                                </span>
                                            </td>
                                            <td>
                                                <button class="action-btn btn-primary btn-detail-expired" data-id="${product.id}">Detail</button>
                                                <button class="action-btn btn-danger btn-dispose-expired" data-id="${product.id}">Dispose</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Content for "Mendekati Kedaluwarsa" tab -->
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" class="select-near-all"></th>
                                        <th>Kode</th>
                                        <th>Nama Produk</th>
                                        <th>Batch</th>
                                        <th>Tanggal Kedaluwarsa</th>
                                        <th>Jumlah</th>
                                        <th>Lokasi</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${expiredProducts.filter(p => p.daysRemaining > 0).map(product => `
                                        <tr>
                                            <td><input type="checkbox" class="product-select-near" data-id="${product.id}"></td>
                                            <td>${product.id}</td>
                                            <td>${product.name}</td>
                                            <td>${product.batch}</td>
                                            <td>${product.expDate}</td>
                                            <td>${product.quantity}</td>
                                            <td>${product.location}</td>
                                            <td>
                                                <span class="status warning">
                                                    ${product.status} (${product.daysRemaining} hari)
                                                </span>
                                            </td>
                                            <td>
                                                <button class="action-btn btn-primary btn-detail-near" data-id="${product.id}">Detail</button>
                                                <button class="action-btn btn-warning btn-discount" data-id="${product.id}">Diskon</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Riwayat Disposal</h3>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tanggal</th>
                                    <th>Jumlah Produk</th>
                                    <th>Total Nilai</th>
                                    <th>Metode Disposal</th>
                                    <th>Disetujui Oleh</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${disposalHistory.map(disposal => `
                                    <tr>
                                        <td>${disposal.id}</td>
                                        <td>${disposal.date}</td>
                                        <td>${disposal.products.reduce((sum, p) => sum + p.quantity, 0)} item</td>
                                        <td>Rp ${disposal.totalValue.toLocaleString()}</td>
                                        <td>${disposal.disposalMethod}</td>
                                        <td>${disposal.approvedBy}</td>
                                        <td>
                                            <button class="action-btn btn-primary btn-view-disposal" data-id="${disposal.id}">Lihat Detail</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Detail Product Modal -->
            <div class="modal" id="productDetailModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Detail Produk</h3>
                        <button class="close-btn" data-close-modal="productDetailModal">&times;</button>
                    </div>
                    <div class="modal-body" id="productDetailContent">
                        <!-- Product details will be inserted here -->
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="productDetailModal">Tutup</button>
                    </div>
                </div>
            </div>
            
            <!-- Disposal Modal -->
            <div class="modal" id="disposalModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Proses Disposal Produk</h3>
                        <button class="close-btn" data-close-modal="disposalModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Produk yang akan diproses:</label>
                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Kode</th>
                                            <th>Nama Produk</th>
                                            <th>Batch</th>
                                            <th>Tanggal Kedaluwarsa</th>
                                            <th>Jumlah</th>
                                            <th>Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody id="disposalItemsBody">
                                        <!-- Disposal items will be inserted here -->
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="4" style="text-align: right;"><strong>Total:</strong></td>
                                            <td id="disposalTotalQty"><strong>0</strong></td>
                                            <td id="disposalTotalValue"><strong>Rp 0</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="disposalMethod">Metode Disposal</label>
                            <select id="disposalMethod">
                                <option value="dispose">Dibuang</option>
                                <option value="return">Return ke Supplier</option>
                                <option value="donate">Donasi</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="supplierReturnGroup" style="display: none;">
                            <label for="returnSupplier">Supplier</label>
                            <select id="returnSupplier">
                                <option value="">Pilih Supplier</option>
                                <option value="PT Ultrajaya">PT Ultrajaya</option>
                                <option value="PT Nippon Indosari">PT Nippon Indosari</option>
                                <option value="PT Cimory">PT Cimory</option>
                                <option value="PT Heinz ABC">PT Heinz ABC</option>
                                <option value="PT Charoen Pokphand">PT Charoen Pokphand</option>
                                <option value="PT So Good Food">PT So Good Food</option>
                                <option value="PT Kraft Indonesia">PT Kraft Indonesia</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="donationGroup" style="display: none;">
                            <label for="donationReceiver">Penerima Donasi</label>
                            <input type="text" id="donationReceiver" placeholder="Masukkan nama penerima donasi">
                        </div>
                        
                        <div class="form-group">
                            <label for="disposalNotes">Catatan</label>
                            <textarea id="disposalNotes" rows="3" placeholder="Masukkan catatan (opsional)"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="disposalModal">Batal</button>
                        <button class="action-btn btn-danger" id="confirmDisposalBtn">Proses Disposal</button>
                    </div>
                </div>
            </div>
            
            <!-- Discount Modal -->
            <div class="modal" id="discountModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Atur Diskon Produk</h3>
                        <button class="close-btn" data-close-modal="discountModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="discountProductDetails">
                            <!-- Product details will be inserted here -->
                        </div>
                        
                        <div class="form-group">
                            <label for="discountType">Jenis Diskon</label>
                            <select id="discountType">
                                <option value="percentage">Persentase (%)</option>
                                <option value="fixed">Nilai Tetap (Rp)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="discountValue">Nilai Diskon</label>
                            <input type="number" id="discountValue" min="1" value="10">
                        </div>
                        
                        <div class="form-group">
                            <label for="discountPeriod">Periode Diskon</label>
                            <div style="display: flex; gap: 10px;">
                                <input type="date" id="discountStartDate" value="${new Date().toISOString().split('T')[0]}">
                                <span style="align-self: center;">s/d</span>
                                <input type="date" id="discountEndDate" value="${new Date().toISOString().split('T')[0]}">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">
                                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                                    <div><strong>Harga Normal:</strong></div>
                                    <div id="normalPrice">Rp 0</div>
                                </div>
                                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                                    <div><strong>Diskon:</strong></div>
                                    <div id="discountAmount">Rp 0</div>
                                </div>
                                <div style="display: flex; justify-content: space-between; font-weight: bold;">
                                    <div>Harga Setelah Diskon:</div>
                                    <div id="discountedPrice">Rp 0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="discountModal">Batal</button>
                        <button class="action-btn btn-primary" id="saveDiscountBtn">Simpan</button>
                    </div>
                </div>
            </div>
            
            <!-- Disposal Detail Modal -->
            <div class="modal" id="disposalDetailModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Detail Disposal</h3>
                        <button class="close-btn" data-close-modal="disposalDetailModal">&times;</button>
                    </div>
                    <div class="modal-body" id="disposalDetailContent">
                        <!-- Disposal details will be inserted here -->
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="disposalDetailModal">Tutup</button>
                        <button class="action-btn btn-primary" id="printDisposalBtn">Cetak</button>
                    </div>
                </div>
            </div>
        `;
        
        contentArea.innerHTML = html;
        
        // Initialize event listeners
        initializeEventListeners();
    }
    
    // Initialize event listeners
    function initializeEventListeners() {
        // Tab system is already handled by TabManager
        
        // Select all checkbox
        const selectAll = document.getElementById('selectAll');
        if (selectAll) {
            selectAll.addEventListener('change', function() {
                document.querySelectorAll('.product-select').forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
            });
        }
        
        // Product detail buttons
        document.querySelectorAll('.btn-detail, .btn-detail-expired, .btn-detail-near').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                showProductDetail(productId);
            });
        });
        
        // Individual dispose buttons
        document.querySelectorAll('.btn-dispose, .btn-dispose-expired').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                showDisposalModal([productId]);
            });
        });
        
        // Discount buttons
        document.querySelectorAll('.btn-discount').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                showDiscountModal(productId);
            });
        });
        
        // Bulk disposal button
        const disposalBtn = document.getElementById('disposalBtn');
        if (disposalBtn) {
            disposalBtn.addEventListener('click', function() {
                const selectedIds = [];
                document.querySelectorAll('.product-select:checked').forEach(checkbox => {
                    selectedIds.push(checkbox.getAttribute('data-id'));
                });
                
                if (selectedIds.length === 0) {
                    alert('Pilih setidaknya satu produk untuk diproses');
                    return;
                }
                
                showDisposalModal(selectedIds);
            });
        }
        
        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', function() {
                alert('Data akan diekspor ke file Excel/CSV');
            });
        }
        
        // Disposal method change
        const disposalMethod = document.getElementById('disposalMethod');
        if (disposalMethod) {
            disposalMethod.addEventListener('change', function() {
                const supplierReturnGroup = document.getElementById('supplierReturnGroup');
                const donationGroup = document.getElementById('donationGroup');
                
                supplierReturnGroup.style.display = this.value === 'return' ? 'block' : 'none';
                donationGroup.style.display = this.value === 'donate' ? 'block' : 'none';
            });
        }
        
        // Confirm disposal button
        const confirmDisposalBtn = document.getElementById('confirmDisposalBtn');
        if (confirmDisposalBtn) {
            confirmDisposalBtn.addEventListener('click', function() {
                processDisposal();
            });
        }
        
        // View disposal detail buttons
        document.querySelectorAll('.btn-view-disposal').forEach(button => {
            button.addEventListener('click', function() {
                const disposalId = this.getAttribute('data-id');
                showDisposalDetail(disposalId);
            });
        });
        
        // Discount value and type change
        const discountValue = document.getElementById('discountValue');
        const discountType = document.getElementById('discountType');
        if (discountValue && discountType) {
            const updateDiscountPreview = function() {
                const productId = document.getElementById('discountModal').getAttribute('data-product-id');
                const product = expiredProducts.find(p => p.id === productId);
                if (!product) return;
                
                const value = parseInt(discountValue.value) || 0;
                const type = discountType.value;
                
                const normalPrice = product.price;
                let discountAmount = 0;
                let finalPrice = normalPrice;
                
                if (type === 'percentage') {
                    discountAmount = normalPrice * (value / 100);
                    finalPrice = normalPrice - discountAmount;
                } else {
                    discountAmount = value;
                    finalPrice = normalPrice - discountAmount;
                    if (finalPrice < 0) finalPrice = 0;
                }
                
                document.getElementById('normalPrice').textContent = `Rp ${normalPrice.toLocaleString()}`;
                document.getElementById('discountAmount').textContent = `Rp ${discountAmount.toLocaleString()}`;
                document.getElementById('discountedPrice').textContent = `Rp ${finalPrice.toLocaleString()}`;
            };
            
            discountValue.addEventListener('input', updateDiscountPreview);
            discountType.addEventListener('change', updateDiscountPreview);
        }
        
        // Save discount button
        const saveDiscountBtn = document.getElementById('saveDiscountBtn');
        if (saveDiscountBtn) {
            saveDiscountBtn.addEventListener('click', function() {
                alert('Diskon telah berhasil diterapkan pada produk');
                document.getElementById('discountModal').style.display = 'none';
            });
        }
        
        // Print disposal button
        const printDisposalBtn = document.getElementById('printDisposalBtn');
        if (printDisposalBtn) {
            printDisposalBtn.addEventListener('click', function() {
                alert('Laporan disposal akan dicetak');
            });
        }
    }
    
    // Show product detail modal
    function showProductDetail(productId) {
        const product = expiredProducts.find(p => p.id === productId);
        if (!product) return;
        
        const productDetailContent = document.getElementById('productDetailContent');
        if (productDetailContent) {
            productDetailContent.innerHTML = `
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div><strong>Kode:</strong> ${product.id}</div>
                        <div><strong>Kategori:</strong> ${product.category}</div>
                    </div>
                    <div style="margin-bottom: 10px;"><strong>Nama Produk:</strong> ${product.name}</div>
                    <div style="margin-bottom: 10px;"><strong>Batch:</strong> ${product.batch}</div>
                    <div style="margin-bottom: 10px;"><strong>Tanggal Kedaluwarsa:</strong> ${product.expDate}</div>
                    <div style="margin-bottom: 10px;"><strong>Status:</strong> 
                        <span class="${product.daysRemaining <= 0 ? 'text-danger' : 'text-warning'}">
                            ${product.status}
                            ${product.daysRemaining > 0 ? ` (${product.daysRemaining} hari lagi)` : 
                              product.daysRemaining < 0 ? ` (${Math.abs(product.daysRemaining)} hari yang lalu)` : ''}
                        </span>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div style="margin-bottom: 10px;"><strong>Jumlah:</strong> ${product.quantity}</div>
                        <div style="margin-bottom: 10px;"><strong>Harga Satuan:</strong> Rp ${product.price.toLocaleString()}</div>
                        <div style="margin-bottom: 10px;"><strong>Total Nilai:</strong> Rp ${(product.quantity * product.price).toLocaleString()}</div>
                    </div>
                    <div class="col-md-6">
                        <div style="margin-bottom: 10px;"><strong>Lokasi:</strong> ${product.location}</div>
                        <div style="margin-bottom: 10px;"><strong>Supplier:</strong> ${product.supplier}</div>
                    </div>
                </div>
                
                <div style="margin-top: 20px;">
                    <h4>Rekomendasi Tindakan:</h4>
                    <ul>
                        ${product.daysRemaining <= 0 ? `
                            <li>Segera lakukan disposal produk</li>
                            <li>Jika memungkinkan, proses return ke supplier</li>
                        ` : `
                            <li>Berikan diskon untuk mempercepat penjualan</li>
                            <li>Pindahkan ke area promosi khusus</li>
                            <li>Lakukan review stok dan kurangi pemesanan berikutnya</li>
                        `}
                    </ul>
                </div>
            `;
        }
        
        const modal = document.getElementById('productDetailModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Show disposal modal for selected products
    function showDisposalModal(productIds) {
        // Get products data
        const selectedProducts = expiredProducts.filter(p => productIds.includes(p.id));
        if (selectedProducts.length === 0) return;
        
        // Update disposal items table
        const disposalItemsBody = document.getElementById('disposalItemsBody');
        if (disposalItemsBody) {
            disposalItemsBody.innerHTML = selectedProducts.map(product => `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.batch}</td>
                    <td>${product.expDate}</td>
                    <td>${product.quantity}</td>
                    <td>Rp ${(product.quantity * product.price).toLocaleString()}</td>
                </tr>
            `).join('');
        }
        
        // Update totals
        const totalQty = selectedProducts.reduce((sum, p) => sum + p.quantity, 0);
        const totalValue = selectedProducts.reduce((sum, p) => sum + (p.quantity * p.price), 0);
        
        document.getElementById('disposalTotalQty').textContent = totalQty;
        document.getElementById('disposalTotalValue').textContent = `Rp ${totalValue.toLocaleString()}`;
        
        // Reset form
        document.getElementById('disposalMethod').value = 'dispose';
        document.getElementById('supplierReturnGroup').style.display = 'none';
        document.getElementById('donationGroup').style.display = 'none';
        document.getElementById('disposalNotes').value = '';
        
        // Store product IDs in the modal
        const modal = document.getElementById('disposalModal');
        if (modal) {
            modal.setAttribute('data-product-ids', JSON.stringify(productIds));
            modal.style.display = 'flex';
        }
    }
    
    // Process disposal
    function processDisposal() {
        const modal = document.getElementById('disposalModal');
        if (!modal) return;
        
        const productIdsJSON = modal.getAttribute('data-product-ids');
        if (!productIdsJSON) return;
        
        const productIds = JSON.parse(productIdsJSON);
        const selectedProducts = expiredProducts.filter(p => productIds.includes(p.id));
        if (selectedProducts.length === 0) return;
        
        const disposalMethod = document.getElementById('disposalMethod').value;
        const supplierReturn = document.getElementById('returnSupplier').value;
        const donationReceiver = document.getElementById('donationReceiver').value;
        const notes = document.getElementById('disposalNotes').value;
        
        // Validate input
        if (disposalMethod === 'return' && !supplierReturn) {
            alert('Harap pilih supplier untuk proses return');
            return;
        }
        
        if (disposalMethod === 'donate' && !donationReceiver.trim()) {
            alert('Harap masukkan nama penerima donasi');
            return;
        }
        
        // Calculate total value
        const totalValue = selectedProducts.reduce((sum, p) => sum + (p.quantity * p.price), 0);
        
        // Create new disposal record
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        
        // Convert disposal method to display text
        let methodDisplay = '';
        switch (disposalMethod) {
            case 'dispose': methodDisplay = 'Dibuang'; break;
            case 'return': methodDisplay = 'Return ke Supplier'; break;
            case 'donate': methodDisplay = 'Donasi'; break;
        }
        
        const newDisposal = {
            id: 'DSP' + (disposalHistory.length + 1).toString().padStart(3, '0'),
            date: dateStr,
            products: selectedProducts.map(p => ({
                id: p.id,
                name: p.name,
                quantity: p.quantity,
                batch: p.batch,
                expDate: p.expDate
            })),
            totalValue: totalValue,
            disposalMethod: methodDisplay,
            approvedBy: 'Joko Widodo', // Current user name would be dynamically retrieved in a real app
            notes: notes,
            supplier: disposalMethod === 'return' ? supplierReturn : null,
            receiver: disposalMethod === 'donate' ? donationReceiver : null
        };
        
        // Add to history
        disposalHistory.unshift(newDisposal);
        
        // Remove products from expired list
        productIds.forEach(id => {
            const index = expiredProducts.findIndex(p => p.id === id);
            if (index !== -1) {
                expiredProducts.splice(index, 1);
            }
        });
        
        // Close modal
        modal.style.display = 'none';
        
        // Show confirmation and reload page
        alert('Proses disposal berhasil disimpan');
        loadKadaluarsa(); // Reload the page to reflect changes
    }
    
    // Show discount modal
    function showDiscountModal(productId) {
        const product = expiredProducts.find(p => p.id === productId);
        if (!product) return;
        
        // Update product details
        const discountProductDetails = document.getElementById('discountProductDetails');
        if (discountProductDetails) {
            discountProductDetails.innerHTML = `
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div><strong>Kode:</strong> ${product.id}</div>
                        <div><strong>Kategori:</strong> ${product.category}</div>
                    </div>
                    <div style="margin-bottom: 10px;"><strong>Nama Produk:</strong> ${product.name}</div>
                    <div style="margin-bottom: 10px;"><strong>Tanggal Kedaluwarsa:</strong> ${product.expDate} (${product.daysRemaining} hari lagi)</div>
                    <div style="margin-bottom: 10px;"><strong>Jumlah:</strong> ${product.quantity}</div>
                    <div><strong>Harga Normal:</strong> Rp ${product.price.toLocaleString()}</div>
                </div>
            `;
        }
        
        // Reset form and update preview
        document.getElementById('discountType').value = 'percentage';
        document.getElementById('discountValue').value = '10';
        
        // Set end date to product expiry date
        const today = new Date();
        const expDate = new Date(product.expDate);
        
        document.getElementById('discountStartDate').value = today.toISOString().split('T')[0];
        document.getElementById('discountEndDate').value = product.expDate;
        
        // Update price preview
        document.getElementById('normalPrice').textContent = `Rp ${product.price.toLocaleString()}`;
        const discountAmount = product.price * 0.1; // 10% default
        document.getElementById('discountAmount').textContent = `Rp ${discountAmount.toLocaleString()}`;
        document.getElementById('discountedPrice').textContent = `Rp ${(product.price - discountAmount).toLocaleString()}`;
        
        // Store product ID in the modal
        const modal = document.getElementById('discountModal');
        if (modal) {
            modal.setAttribute('data-product-id', productId);
            modal.style.display = 'flex';
        }
    }
    
    // Show disposal detail
    function showDisposalDetail(disposalId) {
        const disposal = disposalHistory.find(d => d.id === disposalId);
        if (!disposal) return;
        
        const disposalDetailContent = document.getElementById('disposalDetailContent');
        if (disposalDetailContent) {
            disposalDetailContent.innerHTML = `
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div><strong>ID Disposal:</strong> ${disposal.id}</div>
                        <div><strong>Tanggal:</strong> ${disposal.date}</div>
                    </div>
                    <div style="margin-bottom: 10px;"><strong>Metode Disposal:</strong> ${disposal.disposalMethod}</div>
                    <div style="margin-bottom: 10px;"><strong>Disetujui Oleh:</strong> ${disposal.approvedBy}</div>
                    ${disposal.supplier ? `<div style="margin-bottom: 10px;"><strong>Supplier:</strong> ${disposal.supplier}</div>` : ''}
                    ${disposal.receiver ? `<div style="margin-bottom: 10px;"><strong>Penerima Donasi:</strong> ${disposal.receiver}</div>` : ''}
                    ${disposal.notes ? `<div><strong>Catatan:</strong> ${disposal.notes}</div>` : ''}
                </div>
                
                <h4>Daftar Produk:</h4>
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Kode</th>
                                <th>Nama Produk</th>
                                <th>Batch</th>
                                <th>Tanggal Kedaluwarsa</th>
                                <th>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${disposal.products.map(product => `
                                <tr>
                                    <td>${product.id}</td>
                                    <td>${product.name}</td>
                                    <td>${product.batch}</td>
                                    <td>${product.expDate}</td>
                                    <td>${product.quantity}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4" style="text-align: right;"><strong>Total:</strong></td>
                                <td><strong>${disposal.products.reduce((sum, p) => sum + p.quantity, 0)}</strong></td>
                            </tr>
                            <tr>
                                <td colspan="4" style="text-align: right;"><strong>Total Nilai:</strong></td>
                                <td><strong>Rp ${disposal.totalValue.toLocaleString()}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            `;
        }
        
        const modal = document.getElementById('disposalDetailModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Calculate total value of expired products
    function calculateTotalValue() {
        return expiredProducts.reduce((sum, product) => sum + (product.quantity * product.price), 0);
    }
    
    // Public methods
    return {
        loadKadaluarsa
    };
})();