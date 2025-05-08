/**
 * Sales Module
 * Handles sales operations including transactions and billing
 */
const SalesModule = (() => {
    // Load penjualan content
    function loadPenjualan() {
        const html = `
            <div class="dashboard-header">
                <h2>Penjualan</h2>
                <p>Kelola transaksi penjualan</p>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Transaksi</h3>
                    <button class="action-btn btn-primary" onclick="ModalManager.openModal('salesModal')">Transaksi Baru</button>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>No. Transaksi</th>
                                    <th>Waktu</th>
                                    <th>Kasir</th>
                                    <th>Total</th>
                                    <th>Pembayaran</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${getRecentTransactions()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Produk Terlaris Hari Ini</h3>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Kode</th>
                                    <th>Nama Produk</th>
                                    <th>Kategori</th>
                                    <th>Terjual</th>
                                    <th>Harga</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${getTopSellingProducts()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('contentArea').innerHTML = html;
    }
    
    // Generate recent transactions table rows
    function getRecentTransactions() {
        return salesData.slice(0, 5).map((sale, index) => `
            <tr>
                <td>${sale.id}</td>
                <td>${sale.date} ${14 - index}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}</td>
                <td>Ani Wijaya</td>
                <td>Rp ${sale.total.toLocaleString()}</td>
                <td>${sale.payment}</td>
                <td><span class="status success">${sale.status}</span></td>
                <td>
                    <button class="action-btn btn-primary" onclick="SalesModule.printReceipt('${sale.id}')">Cetak</button>
                    <button class="action-btn btn-secondary" onclick="SalesModule.viewTransactionDetail('${sale.id}')">Detail</button>
                </td>
            </tr>
        `).join('');
    }
    
    // Generate top selling products table rows
    function getTopSellingProducts() {
        // This would normally fetch from an API, using dummy data for now
        const topSellingData = [
            { code: 'P001', name: 'Indomie Goreng', category: 'Makanan', sold: 24, price: 3500, total: 84000 },
            { code: 'P002', name: 'Aqua 600ml', category: 'Minuman', sold: 18, price: 4000, total: 72000 },
            { code: 'P003', name: 'Pocari Sweat', category: 'Minuman', sold: 12, price: 7500, total: 90000 },
            { code: 'P006', name: 'Indomie Rebus', category: 'Makanan', sold: 10, price: 3200, total: 32000 },
            { code: 'P008', name: 'Good Day Coffee', category: 'Minuman', sold: 9, price: 7000, total: 63000 }
        ];
        
        return topSellingData.map(product => `
            <tr>
                <td>${product.code}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.sold}</td>
                <td>Rp ${product.price.toLocaleString()}</td>
                <td>Rp ${product.total.toLocaleString()}</td>
            </tr>
        `).join('');
    }
    
    // Print receipt for a transaction
    function printReceipt(transactionId) {
        const transaction = salesData.find(t => t.id === transactionId);
        if (!transaction) return;
        
        // In a real application, this would call the printer service
        alert(`Cetak struk untuk transaksi ${transactionId}`);
        
        // Similar receipt generation as in PPOB module
    }
    
    // View transaction detail
    function viewTransactionDetail(transactionId) {
        const transaction = salesData.find(t => t.id === transactionId);
        if (!transaction) return;
        
        // Create modal dynamically or use an existing one with updated content
        const modalContent = `
            <div class="modal-header">
                <h3>Detail Transaksi</h3>
                <button class="close-btn" onclick="ModalManager.closeModal('transactionDetailModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="panel">
                    <div class="panel-header">
                        <h3>Informasi Transaksi</h3>
                    </div>
                    <div class="panel-body">
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div>
                                <div class="form-group">
                                    <label>No. Transaksi</label>
                                    <div>${transaction.id}</div>
                                </div>
                                <div class="form-group">
                                    <label>Tanggal</label>
                                    <div>${transaction.date}</div>
                                </div>
                                <div class="form-group">
                                    <label>Kasir</label>
                                    <div>Ani Wijaya</div>
                                </div>
                            </div>
                            <div>
                                <div class="form-group">
                                    <label>Pelanggan</label>
                                    <div>${transaction.customer}</div>
                                </div>
                                <div class="form-group">
                                    <label>Metode Pembayaran</label>
                                    <div>${transaction.payment}</div>
                                </div>
                                <div class="form-group">
                                    <label>Status</label>
                                    <div><span class="status success">${transaction.status}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="panel">
                    <div class="panel-header">
                        <h3>Detail Produk</h3>
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kode</th>
                                        <th>Nama Produk</th>
                                        <th>Harga</th>
                                        <th>Jumlah</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${getTransactionItems(transaction)}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4" style="text-align: right; font-weight: bold;">Total:</td>
                                        <td style="font-weight: bold;">Rp ${transaction.total.toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="action-btn btn-secondary" onclick="ModalManager.closeModal('transactionDetailModal')">Tutup</button>
                <button class="action-btn btn-primary" onclick="SalesModule.printReceipt('${transaction.id}')">Cetak Struk</button>
            </div>
        `;
        
        // Create or update modal
        if (document.getElementById('transactionDetailModal')) {
            document.getElementById('transactionDetailModal').querySelector('.modal-content').innerHTML = modalContent;
        } else {
            const modal = document.createElement('div');
            modal.id = 'transactionDetailModal';
            modal.className = 'modal';
            modal.innerHTML = `<div class="modal-content">${modalContent}</div>`;
            document.body.appendChild(modal);
        }
        
        ModalManager.openModal('transactionDetailModal');
    }
    
    // Generate transaction items table rows
    function getTransactionItems(transaction) {
        // This would normally fetch from an API, using dummy data for now
        const items = [];
        const count = transaction.items;
        
        for (let i = 0; i < count; i++) {
            const product = inventoryData[Math.floor(Math.random() * inventoryData.length)];
            const qty = Math.floor(Math.random() * 3) + 1;
            const subtotal = product.price * qty;
            
            items.push({
                code: product.id,
                name: product.name,
                price: product.price,
                qty: qty,
                subtotal: subtotal
            });
        }
        
        return items.map(item => `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>Rp ${item.price.toLocaleString()}</td>
                <td>${item.qty}</td>
                <td>Rp ${item.subtotal.toLocaleString()}</td>
            </tr>
        `).join('');
    }
    
    // Initialize sales module
    function init() {
        // Customer type change in sales modal
        const customerTypeSelect = document.getElementById('customerType');
        if (customerTypeSelect) {
            customerTypeSelect.addEventListener('change', function() {
                if (this.value === 'member') {
                    document.getElementById('memberIdGroup').style.display = 'block';
                } else {
                    document.getElementById('memberIdGroup').style.display = 'none';
                }
            });
        }
        
        // Product search functionality
        const productSearchInput = document.getElementById('productSearch');
        if (productSearchInput) {
            productSearchInput.addEventListener('focus', function() {
                document.getElementById('searchResults').style.display = 'block';
            });
            
            productSearchInput.addEventListener('blur', function() {
                setTimeout(() => {
                    document.getElementById('searchResults').style.display = 'none';
                }, 200);
            });
        }
        
        // Search result item click
        const searchItems = document.querySelectorAll('.search-item');
        searchItems.forEach(item => {
            item.addEventListener('click', function() {
                if (productSearchInput) {
                    productSearchInput.value = this.textContent;
                }
                document.getElementById('searchResults').style.display = 'none';
                
                // Add item to cart (sample)
                const productCode = this.textContent.match(/\(([^)]+)\)/)[1];
                addToCart(productCode);
            });
        });
        
        // Payment method change handler
        const paymentMethodSelect = document.getElementById('paymentMethod');
        if (paymentMethodSelect) {
            paymentMethodSelect.addEventListener('change', function() {
                const cashPaymentDiv = document.getElementById('cashPayment');
                
                if (this.value === 'cash') {
                    cashPaymentDiv.style.display = 'block';
                } else {
                    cashPaymentDiv.style.display = 'none';
                }
            });
        }
        
        // Cash amount input handler
        const cashAmountInput = document.getElementById('cashAmount');
        if (cashAmountInput) {
            cashAmountInput.addEventListener('input', updateCartTotal);
        }
        
        // Cart quantity inputs
        const qtyInputs = document.querySelectorAll('#cartItems .qty-input');
        qtyInputs.forEach(input => {
            input.addEventListener('input', function() {
                updateSubtotals(this);
            });
        });
        
        // Process payment button functionality
        const processPaymentBtn = document.getElementById('processPaymentBtn');
        if (processPaymentBtn) {
            processPaymentBtn.addEventListener('click', function() {
                ModalManager.closeModal('salesModal');
                alert('Pembayaran berhasil diproses!');
                
                // If we're in the sales page, refresh the transaction list
                if (document.querySelector('.dashboard-header h2').textContent === 'Penjualan') {
                    loadPenjualan();
                }
            });
        }
        
        // Handle cart item removal
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-danger') && e.target.textContent === 'Hapus') {
                const row = e.target.closest('tr');
                if (row) {
                    row.remove();
                    
                    // Update cart total if in sales modal
                    if (document.getElementById('salesModal').style.display === 'flex') {
                        updateCartTotal();
                    }
                }
            }
        });
    }
    
    // Add product to cart
    function addToCart(productCode) {
        const product = inventoryData.find(p => p.id === productCode);
        if (!product) return;
        
        const cartTable = document.getElementById('cartItems');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>Rp ${product.price.toLocaleString()}</td>
            <td><input type="number" class="qty-input" min="1" value="1"></td>
            <td>Rp ${product.price.toLocaleString()}</td>
            <td><button class="action-btn btn-danger">Hapus</button></td>
        `;
        
        cartTable.appendChild(newRow);
        
        // Add event listener to new quantity input
        const qtyInput = newRow.querySelector('.qty-input');
        qtyInput.addEventListener('input', function() {
            updateSubtotals(this);
        });
        
        // Update cart total
        updateCartTotal();
    }
    
    // Update subtotals for quantity inputs in tables
    function updateSubtotals(inputElement) {
        const row = inputElement.closest('tr');
        const priceText = row.cells[2].textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        const quantity = parseInt(inputElement.value) || 0;
        const subtotal = price * quantity;
        
        // Format subtotal as currency
        const formattedSubtotal = 'Rp ' + subtotal.toLocaleString();
        row.cells[4].textContent = formattedSubtotal;
        
        // If in sales modal, update total
        if (inputElement.closest('#salesModal')) {
            updateCartTotal();
        }
    }
    
    // Update cart total in sales modal
    function updateCartTotal() {
        let total = 0;
        const cartItems = document.querySelectorAll('#cartItems tr');
        
        cartItems.forEach(row => {
            const subtotalText = row.cells[4].textContent;
            const subtotal = parseInt(subtotalText.replace(/[^0-9]/g, ''));
            total += subtotal;
        });
        
        // Update total display
        const totalDisplay = document.querySelector('#salesModal .form-group[style*="text-align: right"]');
        if (totalDisplay) {
            totalDisplay.textContent = 'Total: Rp ' + total.toLocaleString();
        }
        
        // Update kembalian if cash payment
        const cashAmount = parseInt(document.getElementById('cashAmount').value) || 0;
        const kembalian = cashAmount - total;
        
        const kembalianDisplay = document.querySelector('#cashPayment div[style*="text-align: right"]');
        if (kembalianDisplay) {
            kembalianDisplay.textContent = 'Kembalian: Rp ' + (kembalian > 0 ? kembalian.toLocaleString() : 0);
        }
    }
    
    // Public methods
    return {
        init,
        loadPenjualan,
        printReceipt,
        viewTransactionDetail,
        addToCart,
        updateSubtotals,
        updateCartTotal
    };
})();