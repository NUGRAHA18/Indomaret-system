/**
 * Sinkron Harga Via Update File Module
 * Handles price synchronization via file upload for the Indomaret Management System
 */

// Sinkron File module
const SinkronFileModule = (() => {
    // Sample sync history
    const syncHistory = [
        { 
            id: 'SYNC001', 
            date: '2025-05-05', 
            filename: 'price_update_may_week1.xlsx', 
            totalItems: 125, 
            updatedItems: 118, 
            failedItems: 7, 
            status: 'Selesai',
            uploadedBy: 'Joko Widodo'
        },
        { 
            id: 'SYNC002', 
            date: '2025-04-28', 
            filename: 'price_update_april_week4.xlsx', 
            totalItems: 87, 
            updatedItems: 87, 
            failedItems: 0, 
            status: 'Selesai',
            uploadedBy: 'Joko Widodo'
        },
        { 
            id: 'SYNC003', 
            date: '2025-04-21', 
            filename: 'price_update_april_week3.xlsx', 
            totalItems: 104, 
            updatedItems: 98, 
            failedItems: 6, 
            status: 'Selesai',
            uploadedBy: 'Joko Widodo'
        },
        { 
            id: 'SYNC004', 
            date: '2025-04-14', 
            filename: 'price_update_april_week2.xlsx', 
            totalItems: 92, 
            updatedItems: 90, 
            failedItems: 2, 
            status: 'Selesai',
            uploadedBy: 'Joko Widodo'
        },
        { 
            id: 'SYNC005', 
            date: '2025-04-07', 
            filename: 'price_update_april_week1.xlsx', 
            totalItems: 156, 
            updatedItems: 151, 
            failedItems: 5, 
            status: 'Selesai',
            uploadedBy: 'Joko Widodo'
        }
    ];
    
    // Sample template fields
    const templateFields = [
        { id: 'product_code', name: 'Kode Produk', required: true, type: 'text', description: 'Kode produk (harus unik)' },
        { id: 'product_name', name: 'Nama Produk', required: false, type: 'text', description: 'Nama produk (opsional untuk verifikasi)' },
        { id: 'new_price', name: 'Harga Baru', required: true, type: 'number', description: 'Harga jual baru dalam Rupiah' },
        { id: 'category', name: 'Kategori', required: false, type: 'text', description: 'Kategori produk (opsional)' },
        { id: 'effective_date', name: 'Tanggal Berlaku', required: true, type: 'date', description: 'Tanggal harga baru berlaku (format: YYYY-MM-DD)' },
        { id: 'notes', name: 'Catatan', required: false, type: 'text', description: 'Catatan tambahan (opsional)' }
    ];
    
    // Sample excel data preview
    const excelPreviewData = [
        { product_code: 'P001', product_name: 'Indomie Goreng', new_price: 3700, category: 'Makanan', effective_date: '2025-05-10', notes: 'Kenaikan harga supplier' },
        { product_code: 'P002', product_name: 'Aqua 600ml', new_price: 4200, category: 'Minuman', effective_date: '2025-05-10', notes: '' },
        { product_code: 'P003', product_name: 'Pocari Sweat', new_price: 8000, category: 'Minuman', effective_date: '2025-05-10', notes: '' },
        { product_code: 'P004', product_name: 'Chitato Original', new_price: 10000, category: 'Makanan Ringan', effective_date: '2025-05-10', notes: 'Penyesuaian harga pasar' },
        { product_code: 'P005', product_name: 'Teh Botol Sosro', new_price: 5000, category: 'Minuman', effective_date: '2025-05-10', notes: '' }
    ];
    
    // Load sinkron file page
    function loadSinkronFile() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        const html = `
            <div class="dashboard-header">
                <h2>Sinkron Harga Via Update File</h2>
                <p>Upload dan sinkronkan harga produk melalui file Excel/CSV</p>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Upload File</h3>
                </div>
                <div class="panel-body">
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <div style="background-color: #f5f8fa; border-radius: 8px; padding: 20px;">
                            <h4 style="margin-bottom: 15px;">Petunjuk Upload File</h4>
                            <ol style="margin-left: 20px; margin-bottom: 15px;">
                                <li>Download template file Excel/CSV <a href="#" id="downloadTemplateBtn" style="color: #0056b3; text-decoration: underline;">di sini</a></li>
                                <li>Isi data sesuai format yang ditentukan</li>
                                <li>Upload file yang telah diisi</li>
                                <li>Review data sebelum melakukan sinkronisasi</li>
                                <li>Konfirmasi untuk memulai proses sinkronisasi</li>
                            </ol>
                            <div style="margin-top: 10px;">
                                <strong>Catatan:</strong> Pastikan Anda menggunakan template terbaru dan mengisi semua kolom wajib.
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="fileUpload">Upload File Excel/CSV</label>
                            <div style="display: flex; gap: 10px;">
                                <input type="file" id="fileUpload" accept=".xlsx, .xls, .csv" style="flex: 1; padding: 8px;">
                                <button class="action-btn btn-primary" id="uploadBtn">Upload</button>
                            </div>
                            <div style="margin-top: 5px; font-size: 13px; color: #666;">
                                File format: XLSX, XLS, CSV (max 5MB)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="panel" id="previewPanel" style="display: none;">
                <div class="panel-header">
                    <h3>Preview Data</h3>
                    <button class="action-btn btn-primary" id="syncBtn">Sinkronkan Harga</button>
                </div>
                <div class="panel-body">
                    <div id="uploadSummary" style="background-color: #f5f8fa; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                        <!-- Upload summary will be inserted here -->
                    </div>
                    
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Kode Produk</th>
                                    <th>Nama Produk</th>
                                    <th>Harga Baru</th>
                                    <th>Kategori</th>
                                    <th>Tanggal Berlaku</th>
                                    <th>Catatan</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="previewTableBody">
                                <!-- Preview data will be inserted here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Riwayat Sinkronisasi</h3>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tanggal</th>
                                    <th>Nama File</th>
                                    <th>Total Item</th>
                                    <th>Berhasil</th>
                                    <th>Gagal</th>
                                    <th>Status</th>
                                    <th>User</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${syncHistory.map(sync => `
                                    <tr>
                                        <td>${sync.id}</td>
                                        <td>${sync.date}</td>
                                        <td>${sync.filename}</td>
                                        <td>${sync.totalItems}</td>
                                        <td>${sync.updatedItems}</td>
                                        <td>${sync.failedItems}</td>
                                        <td><span class="status ${sync.status === 'Selesai' ? 'success' : 'pending'}">${sync.status}</span></td>
                                        <td>${sync.uploadedBy}</td>
                                        <td>
                                            <button class="action-btn btn-primary btn-view-sync" data-id="${sync.id}">Detail</button>
                                            <button class="action-btn btn-secondary btn-download-log" data-id="${sync.id}">Log</button>
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
                    <h3>Format Template</h3>
                </div>
                <div class="panel-body">
                    <p style="margin-bottom: 15px;">Template file untuk update harga berisi kolom-kolom berikut:</p>
                    
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Kolom</th>
                                    <th>Nama Kolom</th>
                                    <th>Wajib</th>
                                    <th>Tipe Data</th>
                                    <th>Deskripsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${templateFields.map(field => `
                                    <tr>
                                        <td>${field.id}</td>
                                        <td>${field.name}</td>
                                        <td>${field.required ? 'Ya' : 'Tidak'}</td>
                                        <td>${field.type}</td>
                                        <td>${field.description}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <div style="margin-top: 20px;">
                        <h4>Contoh Isi Template:</h4>
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kode Produk</th>
                                        <th>Nama Produk</th>
                                        <th>Harga Baru</th>
                                        <th>Kategori</th>
                                        <th>Tanggal Berlaku</th>
                                        <th>Catatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>P001</td>
                                        <td>Indomie Goreng</td>
                                        <td>3700</td>
                                        <td>Makanan</td>
                                        <td>2025-05-10</td>
                                        <td>Kenaikan harga supplier</td>
                                    </tr>
                                    <tr>
                                        <td>P002</td>
                                        <td>Aqua 600ml</td>
                                        <td>4200</td>
                                        <td>Minuman</td>
                                        <td>2025-05-10</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Sync Confirmation Modal -->
            <div class="modal" id="syncConfirmModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Konfirmasi Sinkronisasi</h3>
                        <button class="close-btn" data-close-modal="syncConfirmModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div style="margin-bottom: 20px;">
                            <p>Anda akan mengupdate harga untuk <strong id="syncItemCount">0</strong> produk.</p>
                            <p>Pastikan data yang diupload sudah benar. Proses ini tidak dapat dibatalkan.</p>
                        </div>
                        
                        <div class="form-group">
                            <label for="syncNote">Catatan Sinkronisasi (opsional)</label>
                            <textarea id="syncNote" rows="3" placeholder="Masukkan catatan untuk proses sinkronisasi ini"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="syncConfirmModal">Batal</button>
                        <button class="action-btn btn-primary" id="confirmSyncBtn">Sinkronkan Sekarang</button>
                    </div>
                </div>
            </div>
            
            <!-- Sync Detail Modal -->
            <div class="modal" id="syncDetailModal">
                <div class="modal-content" style="width: 80%; max-width: 900px;">
                    <div class="modal-header">
                        <h3>Detail Sinkronisasi</h3>
                        <button class="close-btn" data-close-modal="syncDetailModal">&times;</button>
                    </div>
                    <div class="modal-body" id="syncDetailContent">
                        <!-- Sync details will be inserted here -->
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="syncDetailModal">Tutup</button>
                        <button class="action-btn btn-primary" id="downloadDetailBtn">Unduh Detail</button>
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
        // Download template button
        const downloadTemplateBtn = document.getElementById('downloadTemplateBtn');
        if (downloadTemplateBtn) {
            downloadTemplateBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Template akan didownload sebagai file Excel');
            });
        }
        
        // Upload button
        const uploadBtn = document.getElementById('uploadBtn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', function() {
                const fileInput = document.getElementById('fileUpload');
                if (fileInput.files.length === 0) {
                    alert('Pilih file untuk diupload');
                    return;
                }
                
                const filename = fileInput.files[0].name;
                
                // Show preview panel with sample data
                showPreviewData(filename);
            });
        }
        
        // Sync button
        const syncBtn = document.getElementById('syncBtn');
        if (syncBtn) {
            syncBtn.addEventListener('click', function() {
                openSyncConfirmModal();
            });
        }
        
        // Confirm sync button
        const confirmSyncBtn = document.getElementById('confirmSyncBtn');
        if (confirmSyncBtn) {
            confirmSyncBtn.addEventListener('click', function() {
                processSynchronization();
            });
        }
        
        // View sync details buttons
        document.querySelectorAll('.btn-view-sync').forEach(button => {
            button.addEventListener('click', function() {
                const syncId = this.getAttribute('data-id');
                showSyncDetails(syncId);
            });
        });
        
        // Download log buttons
        document.querySelectorAll('.btn-download-log').forEach(button => {
            button.addEventListener('click', function() {
                const syncId = this.getAttribute('data-id');
                alert(`Log untuk sinkronisasi ID: ${syncId} akan didownload`);
            });
        });
        
        // Download detail button in modal
        const downloadDetailBtn = document.getElementById('downloadDetailBtn');
        if (downloadDetailBtn) {
            downloadDetailBtn.addEventListener('click', function() {
                alert('Detail sinkronisasi akan didownload sebagai file Excel');
            });
        }
    }
    
    // Show preview data
    function showPreviewData(filename) {
        const previewPanel = document.getElementById('previewPanel');
        if (previewPanel) {
            previewPanel.style.display = 'block';
        }
        
        // Update upload summary
        const uploadSummary = document.getElementById('uploadSummary');
        if (uploadSummary) {
            uploadSummary.innerHTML = `
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <div style="margin-bottom: 10px;"><strong>Nama File:</strong> ${filename}</div>
                    <div style="margin-bottom: 10px;"><strong>Waktu Upload:</strong> ${new Date().toLocaleString()}</div>
                </div>
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <div style="margin-bottom: 10px;"><strong>Total Item:</strong> ${excelPreviewData.length}</div>
                    <div style="margin-bottom: 10px;"><strong>Item Valid:</strong> ${excelPreviewData.length}</div>
                    <div style="margin-bottom: 10px;"><strong>Item Error:</strong> 0</div>
                </div>
            `;
        }
        
        // Update preview table
        const previewTableBody = document.getElementById('previewTableBody');
        if (previewTableBody) {
            previewTableBody.innerHTML = excelPreviewData.map(item => `
                <tr>
                    <td>${item.product_code}</td>
                    <td>${item.product_name}</td>
                    <td>Rp ${item.new_price.toLocaleString()}</td>
                    <td>${item.category}</td>
                    <td>${item.effective_date}</td>
                    <td>${item.notes}</td>
                    <td><span class="status success">Valid</span></td>
                </tr>
            `).join('');
        }
        
        // Scroll to preview panel
        previewPanel.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Open sync confirmation modal
    function openSyncConfirmModal() {
        const syncItemCount = document.getElementById('syncItemCount');
        if (syncItemCount) {
            syncItemCount.textContent = excelPreviewData.length;
        }
        
        const modal = document.getElementById('syncConfirmModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Process synchronization
    function processSynchronization() {
        // Get sync note
        const syncNote = document.getElementById('syncNote').value;
        
        // Create new sync history entry
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        
        const newSync = {
            id: 'SYNC' + (syncHistory.length + 1).toString().padStart(3, '0'),
            date: dateStr,
            filename: document.getElementById('fileUpload').files[0].name,
            totalItems: excelPreviewData.length,
            updatedItems: excelPreviewData.length,
            failedItems: 0,
            status: 'Selesai',
            uploadedBy: 'Joko Widodo', // Current user name would be dynamically retrieved in a real app
            note: syncNote
        };
        
        // Add to history
        syncHistory.unshift(newSync);
        
        // Close modal
        document.getElementById('syncConfirmModal').style.display = 'none';
        
        // Reset file upload and hide preview
        document.getElementById('fileUpload').value = '';
        document.getElementById('previewPanel').style.display = 'none';
        
        // Show confirmation and reload
        alert('Sinkronisasi harga berhasil dilakukan');
        loadSinkronFile(); // Reload to show updated history
    }
    
    // Show sync details
    function showSyncDetails(syncId) {
        const sync = syncHistory.find(s => s.id === syncId);
        if (!sync) return;
        
        const syncDetailContent = document.getElementById('syncDetailContent');
        if (syncDetailContent) {
            syncDetailContent.innerHTML = `
                <div style="background-color: #f5f8fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div><strong>ID Sinkronisasi:</strong> ${sync.id}</div>
                        <div><strong>Tanggal:</strong> ${sync.date}</div>
                    </div>
                    <div style="margin-bottom: 10px;"><strong>Nama File:</strong> ${sync.filename}</div>
                    <div style="margin-bottom: 10px;"><strong>Diupload Oleh:</strong> ${sync.uploadedBy}</div>
                    <div style="display: flex; gap: 30px; margin-bottom: 10px;">
                        <div><strong>Total Item:</strong> ${sync.totalItems}</div>
                        <div><strong>Berhasil:</strong> ${sync.updatedItems}</div>
                        <div><strong>Gagal:</strong> ${sync.failedItems}</div>
                    </div>
                    <div><strong>Status:</strong> <span class="status ${sync.status === 'Selesai' ? 'success' : 'pending'}">${sync.status}</span></div>
                </div>
                
                <h4>Detail Item yang Diupdate</h4>
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Kode Produk</th>
                                <th>Nama Produk</th>
                                <th>Harga Lama</th>
                                <th>Harga Baru</th>
                                <th>Tanggal Berlaku</th>
                                <th>Status</th>
                                <th>Pesan</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${excelPreviewData.map(item => {
                                // Generate random old price for demo
                                const oldPrice = item.new_price - Math.floor(Math.random() * 500);
                                
                                return `
                                    <tr>
                                        <td>${item.product_code}</td>
                                        <td>${item.product_name}</td>
                                        <td>Rp ${oldPrice.toLocaleString()}</td>
                                        <td>Rp ${item.new_price.toLocaleString()}</td>
                                        <td>${item.effective_date}</td>
                                        <td><span class="status success">Berhasil</span></td>
                                        <td>Harga berhasil diupdate</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }
        
        const modal = document.getElementById('syncDetailModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Public methods
    return {
        loadSinkronFile
    };
})();