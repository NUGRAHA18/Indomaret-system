/**
 * Promosi Lokal Module
 * Manages local promotions for the Indomaret Management System
 */

// Promosi Lokal module
const PromosiLokalModule = (() => {
    // Sample promotion data
    const promotionData = [
        { 
            id: 'PROMO001', 
            name: 'Diskon Mingguan Produk Susu',
            description: 'Diskon 15% untuk semua produk susu setiap hari Senin-Rabu',
            type: 'Diskon',
            discountValue: 15,
            discountType: 'Percentage',
            startDate: '2025-05-01',
            endDate: '2025-06-30',
            daysActive: ['Senin', 'Selasa', 'Rabu'],
            timeStart: '00:00',
            timeEnd: '23:59',
            productCategories: ['Susu'],
            outlets: [1, 2, 3, 4],
            minPurchase: 0,
            maxDiscount: 0,
            status: 'Aktif',
            createdBy: 'Budi Santoso',
            createdDate: '2025-04-15'
        },
        { 
            id: 'PROMO002', 
            name: 'Beli 2 Gratis 1 Indomie',
            description: 'Beli 2 Indomie Goreng, gratis 1 Indomie Goreng',
            type: 'Bundle',
            bundleType: 'Buy 2 Get 1',
            startDate: '2025-05-05',
            endDate: '2025-05-20',
            daysActive: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            timeStart: '00:00',
            timeEnd: '23:59',
            productCodes: ['P001'],
            outlets: [1, 3],
            status: 'Aktif',
            createdBy: 'Joko Widodo',
            createdDate: '2025-04-20'
        },
        { 
            id: 'PROMO003', 
            name: 'Diskon Akhir Pekan untuk Member',
            description: 'Diskon tambahan 5% untuk member setiap Sabtu dan Minggu',
            type: 'Diskon Member',
            discountValue: 5,
            discountType: 'Percentage',
            startDate: '2025-05-01',
            endDate: '2025-12-31',
            daysActive: ['Sabtu', 'Minggu'],
            timeStart: '00:00',
            timeEnd: '23:59',
            memberOnly: true,
            minPurchase: 50000,
            maxDiscount: 25000,
            outlets: [1, 2, 3, 4, 5],
            status: 'Aktif',
            createdBy: 'Budi Santoso',
            createdDate: '2025-04-10'
        },
        { 
            id: 'PROMO004', 
            name: 'Happy Hour Minuman Dingin',
            description: 'Diskon 20% untuk minuman dingin dari jam 12:00-15:00',
            type: 'Diskon',
            discountValue: 20,
            discountType: 'Percentage',
            startDate: '2025-05-10',
            endDate: '2025-06-15',
            daysActive: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
            timeStart: '12:00',
            timeEnd: '15:00',
            productCategories: ['Minuman Dingin'],
            outlets: [2, 4],
            status: 'Aktif',
            createdBy: 'Joko Widodo',
            createdDate: '2025-05-01'
        },
        { 
            id: 'PROMO005', 
            name: 'Promo Ramadhan',
            description: 'Diskon 10% untuk produk makanan berbuka puasa',
            type: 'Diskon',
            discountValue: 10,
            discountType: 'Percentage',
            startDate: '2025-02-15',
            endDate: '2025-03-15',
            daysActive: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            timeStart: '15:00',
            timeEnd: '19:00',
            productCategories: ['Makanan Siap Saji', 'Minuman', 'Makanan Ringan'],
            outlets: [1, 2, 3, 4, 5],
            status: 'Tidak Aktif',
            createdBy: 'Budi Santoso',
            createdDate: '2025-01-20'
        }
    ];
    
    // Sample outlet data
    const outletData = [
        { id: 1, name: 'Indomaret Jl. Sudirman No. 123', type: 'Reguler', area: 'Jakarta Pusat' },
        { id: 2, name: 'Indomaret Jl. Gatot Subroto No. 45', type: 'Super', area: 'Jakarta Selatan' },
        { id: 3, name: 'Indomaret Jl. Asia Afrika No. 67', type: 'Point', area: 'Jakarta Barat' },
        { id: 4, name: 'Indomaret Jl. Thamrin No. 89', type: 'Reguler', area: 'Jakarta Pusat' },
        { id: 5, name: 'Indomaret Jl. Kuningan No. 12', type: 'Super', area: 'Jakarta Selatan' }
    ];
    
    // Load promosi lokal page
    function loadPromosiLokal() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        const html = `
            <div class="dashboard-header">
                <h2>Pengelolaan Promosi Lokal</h2>
                <p>Kelola promosi khusus untuk outlet Anda</p>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Daftar Promosi</h3>
                    <button class="action-btn btn-primary" id="addNewPromoBtn">Tambah Promosi Baru</button>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama Promosi</th>
                                    <th>Tipe</th>
                                    <th>Periode</th>
                                    <th>Nilai Diskon</th>
                                    <th>Jumlah Outlet</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${promotionData.map(promo => {
                                    // Format discount value based on type
                                    let discountDisplay = '-';
                                    if (promo.type === 'Diskon' || promo.type === 'Diskon Member') {
                                        discountDisplay = promo.discountType === 'Percentage' ? 
                                            `${promo.discountValue}%` : 
                                            `Rp ${promo.discountValue.toLocaleString()}`;
                                    } else if (promo.type === 'Bundle') {
                                        discountDisplay = promo.bundleType;
                                    }
                                    
                                    return `
                                        <tr>
                                            <td>${promo.id}</td>
                                            <td>${promo.name}</td>
                                            <td>${promo.type}</td>
                                            <td>${promo.startDate} s/d ${promo.endDate}</td>
                                            <td>${discountDisplay}</td>
                                            <td>${promo.outlets ? promo.outlets.length : 0}</td>
                                            <td>
                                                <span class="status ${promo.status === 'Aktif' ? 'success' : 'danger'}">
                                                    ${promo.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button class="action-btn btn-primary btn-view-promo" data-id="${promo.id}">Detail</button>
                                                <button class="action-btn btn-secondary btn-edit-promo" data-id="${promo.id}">Edit</button>
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
                    <h3>Kalender Promosi</h3>
                    <div>
                        <button class="action-btn btn-secondary">Bulan Sebelumnya</button>
                        <span style="margin: 0 10px; font-weight: bold;">Mei 2025</span>
                        <button class="action-btn btn-secondary">Bulan Berikutnya</button>
                    </div>
                </div>
                <div class="panel-body">
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px;">
                        <!-- Calendar header (day names) -->
                        <div style="text-align: center; font-weight: bold; padding: 10px; background-color: #f8f9fa;">Min</div>
                        <div style="text-align: center; font-weight: bold; padding: 10px; background-color: #f8f9fa;">Sen</div>
                        <div style="text-align: center; font-weight: bold; padding: 10px; background-color: #f8f9fa;">Sel</div>
                        <div style="text-align: center; font-weight: bold; padding: 10px; background-color: #f8f9fa;">Rab</div>
                        <div style="text-align: center; font-weight: bold; padding: 10px; background-color: #f8f9fa;">Kam</div>
                        <div style="text-align: center; font-weight: bold; padding: 10px; background-color: #f8f9fa;">Jum</div>
                        <div style="text-align: center; font-weight: bold; padding: 10px; background-color: #f8f9fa;">Sab</div>
                        
                        <!-- Empty cells for days before May 1st (May 2025 starts on Thursday) -->
                        <div style="height: 100px;"></div>
                        <div style="height: 100px;"></div>
                        <div style="height: 100px;"></div>
                        <div style="height: 100px;"></div>
                        
                        <!-- Calendar days with promotion indicators -->
                        ${generateCalendarDays(2025, 5)}
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Analisis Performa Promosi</h3>
                </div>
                <div class="panel-body">
                    <div class="tabs">
                        <div class="tab active">Ringkasan</div>
                        <div class="tab">Perbandingan</div>
                        <div class="tab">Detail Outlet</div>
                    </div>
                    <div class="tab-content active">
                        <div class="dashboard-stats">
                            <div class="stat-card">
                                <h3>Promosi Aktif</h3>
                                <div class="value">4</div>
                                <div class="trend up">↑ 1 dari bulan lalu</div>
                            </div>
                            <div class="stat-card">
                                <h3>Kenaikan Penjualan</h3>
                                <div class="value">12.5%</div>
                                <div class="trend up">↑ 2.3% dari bulan lalu</div>
                            </div>
                            <div class="stat-card">
                                <h3>Nilai Diskon</h3>
                                <div class="value">Rp 5.8 Juta</div>
                                <div class="trend up">↑ Rp 1.2 Juta dari bulan lalu</div>
                            </div>
                            <div class="stat-card">
                                <h3>Conversion Rate</h3>
                                <div class="value">8.7%</div>
                                <div class="trend up">↑ 1.2% dari bulan lalu</div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 20px;">
                            <h4>Efektivitas Promosi (Top 3)</h4>
                            <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-top: 10px;">
                                <div style="margin-bottom: 15px;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                        <span>Diskon Mingguan Produk Susu</span>
                                        <span>85%</span>
                                    </div>
                                    <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                        <div style="width: 85%; height: 100%; background-color: #3498db;"></div>
                                    </div>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                        <span>Beli 2 Gratis 1 Indomie</span>
                                        <span>78%</span>
                                    </div>
                                    <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                        <div style="width: 78%; height: 100%; background-color: #2ecc71;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                        <span>Happy Hour Minuman Dingin</span>
                                        <span>72%</span>
                                    </div>
                                    <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                        <div style="width: 72%; height: 100%; background-color: #f39c12;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Perbandingan tab content -->
                        <p style="margin: 15px 0;">Konten perbandingan promosi akan ditampilkan di sini.</p>
                    </div>
                    <div class="tab-content">
                        <!-- Detail Outlet tab content -->
                        <p style="margin: 15px 0;">Detail performa promosi per outlet akan ditampilkan di sini.</p>
                    </div>
                </div>
            </div>
        `;
        
        contentArea.innerHTML = html;
        
        // Initialize event listeners
        initializeEventListeners();
    }
    
    // Generate calendar days for a given month and year
    function generateCalendarDays(year, month) {
        // For simplicity, we're assuming we're generating May 2025
        // which starts on Thursday (index 4) and has 31 days
        let html = '';
        
        // Current date for highlighting
        const currentDate = 8; // Assuming it's May 8th
        
        // Generate days from 1 to 31
        for (let day = 1; day <= 31; day++) {
            const hasPromotions = getPromotionsForDate(year, month, day);
            const isToday = day === currentDate;
            
            html += `
                <div style="
                    min-height: 100px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 5px;
                    background-color: ${isToday ? '#e3f2fd' : 'white'};
                    position: relative;
                ">
                    <div style="
                        font-weight: ${isToday ? 'bold' : 'normal'};
                        color: ${isToday ? '#0056b3' : 'inherit'};
                    ">${day}</div>
                    
                    ${hasPromotions.map(promo => `
                        <div style="
                            margin-top: 2px;
                            padding: 2px 4px;
                            border-radius: 3px;
                            font-size: 11px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            background-color: ${getPromoColor(promo.type)};
                            color: white;
                        " title="${promo.name}">
                            ${promo.name}
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        return html;
    }
    
    // Helper function to get promotions for a specific date
    function getPromotionsForDate(year, month, day) {
        // This is a simplified implementation
        // In a real app, you would check actual date ranges and day conditions
        
        // Convert date to string format for comparison (YYYY-MM-DD)
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        // Days of the week in Indonesian (0 = Sunday, 1 = Monday, etc.)
        const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        
        // Calculate the day of the week for this date
        // Note: This is a simplified calculation for May 2025
        // In a real app, you would use the Date object
        const dayIndex = (day + 3) % 7; // May 1st, 2025 is a Thursday (index 4)
        const dayName = daysOfWeek[dayIndex];
        
        // Check if any promotions are active on this date
        return promotionData.filter(promo => {
            // Check if promotion is active
            if (promo.status !== 'Aktif') return false;
            
            // Check date range
            const startDateValid = promo.startDate <= dateStr;
            const endDateValid = promo.endDate >= dateStr;
            
            // Check if this day of the week is included in the promotion
            const dayValid = promo.daysActive.includes(dayName);
            
            return startDateValid && endDateValid && dayValid;
        });
    }
    
    // Get color for promotion type
    function getPromoColor(type) {
        switch(type) {
            case 'Diskon': return '#3498db';
            case 'Bundle': return '#2ecc71';
            case 'Diskon Member': return '#e74c3c';
            default: return '#95a5a6';
        }
    }
    
    // Initialize event listeners for interactive elements
    function initializeEventListeners() {
        // Add new promotion button
        const addNewPromoBtn = document.getElementById('addNewPromoBtn');
        if (addNewPromoBtn) {
            addNewPromoBtn.addEventListener('click', function() {
                alert('Form pembuatan promosi baru akan ditampilkan di sini.');
                // Here you would typically open a modal for creating a new promotion
            });
        }
        
        // View promotion detail buttons
        document.querySelectorAll('.btn-view-promo').forEach(button => {
            button.addEventListener('click', function() {
                const promoId = this.getAttribute('data-id');
                const promo = promotionData.find(p => p.id === promoId);
                
                if (promo) {
                    let outlets = '';
                    if (promo.outlets && promo.outlets.length > 0) {
                        outlets = promo.outlets.map(id => {
                            const outlet = outletData.find(o => o.id === id);
                            return outlet ? outlet.name : `Outlet ID ${id}`;
                        }).join(', ');
                    }
                    
                    alert(`Detail Promosi: ${promo.name}\n\nDeskripsi: ${promo.description}\nPeriode: ${promo.startDate} s/d ${promo.endDate}\nHari Aktif: ${promo.daysActive.join(', ')}\nOutlet: ${outlets}`);
                }
            });
        });
        
        // Edit promotion buttons
        document.querySelectorAll('.btn-edit-promo').forEach(button => {
            button.addEventListener('click', function() {
                const promoId = this.getAttribute('data-id');
                alert(`Form edit promosi dengan ID: ${promoId} akan ditampilkan di sini.`);
            });
        });
    }
    
    // Public methods
    return {
        loadPromosiLokal
    };
})();