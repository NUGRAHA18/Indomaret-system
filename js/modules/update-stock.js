/**
 * Update Stock Module
 * Handles stock data updates for the Indomaret Management System
 */

// Update Stock module
const UpdateStockModule = (() => {
    // Sample inventory data
    const inventoryData = [
        { id: 'P001', name: 'Indomie Goreng', category: 'Makanan', stock: 120, max_stock: 200, min_stock: 50, price: 3500, unit: 'pcs', supplier: 'PT Indofood', lastUpdate: '2025-05-01' },
        { id: 'P002', name: 'Aqua 600ml', category: 'Minuman', stock: 85, max_stock: 150, min_stock: 40, price: 4000, unit: 'pcs', supplier: 'PT Danone', lastUpdate: '2025-05-02' },
        { id: 'P003', name: 'Pocari Sweat', category: 'Minuman', stock: 42, max_stock: 100, min_stock: 20, price: 7500, unit: 'pcs', supplier: 'PT Amerta Indah', lastUpdate: '2025-05-03' },
        { id: 'P004', name: 'Chitato Original', category: 'Makanan Ringan', stock: 35, max_stock: 80, min_stock: 15, price: 9500, unit: 'pcs', supplier: 'PT Indofood', lastUpdate: '2025-05-03' },
        { id: 'P005', name: 'Teh Botol Sosro', category: 'Minuman', stock: 48, max_stock: 100, min_stock: 20, price: 5000, unit: 'pcs', supplier: 'PT Sinar Sosro', lastUpdate: '2025-05-04' },
        { id: 'P006', name: 'Indomie Rebus', category: 'Makanan', stock: 95, max_stock: 180, min_stock: 40, price: 3200, unit: 'pcs', supplier: 'PT Indofood', lastUpdate: '2025-05-04' },
        { id: 'P007', name: 'Ultra Milk', category: 'Minuman', stock: 38, max_stock: 90, min_stock: 20, price: 6000, unit: 'pcs', supplier: 'PT Ultrajaya', lastUpdate: '2025-05-04' },
        { id: 'P008', name: 'Good Day Coffee', category: 'Minuman', stock: 52, max_stock: 120, min_stock: 25, price: 7000, unit: 'pcs', supplier: 'PT Santos Jaya', lastUpdate: '2025-05-05' },
        { id: 'P009', name: 'Silverqueen', category: 'Makanan Ringan', stock: 29, max_stock: 70, min_stock: 15, price: 12500, unit: 'pcs', supplier: 'PT Mayora Indah', lastUpdate: '2025-05-06' },
        { id: 'P010', name: 'Indomie Kari Ayam', category: 'Makanan', stock: 78, max_stock: 150, min_stock: 35, price: 3300, unit: 'pcs', supplier: 'PT Indofood', lastUpdate: '2025-05-07' }
    ];

    // Sample stock adjustment history
    const stockAdjustmentHistory = [
        { id: 'ADJ001', productId: 'P001', date: '2025-05-07', oldStock: 115, newStock: 120, adjustmentType: 'Tambah', reason: 'Penerimaan barang', user: 'Joko Widodo' },
        { id: 'ADJ002', productId: 'P003', date: '2025-05-07', oldStock: 45, newStock: 42, adjustmentType: 'Kurang', reason: 'Barang rusak', user: 'Joko Widodo' },
        { id: 'ADJ003', productId: 'P005', date: '2025-05-06', oldStock: 45, newStock: 48, adjustmentType: 'Tambah', reason: 'Stock opname', user: 'Joko Widodo' },
        { id: 'ADJ004', productId: 'P008', date: '2025-05-05', oldStock: 50, newStock: 52, adjustmentType: 'Tambah', reason: 'Penerimaan barang', user: 'Joko Widodo' },
        { id: 'ADJ005', productId: 'P004', date: '2025-05-04', oldStock: 40, newStock: 35, adjustmentType: 'Kurang', reason: 'Barang kedaluwarsa', user: 'Joko Widodo' }
    ];

    // Load update stock page
    function loadUpdateStock() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        const html = `
            <div class="dashboard-header">
                <h2>Update Data Stock</h2>
                <p>Update dan pantau perubahan stok barang di outlet</p>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Pencarian Produk</h3>
                </div>
                <div class="panel-body">
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 20px;">
                        <div class="form-group" style="flex: 2; min-width: 200px;">
                            <label for="searchProduct">Cari Produk</label>
                            <input type="text" id="searchProduct" placeholder="Masukkan kode atau nama produk...">
                        </div>
                        <div class="form-group" style="flex: 1; min-width: 150px;">
                            <label for="categoryFilter">Kategori</label>
                            <select id="categoryFilter">
                                <option value="">Semua Kategori</option>
                                <option value="Makanan">Makanan</option>
                                <option value="Minuman">Minuman</option>
                                <option value="Makanan Ringan">Makanan Ringan</option>
                                <option value="Toiletries">Toiletries</option>
                                <option value="Household">Household</option>
                            </select>
                        </div>
                        <div class="form-group" style="flex: 1; min-width: 150px;">
                            <label for="stockFilter">Filter Stok</label>
                            <select id="stockFilter">
                                <option value="">Semua Stok</option>
                                <option value="low">Stok Rendah</option>
                                <option value="normal">Stok Normal</option>
                                <option value="high">Stok Tinggi</option>
                            </select>
                        </div>
                        <div class="form-group" style="align-self: flex-end;">
                            <button class="action-btn btn-primary" id="searchBtn">Cari</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Daftar Produk</h3>
                    <button class="action-btn btn-primary" id="massUpdateBtn">Mass Update</button>
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
                                    <th>Satuan</th>
                                    <th>Update Terakhir</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="productTableBody">
                                ${inventoryData.map(product => {
                                    // Determine stock status
                                    let stockStatus = '';
                                    let statusClass = '';
                                    
                                    if (product.stock <= product.min_stock) {
                                        stockStatus = 'Rendah';
                                        statusClass = 'danger';
                                    } else if (product.stock >= product.max_stock * 0.8) {
                                        stockStatus = 'Tinggi';
                                        statusClass = 'success';
                                    } else {
                                        stockStatus = 'Normal';
                                        statusClass = 'pending';
                                    }
                                    
                                    return `
                                        <tr>
                                            <td>${product.id}</td>
                                            <td>${product.name}</td>
                                            <td>${product.category}</td>
                                            <td>${product.stock}</td>
                                            <td>${product.unit}</td>
                                            <td>${product.lastUpdate}</td>
                                            <td><span class="status ${statusClass}">${stockStatus}</span></td>
                                            <td>
                                                <button class="action-btn btn-primary btn-update-stock" data-id="${product.id}">Update</button>
                                                <button class="action-btn btn-secondary btn-history" data-id="${product.id}">History</button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Stock Adjustment Modal -->
            <div class="modal" id="stockAdjustmentModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Update Stock</h3>
                        <button class="close-btn" data-close-modal="stockAdjustmentModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="productDetails">
                            <!-- Product details will be inserted here -->
                        </div>
                        
                        <div class="form-group">
                            <label for="adjustmentType">Jenis Perubahan</label>
                            <select id="adjustmentType">
                                <option value="add">Tambah</option>
                                <option value="subtract">Kurang</option>
                                <option value="set">Set Nilai Baru</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="adjustmentAmount">Jumlah</label>
                            <input type="number" id="adjustmentAmount" min="1" value="1">
                        </div>
                        
                        <div class="form-group">
                            <label for="adjustmentReason">Alasan</label>
                            <select id="adjustmentReason">
                                <option value="receipt">Penerimaan Barang</option>
                                <option value="damaged">Barang Rusak</option>
                                <option value="expired">Barang Kedaluwarsa</option>
                                <option value="stockopname">Stock Opname</option>
                                <option value="return">Return ke Supplier</option>
                                <option value="other">Lainnya</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="otherReasonGroup" style="display: none;">
                            <label for="otherReason">Alasan Lainnya</label>
                            <input type="text" id="otherReason" placeholder="Masukkan alasan">
                        </div>
                        
                        <div class="form-group">
                            <label for="adjustmentNote">Catatan (Opsional)</label>
                            <textarea id="adjustmentNote" rows="2"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="stockAdjustmentModal">Batal</button>
                        <button class="action-btn btn-primary" id="saveAdjustmentBtn">Simpan</button>
                    </div>
                </div>
            </div>
            
            <!-- Stock History Modal -->
            <div class="modal" id="stockHistoryModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Riwayat Perubahan Stock</h3>
                        <button class="close-btn" data-close-modal="stockHistoryModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="historyProductDetails">
                            <!-- Product details will be inserted here -->
                        </div>
                        
                        <div class="table-responsive" style="margin-top: 20px;">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Stok Sebelumnya</th>
                                        <th>Stok Baru</th>
                                        <th>Perubahan</th>
                                        <th>Jenis</th>
                                        <th>Alasan</th>
                                        <th>User</th>
                                    </tr>
                                </thead>
                                <tbody id="historyTableBody">
                                    <!-- History data will be inserted here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="stockHistoryModal">Tutup</button>
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
        // Update stock buttons
        document.querySelectorAll('.btn-update-stock').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                openStockAdjustmentModal(productId);
            });
        });
        
        // View history buttons
        document.querySelectorAll('.btn-history').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                openStockHistoryModal(productId);
            });
        });
        
        // Adjustment reason change
        const adjustmentReason = document.getElementById('adjustmentReason');
        if (adjustmentReason) {
            adjustmentReason.addEventListener('change', function() {
                const otherReasonGroup = document.getElementById('otherReasonGroup');
                if (this.value === 'other') {
                    otherReasonGroup.style.display = 'block';
                } else {
                    otherReasonGroup.style.display = 'none';
                }
            });
        }
        
        // Save adjustment button
        const saveAdjustmentBtn = document.getElementById('saveAdjustmentBtn');
        if (saveAdjustmentBtn) {
            saveAdjustmentBtn.addEventListener('click', function() {
                saveStockAdjustment();
            });
        }
        
        // Search button
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                filterProducts();
            });
        }
        
        // Search input enter key
        const searchInput = document.getElementById('searchProduct');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    filterProducts();
                }
            });
        }
        
        // Mass update button
        const massUpdateBtn = document.getElementById('massUpdateBtn');
        if (massUpdateBtn) {
            massUpdateBtn.addEventListener('click', function() {
                alert('Fitur Mass Update akan memungkinkan Anda untuk mengupdate stok beberapa produk sekaligus dengan upload file Excel atau CSV.');
            });
        }
    }
    
    // Open stock adjustment modal
    function openStockAdjustmentModal(productId) {
        const product = inventoryData.find(p => p.id === productId);
        if (!product) return;
        
        // Update product details in modal
        const productDetails = document.getElementById('productDetails');
        if (productDetails) {
            productDetails.innerHTML = `
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div><strong>Kode:</strong> ${product.id}</div>
                        <div><strong>Kategori:</strong> ${product.category}</div>
                    </div>
                    <div style="margin-bottom: 10px;"><strong>Nama Produk:</strong> ${product.name}</div>
                    <div style="display: flex; justify-content: space-between;">
                        <div><strong>Stok Saat Ini:</strong> ${product.stock} ${product.unit}</div>
                        <div><strong>Update Terakhir:</strong> ${product.lastUpdate}</div>
                    </div>
                </div>
            `;
        }
        
        // Reset form
        const adjustmentAmount = document.getElementById('adjustmentAmount');
        if (adjustmentAmount) {
            adjustmentAmount.value = '1';
        }
        
        const adjustmentType = document.getElementById('adjustmentType');
        if (adjustmentType) {
            adjustmentType.value = 'add';
        }
        
        const adjustmentReason = document.getElementById('adjustmentReason');
        if (adjustmentReason) {
            adjustmentReason.value = 'receipt';
        }
        
        const otherReasonGroup = document.getElementById('otherReasonGroup');
        if (otherReasonGroup) {
            otherReasonGroup.style.display = 'none';
        }
        
        const otherReason = document.getElementById('otherReason');
        if (otherReason) {
            otherReason.value = '';
        }
        
        const adjustmentNote = document.getElementById('adjustmentNote');
        if (adjustmentNote) {
            adjustmentNote.value = '';
        }
        
        // Store current product ID in the modal
        const modal = document.getElementById('stockAdjustmentModal');
        if (modal) {
            modal.setAttribute('data-product-id', productId);
            modal.style.display = 'flex';
        }
    }
    
    // Open stock history modal
    function openStockHistoryModal(productId) {
        const product = inventoryData.find(p => p.id === productId);
        if (!product) return;
        
        // Update product details in modal
        const historyProductDetails = document.getElementById('historyProductDetails');
        if (historyProductDetails) {
            historyProductDetails.innerHTML = `
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div><strong>Kode:</strong> ${product.id}</div>
                        <div><strong>Kategori:</strong> ${product.category}</div>
                    </div>
                    <div style="margin-bottom: 10px;"><strong>Nama Produk:</strong> ${product.name}</div>
                    <div><strong>Stok Saat Ini:</strong> ${product.stock} ${product.unit}</div>
                </div>
            `;
        }
        
        // Filter history for this product
        const productHistory = stockAdjustmentHistory.filter(h => h.productId === productId);
        
        // Update history table
        const historyTableBody = document.getElementById('historyTableBody');
        if (historyTableBody) {
            if (productHistory.length > 0) {
                historyTableBody.innerHTML = productHistory.map(history => {
                    const change = history.newStock - history.oldStock;
                    const changeType = change > 0 ? 'Tambah' : 'Kurang';
                    const changeClass = change > 0 ? 'success' : 'danger';
                    
                    return `
                        <tr>
                            <td>${history.date}</td>
                            <td>${history.oldStock}</td>
                            <td>${history.newStock}</td>
                            <td><span class="status ${changeClass}">${change > 0 ? '+' : ''}${change}</span></td>
                            <td>${history.adjustmentType}</td>
                            <td>${history.reason}</td>
                            <td>${history.user}</td>
                        </tr>
                    `;
                }).join('');
            } else {
                historyTableBody.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align: center;">Tidak ada riwayat perubahan stock untuk produk ini</td>
                    </tr>
                `;
            }
        }
        
        // Show modal
        const modal = document.getElementById('stockHistoryModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Save stock adjustment
    function saveStockAdjustment() {
        const modal = document.getElementById('stockAdjustmentModal');
        if (!modal) return;
        
        const productId = modal.getAttribute('data-product-id');
        const product = inventoryData.find(p => p.id === productId);
        if (!product) return;
        
        const adjustmentType = document.getElementById('adjustmentType').value;
        const adjustmentAmount = parseInt(document.getElementById('adjustmentAmount').value) || 0;
        const adjustmentReason = document.getElementById('adjustmentReason').value;
        const otherReason = document.getElementById('otherReason').value;
        const adjustmentNote = document.getElementById('adjustmentNote').value;
        
        // Validate input
        if (adjustmentAmount <= 0) {
            alert('Jumlah harus lebih dari 0');
            return;
        }
        
        if (adjustmentReason === 'other' && !otherReason.trim()) {
            alert('Harap masukkan alasan perubahan');
            return;
        }
        
        // Calculate new stock
        let newStock = product.stock;
        switch (adjustmentType) {
            case 'add':
                newStock += adjustmentAmount;
                break;
            case 'subtract':
                newStock -= adjustmentAmount;
                if (newStock < 0) {
                    alert('Stok tidak boleh kurang dari 0');
                    return;
                }
                break;
            case 'set':
                newStock = adjustmentAmount;
                break;
        }
        
        // Get reason text
        let reasonText = '';
        switch (adjustmentReason) {
            case 'receipt': reasonText = 'Penerimaan Barang'; break;
            case 'damaged': reasonText = 'Barang Rusak'; break;
            case 'expired': reasonText = 'Barang Kedaluwarsa'; break;
            case 'stockopname': reasonText = 'Stock Opname'; break;
            case 'return': reasonText = 'Return ke Supplier'; break;
            case 'other': reasonText = otherReason; break;
        }
        
        // Create new history entry
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        
        const newHistory = {
            id: 'ADJ' + (stockAdjustmentHistory.length + 1).toString().padStart(3, '0'),
            productId: product.id,
            date: dateStr,
            oldStock: product.stock,
            newStock: newStock,
            adjustmentType: adjustmentType === 'add' ? 'Tambah' : 
                           adjustmentType === 'subtract' ? 'Kurang' : 'Set Nilai',
            reason: reasonText,
            user: 'Joko Widodo', // Current user name would be dynamically retrieved in a real app
            note: adjustmentNote
        };
        
        // Update product stock
        product.stock = newStock;
        product.lastUpdate = dateStr;
        
        // Add to history
        stockAdjustmentHistory.unshift(newHistory);
        
        // Update UI
        const productRow = document.querySelector(`tr td:first-child:contains(${product.id})`).closest('tr');
        if (productRow) {
            // Determine new stock status
            let stockStatus = '';
            let statusClass = '';
            
            if (product.stock <= product.min_stock) {
                stockStatus = 'Rendah';
                statusClass = 'danger';
            } else if (product.stock >= product.max_stock * 0.8) {
                stockStatus = 'Tinggi';
                statusClass = 'success';
            } else {
                stockStatus = 'Normal';
                statusClass = 'pending';
            }
            
            // Update row content
            productRow.cells[3].textContent = product.stock;
            productRow.cells[5].textContent = product.lastUpdate;
            productRow.cells[6].innerHTML = `<span class="status ${statusClass}">${stockStatus}</span>`;
        }
        
        // Close modal
        modal.style.display = 'none';
        
        // Show confirmation
        alert('Perubahan stock berhasil disimpan');
    }
    
    // Filter products based on search criteria
    function filterProducts() {
        const searchQuery = document.getElementById('searchProduct').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const stockFilter = document.getElementById('stockFilter').value;
        
        // Filter products
        const filteredProducts = inventoryData.filter(product => {
            // Search query filter
            const matchesSearch = searchQuery === '' || 
                product.id.toLowerCase().includes(searchQuery) || 
                product.name.toLowerCase().includes(searchQuery);
            
            // Category filter
            const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
            
            // Stock filter
            let matchesStock = true;
            if (stockFilter === 'low') {
                matchesStock = product.stock <= product.min_stock;
            } else if (stockFilter === 'normal') {
                matchesStock = product.stock > product.min_stock && product.stock < product.max_stock * 0.8;
            } else if (stockFilter === 'high') {
                matchesStock = product.stock >= product.max_stock * 0.8;
            }
            
            return matchesSearch && matchesCategory && matchesStock;
        });
        
        // Update table
        const productTableBody = document.getElementById('productTableBody');
        if (productTableBody) {
            if (filteredProducts.length > 0) {
                productTableBody.innerHTML = filteredProducts.map(product => {
                    // Determine stock status
                    let stockStatus = '';
                    let statusClass = '';
                    
                    if (product.stock <= product.min_stock) {
                        stockStatus = 'Rendah';
                        statusClass = 'danger';
                    } else if (product.stock >= product.max_stock * 0.8) {
                        stockStatus = 'Tinggi';
                        statusClass = 'success';
                    } else {
                        stockStatus = 'Normal';
                        statusClass = 'pending';
                    }
                    
                    return `
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.category}</td>
                            <td>${product.stock}</td>
                            <td>${product.unit}</td>
                            <td>${product.lastUpdate}</td>
                            <td><span class="status ${statusClass}">${stockStatus}</span></td>
                            <td>
                                <button class="action-btn btn-primary btn-update-stock" data-id="${product.id}">Update</button>
                                <button class="action-btn btn-secondary btn-history" data-id="${product.id}">History</button>
                            </td>
                        </tr>
                    `;
                }).join('');
                
                // Re-initialize event listeners for new buttons
                initializeEventListeners();
            } else {
                productTableBody.innerHTML = `
                    <tr>
                        <td colspan="8" style="text-align: center;">Tidak ada produk yang sesuai dengan kriteria pencarian</td>
                    </tr>
                `;
            }
        }
    }
    
    // Public methods
    return {
        loadUpdateStock
    };
})();