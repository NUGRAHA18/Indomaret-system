/**
 * Reports Module
 * Handles sales reports and analytics
 */
const ReportsModule = (() => {
    // Sample report data
    const hourlyData = [
        { hour: '08:00 - 09:00', transactions: 28, total: 875400, average: 31264, percentage: 7.0 },
        { hour: '09:00 - 10:00', transactions: 32, total: 946800, average: 29587, percentage: 7.6 },
        { hour: '10:00 - 11:00', transactions: 35, total: 1024500, average: 29271, percentage: 8.2 },
        { hour: '11:00 - 12:00', transactions: 45, total: 1685250, average: 37450, percentage: 13.5 },
        { hour: '12:00 - 13:00', transactions: 52, total: 2124800, average: 40861, percentage: 17.0 },
        { hour: '13:00 - 14:00', transactions: 38, total: 1542600, average: 40595, percentage: 12.4 }
    ];
    
    const categoryData = [
        { category: 'Makanan', total: 3852500, items: 485, average: 7943, percentage: 30.9 },
        { category: 'Minuman', total: 2964800, items: 328, average: 9039, percentage: 23.7 },
        { category: 'Makanan Ringan', total: 1945200, items: 215, average: 9047, percentage: 15.6 },
        { category: 'Peralatan Mandi', total: 1235000, items: 87, average: 14195, percentage: 9.9 },
        { category: 'Lainnya', total: 2490000, items: 170, average: 14647, percentage: 19.9 }
    ];
    
    const paymentData = [
        { method: 'Tunai', total: 5642800, transactions: 185, average: 30502, percentage: 45.2 },
        { method: 'Debit', total: 3124500, transactions: 82, average: 38103, percentage: 25.0 },
        { method: 'Kredit', total: 1245200, transactions: 28, average: 44471, percentage: 10.0 },
        { method: 'QRIS', total: 2475000, transactions: 57, average: 43421, percentage: 19.8 }
    ];
    
    const topProductsData = [
        { code: 'P001', name: 'Indomie Goreng', category: 'Makanan', sold: 124, total: 434000, percentage: 3.5 },
        { code: 'P002', name: 'Aqua 600ml', category: 'Minuman', sold: 98, total: 392000, percentage: 3.1 },
        { code: 'P003', name: 'Pocari Sweat', category: 'Minuman', sold: 76, total: 570000, percentage: 4.6 },
        { code: 'P006', name: 'Indomie Rebus', category: 'Makanan', sold: 72, total: 230400, percentage: 1.8 },
        { code: 'P008', name: 'Good Day Coffee', category: 'Minuman', sold: 65, total: 455000, percentage: 3.6 }
    ];
    
    // Load laporan penjualan content
    function loadLaporanPenjualan() {
        const html = `
            <div class="dashboard-header">
                <h2>Laporan Penjualan</h2>
                <p>Lihat dan analisa data penjualan outlet</p>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Filter Laporan</h3>
                </div>
                <div class="panel-body">
                    <div class="filters-grid">
                        <div class="form-group">
                            <label for="reportType">Jenis Laporan</label>
                            <select id="reportType">
                                <option value="daily">Harian</option>
                                <option value="weekly">Mingguan</option>
                                <option value="monthly">Bulanan</option>
                                <option value="quarterly">Triwulan</option>
                                <option value="yearly">Tahunan</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="reportPeriod">Periode</label>
                            <input type="date" id="reportPeriod" value="${getCurrentDate()}">
                        </div>
                        <div class="form-group">
                            <label for="reportOutlet">Outlet</label>
                            <select id="reportOutlet">
                                <option value="all">Semua Outlet</option>
                                <option value="1">Indomaret Jl. Sudirman No. 123</option>
                                <option value="2">Indomaret Jl. Gatot Subroto No. 45</option>
                                <option value="3">Indomaret Jl. Asia Afrika No. 67</option>
                            </select>
                        </div>
                        <div class="form-group" style="align-self: flex-end;">
                            <button class="action-btn btn-primary" id="generateReportBtn">Generate Laporan</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Ringkasan Penjualan Harian (08-05-2025)</h3>
                    <div>
                        <button class="action-btn btn-secondary">Cetak</button>
                        <button class="action-btn btn-secondary">Export Excel</button>
                        <button class="action-btn btn-secondary">Export PDF</button>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="report-summary">
                        <div class="summary-card">
                            <div class="summary-card-header">Total Penjualan</div>
                            <div class="summary-card-body">Rp 12.487.500</div>
                            <div class="summary-card-footer">
                                Dibandingkan kemarin
                                <div class="summary-trend">
                                    <span class="trend-icon trend-positive">↑</span>
                                    8%
                                </div>
                            </div>
                        </div>
                        <div class="summary-card">
                            <div class="summary-card-header">Jumlah Transaksi</div>
                            <div class="summary-card-body">352</div>
                            <div class="summary-card-footer">
                                Dibandingkan kemarin
                                <div class="summary-trend">
                                    <span class="trend-icon trend-positive">↑</span>
                                    5%
                                </div>
                            </div>
                        </div>
                        <div class="summary-card">
                            <div class="summary-card-header">Rata-rata per Transaksi</div>
                            <div class="summary-card-body">Rp 35.476</div>
                            <div class="summary-card-footer">
                                Dibandingkan kemarin
                                <div class="summary-trend">
                                    <span class="trend-icon trend-positive">↑</span>
                                    3%
                                </div>
                            </div>
                        </div>
                        <div class="summary-card">
                            <div class="summary-card-header">Total Item Terjual</div>
                            <div class="summary-card-body">1.285</div>
                            <div class="summary-card-footer">
                                Dibandingkan kemarin
                                <div class="summary-trend">
                                    <span class="trend-icon trend-positive">↑</span>
                                    7%
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tabs">
                        <div class="tab active">Per Jam</div>
                        <div class="tab">Per Kategori</div>
                        <div class="tab">Per Metode Pembayaran</div>
                        <div class="tab">Top Products</div>
                    </div>
                    
                    <div class="tab-content active">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Jam</th>
                                        <th>Transaksi</th>
                                        <th>Total Penjualan</th>
                                        <th>Rata-rata</th>
                                        <th>% dari Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${getHourlyReportRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="tab-content">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kategori</th>
                                        <th>Total Penjualan</th>
                                        <th>Item Terjual</th>
                                        <th>Rata-rata Harga</th>
                                        <th>% dari Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${getCategoryReportRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="tab-content">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Metode Pembayaran</th>
                                        <th>Total Penjualan</th>
                                        <th>Transaksi</th>
                                        <th>Rata-rata</th>
                                        <th>% dari Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${getPaymentReportRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="tab-content">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kode</th>
                                        <th>Nama Produk</th>
                                        <th>Kategori</th>
                                        <th>Terjual</th>
                                        <th>Total Penjualan</th>
                                        <th>% dari Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${getTopProductsRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="report-footer">
                <p>Laporan ini dibuat otomatis oleh sistem pada ${getCurrentDateTime()}</p>
                <div class="export-options">
                    <div class="export-option">
                        <span class="export-icon">📄</span>
                        <span>Print</span>
                    </div>
                    <div class="export-option">
                        <span class="export-icon">📊</span>
                        <span>Excel</span>
                    </div>
                    <div class="export-option">
                        <span class="export-icon">📑</span>
                        <span>PDF</span>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('contentArea').innerHTML = html;
        initReportEventListeners();
    }
    
    // Generate hourly report table rows
    function getHourlyReportRows() {
        return hourlyData.map(data => `
            <tr>
                <td>${data.hour}</td>
                <td>${data.transactions}</td>
                <td>Rp ${data.total.toLocaleString()}</td>
                <td>Rp ${data.average.toLocaleString()}</td>
                <td>${data.percentage}%</td>
            </tr>
        `).join('');
    }
    
    // Generate category report table rows
    function getCategoryReportRows() {
        return categoryData.map(data => `
            <tr>
                <td>${data.category}</td>
                <td>Rp ${data.total.toLocaleString()}</td>
                <td>${data.items}</td>
                <td>Rp ${data.average.toLocaleString()}</td>
                <td>${data.percentage}%</td>
            </tr>
        `).join('');
    }
    
    // Generate payment method report table rows
    function getPaymentReportRows() {
        return paymentData.map(data => `
            <tr>
                <td>${data.method}</td>
                <td>Rp ${data.total.toLocaleString()}</td>
                <td>${data.transactions}</td>
                <td>Rp ${data.average.toLocaleString()}</td>
                <td>${data.percentage}%</td>
            </tr>
        `).join('');
    }
    
    // Generate top products report table rows
    function getTopProductsRows() {
        return topProductsData.map(product => `
            <tr>
                <td>${product.code}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.sold}</td>
                <td>Rp ${product.total.toLocaleString()}</td>
                <td>${product.percentage}%</td>
            </tr>
        `).join('');
    }
    
    // Get current date in YYYY-MM-DD format
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Get current date and time in readable format
    function getCurrentDateTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return now.toLocaleDateString('id-ID', options);
    }
    
    // Initialize report event listeners
    function initReportEventListeners() {
        // Generate report button
        const generateReportBtn = document.getElementById('generateReportBtn');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', function() {
                const reportType = document.getElementById('reportType').value;
                const reportPeriod = document.getElementById('reportPeriod').value;
                const reportOutlet = document.getElementById('reportOutlet').value;
                
                // In a real application, this would fetch report data based on the filters
                // For now, we just show an alert with the selected filters
                alert(`Generating ${reportType} report for ${reportPeriod}, outlet: ${reportOutlet}`);
                
                // We could refresh the report content here
            });
        }
        
        // Export options
        const exportOptions = document.querySelectorAll('.export-option');
        exportOptions.forEach(option => {
            option.addEventListener('click', function() {
                const exportType = this.querySelector('span:last-child').textContent;
                alert(`Exporting report as ${exportType}`);
                
                if (exportType === 'Print') {
                    window.print();
                }
            });
        });
    }
    
    // Initialize module
    function init() {
        // No specific initialization needed for this module
    }
    
    // Public methods
    return {
        init,
        loadLaporanPenjualan
    };
})();