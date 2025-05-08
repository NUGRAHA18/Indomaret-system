/**
 * Update Harga Module
 * Handles price updates for outlet products in the Indomaret Management System
 */

// Update Harga module
const UpdateHargaModule = (() => {
    // Sample product data with price information
    const productData = [
        { id: 'P001', name: 'Indomie Goreng', category: 'Makanan', currentPrice: 3500, suggestedPrice: 3700, lastUpdate: '2025-04-15', margin: 15, status: 'Normal' },
        { id: 'P002', name: 'Aqua 600ml', category: 'Minuman', currentPrice: 4000, suggestedPrice: 4000, lastUpdate: '2025-04-20', margin: 12, status: 'Normal' },
        { id: 'P003', name: 'Pocari Sweat', category: 'Minuman', currentPrice: 7500, suggestedPrice: 8000, lastUpdate: '2025-04-10', margin: 18, status: 'Review' },
        { id: 'P004', name: 'Chitato Original', category: 'Makanan Ringan', currentPrice: 9500, suggestedPrice: 10000, lastUpdate: '2025-04-05', margin: 20, status: 'Review' },
        { id: 'P005', name: 'Teh Botol Sosro', category: 'Minuman', currentPrice: 5000, suggestedPrice: 5000, lastUpdate: '2025-04-25', margin: 15, status: 'Normal' },
        { id: 'P006', name: 'Indomie Rebus', category: 'Makanan', currentPrice: 3200, suggestedPrice: 3500, lastUpdate: '2025-04-15', margin: 15, status: 'Review' },
        { id: 'P007', name: 'Ultra Milk', category: 'Minuman', currentPrice: 6000, suggestedPrice: 6000, lastUpdate: '2025-04-22', margin: 14, status: 'Normal' },
        { id: 'P008', name: 'Good Day Coffee', category: 'Minuman', currentPrice: 7000, suggestedPrice: 7000, lastUpdate: '2025-04-18', margin: 22, status: 'Normal' },
        { id: 'P009', name: 'Silverqueen', category: 'Makanan Ringan', currentPrice: 12500, suggestedPrice: 13000, lastUpdate: '2025-04-12', margin: 25, status: 'Review' },
        { id: 'P010', name: 'Indomie Kari Ayam', category: 'Makanan', currentPrice: 3300, suggestedPrice: 3500, lastUpdate: '2025-04-15', margin: 15, status: 'Review' }
    ];
    
    // Sample price update history
    const priceUpdateHistory = [
        { id: 'PU001', productId: 'P003', date: '2025-04-10', oldPrice: 7000, newPrice: 7500, reason: 'Kenaikan harga supplier', approvedBy: 'Joko Widodo' },
        { id: 'PU002', productId: 'P004', date: '2025-04-05', oldPrice: 9000, newPrice: 9500, reason: 'Penyesuaian harga pasar', approvedBy: 'Joko Widodo' },
        { id: 'PU003', productId: 'P009', date: '2025-04-12', oldPrice: 12000, newPrice: 12500, reason: 'Kenaikan harga supplier', approvedBy: 'Joko Widodo' },
        { id: 'PU004', productId: 'P001', date: '2025-04-15', oldPrice: 3200, newPrice: 3500, reason: 'Penyesuaian harga kompetitor', approvedBy: 'Joko Widodo' },
        { id: 'PU005', productId: 'P002', date: '2025-04-20', oldPrice: 3800, newPrice: 4000, reason: 'Kenaikan harga supplier', approvedBy: 'Joko Widodo' }
    ];
    
    // Load update harga page
    function loadUpdateHarga() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        const html = `
            <div class="dashboard-header">
                <h2>Update Harga Jual Outlet</h2>
                <p>Kelola dan update harga jual produk di outlet</p>
            </div>
            
            <div class="dashboard-stats">
                <div class="stat-card">
                    <h3>Total SKU</h3>
                    <div class="value">${productData.length}</div>
                    <div class="trend">-</div>
                </div>
                <div class="stat-card">
                    <h3>Produk Perlu Review</h3>
                    <div class="value">${productData.filter(p => p.status === 'Review').length}</div>
                    <div class="trend up">↑ 3 dari minggu lalu</div>
                </div>
                <div class="stat-card">
                    <h3>Update Harga Bulan Ini</h3>
                    <div class="value">12</div>
                    <div class="trend down">↓ 5 dari bulan lalu</div>
                </div>
                <div class="stat-card">
                    <h3>Rata-rata Margin</h3>
                    <div class="value">${calculateAverageMargin().toFixed(1)}%</div>
                    <div class="trend up">↑ 0.8% dari bulan lalu</div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Cari Produk</h3>
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
                            <label for="statusFilter">Status</label>
                            <select id="statusFilter">
                                <option value="">Semua Status</option>
                                <option value="Normal">Normal</option>
                                <option value="Review">Perlu Review</option>
                                <option value="Updated">Baru Diupdate</option>
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
                    <div>
                        <button class="action-btn btn-primary" id="massUpdateBtn">Mass Update</button>
                        <button class="action-btn btn-secondary" id="exportPriceBtn">Export Harga</button>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="tabs">
                        <div class="tab active">Semua Produk</div>
                        <div class="tab">Perlu Review</div>
                        <div class="tab">Update Terbaru</div>
                    </div>
                    <div class="tab-content active">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" id="selectAll"></th>
                                        <th>Kode</th>
                                        <th>Nama Produk</th>
                                        <th>Kategori</th>
                                        <th>Harga Saat Ini</th>
                                        <th>Harga Anjuran</th>
                                        <th>Margin</th>
                                        <th>Update Terakhir</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="productTableBody">
                                    ${productData.map(product => {
                                        // Determine price status
                                        let statusClass = '';
                                        switch(product.status) {
                                            case 'Review': statusClass = 'warning'; break;
                                            case 'Updated': statusClass = 'success'; break;
                                            default: statusClass = 'pending';
                                        }
                                        
                                        return `
                                            <tr>
                                                <td><input type="checkbox" class="product-select" data-id="${product.id}"></td>
                                                <td>${product.id}</td>
                                                <td>${product.name}</td>
                                                <td>${product.category}</td>
                                                <td>Rp ${product.currentPrice.toLocaleString()}</td>
                                                <td>Rp ${product.suggestedPrice.toLocaleString()}</td>
                                                <td>${product.margin}%</td>
                                                <td>${product.lastUpdate}</td>
                                                <td><span class="status ${statusClass}">${product.status}</span></td>
                                                <td>
                                                    <button class="action-btn btn-primary btn-update-price" data-id="${product.id}">Update</button>
                                                    <button class="action-btn btn-secondary btn-price-history" data-id="${product.id}">History</button>
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Perlu Review tab content -->
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" class="select-review-all"></th>
                                        <th>Kode</th>
                                        <th>Nama Produk</th>
                                        <th>Kategori</th>
                                        <th>Harga Saat Ini</th>
                                        <th>Harga Anjuran</th>
                                        <th>Margin</th>
                                        <th>Update Terakhir</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${productData.filter(p => p.status === 'Review').map(product => `
                                        <tr>
                                            <td><input type="checkbox" class="product-select-review" data-id="${product.id}"></td>
                                            <td>${product.id}</td>
                                            <td>${product.name}</td>
                                            <td>${product.category}</td>
                                            <td>Rp ${product.currentPrice.toLocaleString()}</td>
                                            <td>Rp ${product.suggestedPrice.toLocaleString()}</td>
                                            <td>${product.margin}%</td>
                                            <td>${product.lastUpdate}</td>
                                            <td><span class="status warning">Review</span></td>
                                            <td>
                                                <button class="action-btn btn-primary btn-update-review" data-id="${product.id}">Update</button>
                                                <button class="action-btn btn-secondary btn-review-history" data-id="${product.id}">History</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Update Terbaru tab content -->
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kode</th>
                                        <th>Nama Produk</th>
                                        <th>Kategori</th>
                                        <th>Harga Sebelumnya</th>
                                        <th>Harga Baru</th>
                                        <th>Perubahan</th>
                                        <th>Tanggal Update</th>
                                        <th>Alasan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${priceUpdateHistory.map(history => {
                                        const product = productData.find(p => p.id === history.productId);
                                        const priceDiff = history.newPrice - history.oldPrice;
                                        const diffPercentage = (priceDiff / history.oldPrice * 100).toFixed(1);
                                        const diffClass = priceDiff >= 0 ? 'success' : 'danger';
                                        
                                        return `
                                            <tr>
                                                <td>${history.productId}</td>
                                                <td>${product ? product.name : ''}</td>
                                                <td>${product ? product.category : ''}</td>
                                                <td>Rp ${history.oldPrice.toLocaleString()}</td>
                                                <td>Rp ${history.newPrice.toLocaleString()}</td>
                                                <td>
                                                    <span class="status ${diffClass}">
                                                        ${priceDiff >= 0 ? '+' : ''}${priceDiff.toLocaleString()} (${priceDiff >= 0 ? '+' : ''}${diffPercentage}%)
                                                    </span>
                                                </td>
                                                <td>${history.date}</td>
                                                <td>${history.reason}</td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Analisis Harga</h3>
                </div>
                <div class="panel-body">
                    <div class="tabs">
                        <div class="tab active">Distribusi Margin</div>
                        <div class="tab">Trend Harga</div>
                        <div class="tab">Benchmark Kompetitor</div>
                    </div>
                    <div class="tab-content active">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 20px;">
                            <div class="stat-card">
                                <h3>Margin < 10%</h3>
                                <div class="value">${productData.filter(p => p.margin < 10).length}</div>
                                <div class="trend">SKU</div>
                            </div>
                            <div class="stat-card">
                                <h3>Margin 10-15%</h3>
                                <div class="value">${productData.filter(p => p.margin >= 10 && p.margin <= 15).length}</div>
                                <div class="trend">SKU</div>
                            </div>
                            <div class="stat-card">
                                <h3>Margin 16-20%</h3>
                                <div class="value">${productData.filter(p => p.margin > 15 && p.margin <= 20).length}</div>
                                <div class="trend">SKU</div>
                            </div>
                            <div class="stat-card">
                                <h3>Margin > 20%</h3>
                                <div class="value">${productData.filter(p => p.margin > 20).length}</div>
                                <div class="trend">SKU</div>
                            </div>
                        </div>
                        
                        <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-top: 20px;">
                            <h4 style="margin-bottom: 15px;">Distribusi Margin per Kategori</h4>
                            <div style="display: flex; flex-direction: column; gap: 15px;">
                                <div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                        <span>Makanan</span>
                                        <span>${calculateCategoryMargin('Makanan').toFixed(1)}%</span>
                                    </div>
                                    <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                        <div style="width: ${calculateCategoryMargin('Makanan') * 3}%; height: 100%; background-color: #3498db;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                        <span>Minuman</span>
                                        <span>${calculateCategoryMargin('Minuman').toFixed(1)}%</span>
                                    </div>
                                    <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                        <div style="width: ${calculateCategoryMargin('Minuman') * 3}%; height: 100%; background-color: #2ecc71;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                        <span>Makanan Ringan</span>
                                        <span>${calculateCategoryMargin('Makanan Ringan').toFixed(1)}%</span>
                                    </div>
                                    <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                        <div style="width: ${calculateCategoryMargin('Makanan Ringan') * 3}%; height: 100%; background-color: #f39c12;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Trend Harga tab content -->
                        <p style="margin: 15px 0;">Grafik trend harga produk akan ditampilkan di sini.</p>
                    </div>
                    <div class="tab-content">
                        <!-- Benchmark Kompetitor tab content -->
                        <p style="margin: 15px 0;">Data benchmark harga dengan kompetitor akan ditampilkan di sini.</p>
                    </div>
                </div>
            </div>
            
            <!-- Price Update Modal -->
            <div class="modal" id="priceUpdateModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Update Harga Produk</h3>
                        <button class="close-btn" data-close-modal="priceUpdateModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="productDetails">
                            <!-- Product details will be inserted here -->
                        </div>
                        
                        <div class="form-group">
                            <label for="newPrice">Harga Baru</label>
                            <input type="number" id="newPrice" min="0" step="100" value="0">
                        </div>
                        
                        <div class="form-group">
                            <label for="updateReason">Alasan Update</label>
                            <select id="updateReason">
                                <option value="supplier">Kenaikan harga supplier</option>
                                <option value="market">Penyesuaian harga pasar</option>
                                <option value="competitor">Penyesuaian harga kompetitor</option>
                                <option value="promo">Promosi</option>
                                <option value="other">Lainnya</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="otherReasonGroup" style="display: none;">
                            <label for="otherReason">Alasan Lainnya</label>
                            <input type="text" id="otherReason" placeholder="Masukkan alasan">
                        </div>
                        
                        <div class="form-group">
                            <label for="updateNote">Catatan Tambahan (Opsional)</label>
                            <textarea id="updateNote" rows="2"></textarea>
                        </div>
                        
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 20px;">
                            <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                                <div><strong>Harga Lama:</strong></div>
                                <div id="oldPriceDisplay">Rp 0</div>
                            </div>
                            <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                                <div><strong>Harga Baru:</strong></div>
                                <div id="newPriceDisplay">Rp 0</div>
                            </div>
                            <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                                <div><strong>Perubahan:</strong></div>
                                <div id="priceChangeDisplay">Rp 0 (0%)</div>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <div><strong>Margin Baru:</strong></div>
                                <div id="newMarginDisplay">0%</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="priceUpdateModal">Batal</button>
                        <button class="action-btn btn-primary" id="savePriceBtn">Simpan</button>
                    </div>
                </div>
            </div>
            
            <!-- Price History Modal -->
            <div class="modal" id="priceHistoryModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Riwayat Perubahan Harga</h3>
                        <button class="close-btn" data-close-modal="priceHistoryModal">&times;</button>
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
                                        <th>Harga Sebelumnya</th>
                                        <th>Harga Baru</th>
                                        <th>Perubahan</th>
                                        <th>Alasan</th>
                                        <th>Disetujui Oleh</th>
                                    </tr>
                                </thead>
                                <tbody id="historyTableBody">
                                    <!-- History data will be inserted here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="priceHistoryModal">Tutup</button>
                    </div>
                </div>
            </div>
            
            <!-- Mass Update Modal -->
            <div class="modal" id="massUpdateModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Mass Update Harga</h3>
                        <button class="close-btn" data-close-modal="massUpdateModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Produk yang akan diupdate:</label>
                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Kode</th>
                                            <th>Nama Produk</th>
                                            <th>Kategori</th>
                                            <th>Harga Saat Ini</th>
                                            <th>Harga Anjuran</th>
                                        </tr>
                                    </thead>
                                    <tbody id="massUpdateItemsBody">
                                        <!-- Selected products will be inserted here -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="massUpdateType">Jenis Update</label>
                            <select id="massUpdateType">
                                <option value="percentage">Persentase (%)</option>
                                <option value="fixed">Nilai Tetap (Rp)</option>
                                <option value="suggested">Gunakan Harga Anjuran</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="updateValueGroup">
                            <label for="massUpdateValue">Nilai Update</label>
                            <input type="number" id="massUpdateValue" min="0" value="0">
                        </div>
                        
                        <div class="form-group">
                            <label for="massUpdateReason">Alasan Update</label>
                            <select id="massUpdateReason">
                                <option value="supplier">Kenaikan harga supplier</option>
                                <option value="market">Penyesuaian harga pasar</option>
                                <option value="competitor">Penyesuaian harga kompetitor</option>
                                <option value="promo">Promosi</option>
                                <option value="other">Lainnya</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="massOtherReasonGroup" style="display: none;">
                            <label for="massOtherReason">Alasan Lainnya</label>
                            <input type="text" id="massOtherReason" placeholder="Masukkan alasan">
                        </div>
                        
                        <div class="form-group">
                            <label for="massUpdateNote">Catatan Tambahan (Opsional)</label>
                            <textarea id="massUpdateNote" rows="2"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="massUpdateModal">Batal</button>
                        <button class="action-btn btn-primary" id="saveMassUpdateBtn">Proses Update</button>
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
        // Select all checkbox
        const selectAll = document.getElementById('selectAll');
        if (selectAll) {
            selectAll.addEventListener('change', function() {
                document.querySelectorAll('.product-select').forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
            });
        }
        
        // Update price buttons
        document.querySelectorAll('.btn-update-price, .btn-update-review').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                openPriceUpdateModal(productId);
            });
        });
        
        // View price history buttons
        document.querySelectorAll('.btn-price-history, .btn-review-history').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                openPriceHistoryModal(productId);
            });
        });
        
        // Update reason change
        const updateReason = document.getElementById('updateReason');
        if (updateReason) {
            updateReason.addEventListener('change', function() {
                const otherReasonGroup = document.getElementById('otherReasonGroup');
                if (this.value === 'other') {
                    otherReasonGroup.style.display = 'block';
                } else {
                    otherReasonGroup.style.display = 'none';
                }
            });
        }
        
        // New price change
        const newPrice = document.getElementById('newPrice');
        if (newPrice) {
            newPrice.addEventListener('input', function() {
                updatePricePreview();
            });
        }
        
        // Save price button
        const savePriceBtn = document.getElementById('savePriceBtn');
        if (savePriceBtn) {
            savePriceBtn.addEventListener('click', function() {
                savePriceUpdate();
            });
        }
        
        // Mass update button
        const massUpdateBtn = document.getElementById('massUpdateBtn');
        if (massUpdateBtn) {
            massUpdateBtn.addEventListener('click', function() {
                openMassUpdateModal();
            });
        }
        
        // Mass update type change
        const massUpdateType = document.getElementById('massUpdateType');
        if (massUpdateType) {
            massUpdateType.addEventListener('change', function() {
                const updateValueGroup = document.getElementById('updateValueGroup');
                if (this.value === 'suggested') {
                    updateValueGroup.style.display = 'none';
                } else {
                    updateValueGroup.style.display = 'block';
                }
            });
        }
        
        // Mass update reason change
        const massUpdateReason = document.getElementById('massUpdateReason');
        if (massUpdateReason) {
            massUpdateReason.addEventListener('change', function() {
                const massOtherReasonGroup = document.getElementById('massOtherReasonGroup');
                if (this.value === 'other') {
                    massOtherReasonGroup.style.display = 'block';
                } else {
                    massOtherReasonGroup.style.display = 'none';
                }
            });
        }
        
        // Save mass update button
        const saveMassUpdateBtn = document.getElementById('saveMassUpdateBtn');
        if (saveMassUpdateBtn) {
            saveMassUpdateBtn.addEventListener('click', function() {
                processMassUpdate();
            });
        }
        
        // Export price button
        const exportPriceBtn = document.getElementById('exportPriceBtn');
        if (exportPriceBtn) {
            exportPriceBtn.addEventListener('click', function() {
                alert('Data harga akan diekspor ke file Excel/CSV');
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
    }
    
    // Open price update modal
    function openPriceUpdateModal(productId) {
        const product = productData.find(p => p.id === productId);
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
                        <div><strong>Harga Saat Ini:</strong> Rp ${product.currentPrice.toLocaleString()}</div>
                        <div><strong>Harga Anjuran:</strong> Rp ${product.suggestedPrice.toLocaleString()}</div>
                    </div>
                    <div style="margin-top: 10px;"><strong>Margin Saat Ini:</strong> ${product.margin}%</div>
                </div>
            `;
        }
        
        // Reset form
        const newPriceInput = document.getElementById('newPrice');
        if (newPriceInput) {
            newPriceInput.value = product.suggestedPrice;
        }
        
        const updateReason = document.getElementById('updateReason');
        if (updateReason) {
            updateReason.value = 'market';
        }
        
        const otherReasonGroup = document.getElementById('otherReasonGroup');
        if (otherReasonGroup) {
            otherReasonGroup.style.display = 'none';
        }
        
        const otherReason = document.getElementById('otherReason');
        if (otherReason) {
            otherReason.value = '';
        }
        
        const updateNote = document.getElementById('updateNote');
        if (updateNote) {
            updateNote.value = '';
        }
        
        // Update price preview
        document.getElementById('oldPriceDisplay').textContent = `Rp ${product.currentPrice.toLocaleString()}`;
        document.getElementById('newPriceDisplay').textContent = `Rp ${product.suggestedPrice.toLocaleString()}`;
        
        const priceDiff = product.suggestedPrice - product.currentPrice;
        const diffPercentage = (priceDiff / product.currentPrice * 100).toFixed(1);
        document.getElementById('priceChangeDisplay').textContent = 
            `Rp ${priceDiff.toLocaleString()} (${priceDiff >= 0 ? '+' : ''}${diffPercentage}%)`;
        
        const estimatedMargin = product.margin * (product.suggestedPrice / product.currentPrice);
        document.getElementById('newMarginDisplay').textContent = `${estimatedMargin.toFixed(1)}%`;
        
        // Store current product ID in the modal
        const modal = document.getElementById('priceUpdateModal');
        if (modal) {
            modal.setAttribute('data-product-id', productId);
            modal.style.display = 'flex';
        }
    }
    
    // Update price preview
    function updatePricePreview() {
        const modal = document.getElementById('priceUpdateModal');
        if (!modal) return;
        
        const productId = modal.getAttribute('data-product-id');
        const product = productData.find(p => p.id === productId);
        if (!product) return;
        
        const newPriceInput = document.getElementById('newPrice');
        const newPrice = parseInt(newPriceInput.value) || 0;
        
        document.getElementById('newPriceDisplay').textContent = `Rp ${newPrice.toLocaleString()}`;
        
        const priceDiff = newPrice - product.currentPrice;
        const diffPercentage = (priceDiff / product.currentPrice * 100).toFixed(1);
        
        const priceChangeDisplay = document.getElementById('priceChangeDisplay');
        priceChangeDisplay.textContent = 
            `Rp ${priceDiff.toLocaleString()} (${priceDiff >= 0 ? '+' : ''}${diffPercentage}%)`;
        
        if (priceDiff >= 0) {
            priceChangeDisplay.style.color = '#28a745';
        } else {
            priceChangeDisplay.style.color = '#dc3545';
        }
        
        // Calculate estimated new margin
        const estimatedMargin = product.margin * (newPrice / product.currentPrice);
        document.getElementById('newMarginDisplay').textContent = `${estimatedMargin.toFixed(1)}%`;
    }
    
    // Save price update
    function savePriceUpdate() {
        const modal = document.getElementById('priceUpdateModal');
        if (!modal) return;
        
        const productId = modal.getAttribute('data-product-id');
        const product = productData.find(p => p.id === productId);
        if (!product) return;
        
        const newPriceInput = document.getElementById('newPrice');
        const newPrice = parseInt(newPriceInput.value) || 0;
        
        // Validate input
        if (newPrice <= 0) {
            alert('Harga baru harus lebih dari 0');
            return;
        }
        
        const updateReason = document.getElementById('updateReason').value;
        const otherReason = document.getElementById('otherReason').value;
        const updateNote = document.getElementById('updateNote').value;
        
        if (updateReason === 'other' && !otherReason.trim()) {
            alert('Harap masukkan alasan perubahan');
            return;
        }
        
        // Get reason text
        let reasonText = '';
        switch (updateReason) {
            case 'supplier': reasonText = 'Kenaikan harga supplier'; break;
            case 'market': reasonText = 'Penyesuaian harga pasar'; break;
            case 'competitor': reasonText = 'Penyesuaian harga kompetitor'; break;
            case 'promo': reasonText = 'Promosi'; break;
            case 'other': reasonText = otherReason; break;
        }
        
        // Create new history entry
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        
        const newHistory = {
            id: 'PU' + (priceUpdateHistory.length + 1).toString().padStart(3, '0'),
            productId: product.id,
            date: dateStr,
            oldPrice: product.currentPrice,
            newPrice: newPrice,
            reason: reasonText,
            approvedBy: 'Joko Widodo', // Current user name would be dynamically retrieved in a real app
            note: updateNote
        };
        
        // Update product price
        product.currentPrice = newPrice;
        product.lastUpdate = dateStr;
        product.status = 'Updated';
        
        // Calculate new margin based on cost price (this is simplified)
        const costPrice = product.currentPrice / (1 + (product.margin / 100));
        product.margin = ((product.currentPrice - costPrice) / costPrice * 100).toFixed(1);
        
        // Add to history
        priceUpdateHistory.unshift(newHistory);
        
        // Update UI
        const productRow = document.querySelector(`tr td:nth-child(2):contains(${product.id})`).closest('tr');
        if (productRow) {
            // Update row content
            productRow.cells[4].textContent = `Rp ${product.currentPrice.toLocaleString()}`;
            productRow.cells[6].textContent = `${product.margin}%`;
            productRow.cells[7].textContent = product.lastUpdate;
            productRow.cells[8].innerHTML = `<span class="status success">Updated</span>`;
        }
        
        // Close modal
        modal.style.display = 'none';
        
        // Show confirmation
        alert('Perubahan harga berhasil disimpan');
    }
    
    // Open price history modal
    function openPriceHistoryModal(productId) {
        const product = productData.find(p => p.id === productId);
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
                    <div style="display: flex; justify-content: space-between;">
                        <div><strong>Harga Saat Ini:</strong> Rp ${product.currentPrice.toLocaleString()}</div>
                        <div><strong>Update Terakhir:</strong> ${product.lastUpdate}</div>
                    </div>
                </div>
            `;
        }
        
        // Filter history for this product
        const productHistory = priceUpdateHistory.filter(h => h.productId === productId);
        
        // Update history table
        const historyTableBody = document.getElementById('historyTableBody');
        if (historyTableBody) {
            if (productHistory.length > 0) {
                historyTableBody.innerHTML = productHistory.map(history => {
                    const priceDiff = history.newPrice - history.oldPrice;
                    const diffPercentage = (priceDiff / history.oldPrice * 100).toFixed(1);
                    const diffClass = priceDiff >= 0 ? 'success' : 'danger';
                    
                    return `
                        <tr>
                            <td>${history.date}</td>
                            <td>Rp ${history.oldPrice.toLocaleString()}</td>
                            <td>Rp ${history.newPrice.toLocaleString()}</td>
                            <td>
                                <span class="status ${diffClass}">
                                    ${priceDiff >= 0 ? '+' : ''}${priceDiff.toLocaleString()} (${priceDiff >= 0 ? '+' : ''}${diffPercentage}%)
                                </span>
                            </td>
                            <td>${history.reason}</td>
                            <td>${history.approvedBy}</td>
                        </tr>
                    `;
                }).join('');
            } else {
                historyTableBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center;">Tidak ada riwayat perubahan harga untuk produk ini</td>
                    </tr>
                `;
            }
        }
        
        // Show modal
        const modal = document.getElementById('priceHistoryModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Open mass update modal
    function openMassUpdateModal() {
        const selectedCheckboxes = document.querySelectorAll('.product-select:checked');
        if (selectedCheckboxes.length === 0) {
            alert('Pilih setidaknya satu produk untuk diupdate');
            return;
        }
        
        const selectedProductIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));
        const selectedProducts = productData.filter(p => selectedProductIds.includes(p.id));
        
        // Update selected products table
        const massUpdateItemsBody = document.getElementById('massUpdateItemsBody');
        if (massUpdateItemsBody) {
            massUpdateItemsBody.innerHTML = selectedProducts.map(product => `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>Rp ${product.currentPrice.toLocaleString()}</td>
                    <td>Rp ${product.suggestedPrice.toLocaleString()}</td>
                </tr>
            `).join('');
        }
        
        // Reset form
        document.getElementById('massUpdateType').value = 'percentage';
        document.getElementById('massUpdateValue').value = '5';
        document.getElementById('updateValueGroup').style.display = 'block';
        document.getElementById('massUpdateReason').value = 'market';
        document.getElementById('massOtherReasonGroup').style.display = 'none';
        document.getElementById('massOtherReason').value = '';
        document.getElementById('massUpdateNote').value = '';
        
        // Store selected product IDs in the modal
        const modal = document.getElementById('massUpdateModal');
        if (modal) {
            modal.setAttribute('data-product-ids', JSON.stringify(selectedProductIds));
            modal.style.display = 'flex';
        }
    }
    
    // Process mass update
    function processMassUpdate() {
        const modal = document.getElementById('massUpdateModal');
        if (!modal) return;
        
        const productIdsJSON = modal.getAttribute('data-product-ids');
        if (!productIdsJSON) return;
        
        const productIds = JSON.parse(productIdsJSON);
        const selectedProducts = productData.filter(p => productIds.includes(p.id));
        if (selectedProducts.length === 0) return;
        
        const updateType = document.getElementById('massUpdateType').value;
        const updateValue = parseInt(document.getElementById('massUpdateValue').value) || 0;
        const updateReason = document.getElementById('massUpdateReason').value;
        const otherReason = document.getElementById('massOtherReason').value;
        const updateNote = document.getElementById('massUpdateNote').value;
        
        // Validate input
        if (updateType !== 'suggested' && updateValue <= 0) {
            alert('Nilai update harus lebih dari 0');
            return;
        }
        
        if (updateReason === 'other' && !otherReason.trim()) {
            alert('Harap masukkan alasan perubahan');
            return;
        }
        
        // Get reason text
        let reasonText = '';
        switch (updateReason) {
            case 'supplier': reasonText = 'Kenaikan harga supplier'; break;
            case 'market': reasonText = 'Penyesuaian harga pasar'; break;
            case 'competitor': reasonText = 'Penyesuaian harga kompetitor'; break;
            case 'promo': reasonText = 'Promosi'; break;
            case 'other': reasonText = otherReason; break;
        }
        
        // Create date string
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        
        // Update each product
        selectedProducts.forEach(product => {
            let newPrice = product.currentPrice;
            
            // Calculate new price based on update type
            switch (updateType) {
                case 'percentage':
                    newPrice = Math.round(product.currentPrice * (1 + updateValue / 100));
                    break;
                case 'fixed':
                    newPrice = product.currentPrice + updateValue;
                    break;
                case 'suggested':
                    newPrice = product.suggestedPrice;
                    break;
            }
            
            // Create history entry
            const newHistory = {
                id: 'PU' + (priceUpdateHistory.length + 1).toString().padStart(3, '0'),
                productId: product.id,
                date: dateStr,
                oldPrice: product.currentPrice,
                newPrice: newPrice,
                reason: reasonText,
                approvedBy: 'Joko Widodo',
                note: updateNote
            };
            
            // Update product
            product.currentPrice = newPrice;
            product.lastUpdate = dateStr;
            product.status = 'Updated';
            
            // Calculate new margin (simplified)
            const costPrice = product.currentPrice / (1 + (product.margin / 100));
            product.margin = ((product.currentPrice - costPrice) / costPrice * 100).toFixed(1);
            
            // Add to history
            priceUpdateHistory.push(newHistory);
        });
        
        // Close modal
        modal.style.display = 'none';
        
        // Reload page to reflect changes
        loadUpdateHarga();
        
        // Show confirmation
        alert(`Perubahan harga untuk ${selectedProducts.length} produk berhasil disimpan`);
    }
    
    // Filter products based on search criteria
    function filterProducts() {
        const searchQuery = document.getElementById('searchProduct').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        
        // Filter products
        const filteredProducts = productData.filter(product => {
            // Search query filter
            const matchesSearch = searchQuery === '' || 
                product.id.toLowerCase().includes(searchQuery) || 
                product.name.toLowerCase().includes(searchQuery);
            
            // Category filter
            const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
            
            // Status filter
            const matchesStatus = statusFilter === '' || product.status === statusFilter;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
        
        // Update table
        const productTableBody = document.getElementById('productTableBody');
        if (productTableBody) {
            if (filteredProducts.length > 0) {
                productTableBody.innerHTML = filteredProducts.map(product => {
                    // Determine status class
                    let statusClass = '';
                    switch(product.status) {
                        case 'Review': statusClass = 'warning'; break;
                        case 'Updated': statusClass = 'success'; break;
                        default: statusClass = 'pending';
                    }
                    
                    return `
                        <tr>
                            <td><input type="checkbox" class="product-select" data-id="${product.id}"></td>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.category}</td>
                            <td>Rp ${product.currentPrice.toLocaleString()}</td>
                            <td>Rp ${product.suggestedPrice.toLocaleString()}</td>
                            <td>${product.margin}%</td>
                            <td>${product.lastUpdate}</td>
                            <td><span class="status ${statusClass}">${product.status}</span></td>
                            <td>
                                <button class="action-btn btn-primary btn-update-price" data-id="${product.id}">Update</button>
                                <button class="action-btn btn-secondary btn-price-history" data-id="${product.id}">History</button>
                            </td>
                        </tr>
                    `;
                }).join('');
                
                // Re-initialize event listeners for new buttons
                initializeEventListeners();
            } else {
                productTableBody.innerHTML = `
                    <tr>
                        <td colspan="10" style="text-align: center;">Tidak ada produk yang sesuai dengan kriteria pencarian</td>
                    </tr>
                `;
            }
        }
    }
    
    // Calculate average margin for all products
    function calculateAverageMargin() {
        if (productData.length === 0) return 0;
        
        const totalMargin = productData.reduce((sum, product) => sum + parseFloat(product.margin), 0);
        return totalMargin / productData.length;
    }
    
    // Calculate average margin for a specific category
    function calculateCategoryMargin(category) {
        const categoryProducts = productData.filter(p => p.category === category);
        if (categoryProducts.length === 0) return 0;
        
        const totalMargin = categoryProducts.reduce((sum, product) => sum + parseFloat(product.margin), 0);
        return totalMargin / categoryProducts.length;
    }
    
    // Public methods
    return {
        loadUpdateHarga
    };
})();