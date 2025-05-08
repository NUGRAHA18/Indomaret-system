/**
 * PPOB Module
 * Handles Payment Point Online Banking services
 */
const PPOBModule = (() => {
    // Sample PPOB service data
    const ppobServices = [
        { id: 'listrik', name: 'Token Listrik', icon: '💡' },
        { id: 'air', name: 'PDAM', icon: '💧' },
        { id: 'internet', name: 'Internet', icon: '🌐' },
        { id: 'pulsa', name: 'Pulsa', icon: '📱' }
    ];
    
    // Sample PPOB transaction data
    const ppobTransactions = [
        { id: 'PPOB-20250508-001', datetime: '2025-05-08 13:45', cashier: 'Ani Wijaya', service: 'Token Listrik', customerNumber: '1234567890', total: 102500, status: 'Sukses' },
        { id: 'PPOB-20250508-002', datetime: '2025-05-08 11:30', cashier: 'Ani Wijaya', service: 'Pulsa', customerNumber: '081234567890', total: 52500, status: 'Sukses' },
        { id: 'PPOB-20250508-003', datetime: '2025-05-08 10:15', cashier: 'Ani Wijaya', service: 'PDAM', customerNumber: '9876543210', total: 152500, status: 'Sukses' },
        { id: 'PPOB-20250507-001', datetime: '2025-05-07 15:20', cashier: 'Ani Wijaya', service: 'Internet', customerNumber: '8765432109', total: 352500, status: 'Sukses' }
    ];
    
    // Load layanan PPOB content
    function loadLayananPPOB() {
        const html = `
            <div class="dashboard-header">
                <h2>Layanan PPOB</h2>
                <p>Kelola layanan pembayaran tagihan dan pembelian</p>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Layanan PPOB</h3>
                    <button class="action-btn btn-primary" onclick="ModalManager.openModal('ppobModal')">Transaksi Baru</button>
                </div>
                <div class="panel-body">
                    <div class="service-cards">
                        ${getPPOBServiceCards()}
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Transaksi Terakhir</h3>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>No. Transaksi</th>
                                    <th>Waktu</th>
                                    <th>Kasir</th>
                                    <th>Layanan</th>
                                    <th>No. Pelanggan</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${getRecentPPOBTransactions()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('contentArea').innerHTML = html;
    }
    
    // Generate PPOB service cards HTML
    function getPPOBServiceCards() {
        return ppobServices.map(service => `
            <div class="service-card" onclick="ModalManager.openModal('ppobModal'); document.getElementById('ppobType').value='${service.id}';">
                <div class="icon">${service.icon}</div>
                <h4>${service.name}</h4>
                <button class="action-btn btn-primary" style="margin-top: 10px;">Bayar</button>
            </div>
        `).join('');
    }
    
    // Generate recent PPOB transactions table rows
    function getRecentPPOBTransactions() {
        return ppobTransactions.map(transaction => `
            <tr>
                <td>${transaction.id}</td>
                <td>${transaction.datetime}</td>
                <td>${transaction.cashier}</td>
                <td>${transaction.service}</td>
                <td>${transaction.customerNumber}</td>
                <td>Rp ${transaction.total.toLocaleString()}</td>
                <td><span class="status success">${transaction.status}</span></td>
                <td>
                    <button class="action-btn btn-primary" onclick="PPOBModule.printReceipt('${transaction.id}')">Cetak</button>
                </td>
            </tr>
        `).join('');
    }
    
    // Print receipt for a PPOB transaction
    function printReceipt(transactionId) {
        const transaction = ppobTransactions.find(t => t.id === transactionId);
        if (!transaction) return;
        
        // In a real application, this would call the printer service
        alert(`Cetak struk untuk transaksi ${transactionId}`);
        
        // Alternative: Show receipt in a modal
        const receiptHTML = `
            <div class="receipt">
                <div class="receipt-header">
                    <div class="receipt-company">INDOMARET</div>
                    <div class="receipt-address">Jl. Sudirman No. 123</div>
                    <div class="receipt-phone">Telp: 021-1234567</div>
                    <div class="receipt-date">${transaction.datetime}</div>
                </div>
                <div class="receipt-divider"></div>
                <div>
                    <div style="margin-bottom: 5px;">No. Transaksi: ${transaction.id}</div>
                    <div style="margin-bottom: 5px;">Layanan: ${transaction.service}</div>
                    <div style="margin-bottom: 5px;">No. Pelanggan: ${transaction.customerNumber}</div>
                </div>
                <div class="receipt-divider"></div>
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Nominal:</span>
                        <span>Rp ${(transaction.total - 2500).toLocaleString()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Biaya Admin:</span>
                        <span>Rp 2.500</span>
                    </div>
                </div>
                <div class="receipt-divider"></div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 10px;">
                    <span>TOTAL:</span>: 
                    <span>Rp ${transaction.total.toLocaleString()}</span>
                </div>
                <div class="receipt-footer">
                    Terima Kasih Atas Kunjungan Anda
                </div>
            </div>
        `;
        
        // Show receipt in a new window/tab for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Struk PPOB - ${transaction.id}</title>
                <style>
                    body { font-family: monospace; width: 80mm; margin: 0 auto; }
                    .receipt { padding: 10px; }
                    .receipt-header { text-align: center; margin-bottom: 10px; }
                    .receipt-company { font-weight: bold; margin-bottom: 5px; }
                    .receipt-divider { border-top: 1px dashed #ccc; margin: 10px 0; }
                    .receipt-footer { text-align: center; margin-top: 10px; }
                </style>
            </head>
            <body>
                ${receiptHTML}
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `);
    }
    
    // Initialize PPOB module
    function init() {
        // Initialize PPOB nominal change event
        const ppobNominalSelect = document.getElementById('ppobNominal');
        if (ppobNominalSelect) {
            ppobNominalSelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    document.getElementById('otherNominal').style.display = 'block';
                } else {
                    document.getElementById('otherNominal').style.display = 'none';
                }
            });
        }
        
        // Check PPOB button functionality
        const checkPpobBtn = document.getElementById('checkPpobBtn');
        if (checkPpobBtn) {
            checkPpobBtn.addEventListener('click', checkPPOBTransaction);
        }
        
        // Process PPOB payment functionality
        const processPpobBtn = document.getElementById('processPpobBtn');
        if (processPpobBtn) {
            processPpobBtn.addEventListener('click', processPPOBPayment);
        }
    }
    
    // Check PPOB transaction details
    function checkPPOBTransaction() {
        const customerNumber = document.getElementById('customerNumber').value;
        const ppobType = document.getElementById('ppobType').value;
        let nominal = document.getElementById('ppobNominal').value;
        
        if (nominal === 'other') {
            nominal = document.getElementById('customNominal').value;
        }
        
        if (!customerNumber) {
            alert('Harap masukkan nomor pelanggan!');
            return;
        }
        
        // Show dummy result - in a real application, this would fetch from an API
        document.getElementById('resultCustomerNumber').textContent = customerNumber;
        document.getElementById('resultCustomerName').textContent = 'John Doe';
        
        let serviceName = '';
        switch(ppobType) {
            case 'listrik': serviceName = 'Token Listrik PLN'; break;
            case 'air': serviceName = 'PDAM'; break;
            case 'internet': serviceName = 'Internet Indihome'; break;
            case 'telepon': serviceName = 'Telepon Rumah'; break;
            case 'pulsa': serviceName = 'Pulsa ' + customerNumber; break;
            case 'pln': serviceName = 'Tagihan Listrik PLN'; break;
        }
        
        document.getElementById('resultService').textContent = serviceName;
        document.getElementById('resultPeriod').textContent = 'Mei 2025';
        
        const amount = parseInt(nominal);
        document.getElementById('resultAmount').textContent = 'Rp ' + amount.toLocaleString();
        
        const fee = 2500;
        document.getElementById('resultFee').textContent = 'Rp ' + fee.toLocaleString();
        
        const total = amount + fee;
        document.getElementById('resultTotal').textContent = 'Rp ' + total.toLocaleString();
        
        document.getElementById('ppobResult').style.display = 'block';
        document.getElementById('processPpobBtn').style.display = 'block';
    }
    
    // Process PPOB payment
    function processPPOBPayment() {
        alert('Pembayaran berhasil diproses!');
        ModalManager.closeModal('ppobModal');
        
        // Reset form
        document.getElementById('ppobResult').style.display = 'none';
        document.getElementById('processPpobBtn').style.display = 'none';
        document.getElementById('customerNumber').value = '';
        document.getElementById('ppobNominal').value = '50000';
        document.getElementById('otherNominal').style.display = 'none';
        document.getElementById('customNominal').value = '';
        
        // Refresh the transaction list
        if (document.querySelector('.dashboard-header h2').textContent === 'Layanan PPOB') {
            loadLayananPPOB();
        }
    }
    
    // Public methods
    return {
        init,
        loadLayananPPOB,
        printReceipt,
        checkPPOBTransaction,
        processPPOBPayment
    };
})();