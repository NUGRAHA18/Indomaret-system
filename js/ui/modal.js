/**
 * Modal Manager Module
 * Handles all modal-related functionality for the Indomaret Management System
 */

// Modal manager module
const ModalManager = (() => {
    
    // Initialize modal functionality
    function init() {
        // Add close button event listeners
        document.querySelectorAll('[data-close-modal]').forEach(button => {
            button.addEventListener('click', function() {
                const modalId = this.getAttribute('data-close-modal');
                closeModal(modalId);
            });
        });

        // Add click outside to close functionality
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    const modalId = this.getAttribute('id');
                    closeModal(modalId);
                }
            });
        });

        // Initialize modal-specific elements
        initStockAuditModal();
        initStockReceiptModal();
        initSalesModal();
        initPpobModal();
        initMemberRegistrationModal();
        
        // Initialize date inputs with current date
        const today = new Date().toISOString().split('T')[0];
        document.querySelectorAll('.modal input[type="date"]').forEach(input => {
            input.value = today;
        });
    }
    
    // Open a modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            triggerModalOpen(modalId);
        }
    }
    
    // Close a modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    // Trigger actions when a modal is opened
    function triggerModalOpen(modalId) {
        switch(modalId) {
            case 'stockAuditModal':
                // Reset form
                document.getElementById('auditNotes').value = '';
                break;
            case 'stockReceiptModal':
                // Reset form
                document.getElementById('receiptNotes').value = '';
                break;
            case 'ppobModal':
                // Reset form
                document.getElementById('ppobResult').style.display = 'none';
                document.getElementById('processPpobBtn').style.display = 'none';
                document.getElementById('customerNumber').value = '';
                document.getElementById('ppobNominal').value = '50000';
                document.getElementById('otherNominal').style.display = 'none';
                document.getElementById('customNominal').value = '';
                break;
            case 'memberRegistrationModal':
                // Reset form
                document.getElementById('memberName').value = '';
                document.getElementById('memberPhone').value = '';
                document.getElementById('memberEmail').value = '';
                document.getElementById('memberBirthdate').value = new Date().toISOString().split('T')[0];
                document.getElementById('memberGender').value = 'male';
                document.getElementById('memberAddress').value = '';
                document.getElementById('termsAgree').checked = false;
                break;
        }
    }
    
    // Initialize stock audit modal
    function initStockAuditModal() {
        // Add event listeners for stock input changes
        document.querySelectorAll('#stockAuditModal .stock-input').forEach(input => {
            input.addEventListener('input', function() {
                const row = this.closest('tr');
                const systemStock = parseInt(row.cells[2].textContent);
                const physicalStock = parseInt(this.value) || 0;
                const diff = physicalStock - systemStock;
                row.querySelector('.stock-diff').textContent = diff;
                
                if (diff < 0) {
                    row.querySelector('.stock-diff').style.color = 'red';
                } else if (diff > 0) {
                    row.querySelector('.stock-diff').style.color = 'green';
                } else {
                    row.querySelector('.stock-diff').style.color = 'black';
                }
            });
        });

        // Add save button functionality
        const saveAuditBtn = document.getElementById('saveAuditBtn');
        if (saveAuditBtn) {
            saveAuditBtn.addEventListener('click', function() {
                closeModal('stockAuditModal');
                alert('Audit stok berhasil disimpan!');
            });
        }
    }
    
    // Initialize stock receipt modal
    function initStockReceiptModal() {
        // Add quantity input event listeners
        document.querySelectorAll('#stockReceiptModal .qty-input').forEach(input => {
            input.addEventListener('input', function() {
                const row = this.closest('tr');
                const priceText = row.cells[3].textContent;
                const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                const quantity = parseInt(this.value) || 0;
                const subtotal = price * quantity;
                
                row.cells[4].textContent = `Rp ${subtotal.toLocaleString()}`;
            });
        });

        // Add save button functionality
        const saveReceiptBtn = document.getElementById('saveReceiptBtn');
        if (saveReceiptBtn) {
            saveReceiptBtn.addEventListener('click', function() {
                closeModal('stockReceiptModal');
                alert('Penerimaan stock berhasil disimpan!');
            });
        }
    }
    
    // Initialize sales modal
    function initSalesModal() {
        // Customer type change handler
        const customerType = document.getElementById('customerType');
        if (customerType) {
            customerType.addEventListener('change', function() {
                if (this.value === 'member') {
                    document.getElementById('memberIdGroup').style.display = 'block';
                } else {
                    document.getElementById('memberIdGroup').style.display = 'none';
                }
            });
        }

        // Product search functionality
        const productSearch = document.getElementById('productSearch');
        if (productSearch) {
            productSearch.addEventListener('focus', function() {
                document.getElementById('searchResults').style.display = 'block';
            });
            
            productSearch.addEventListener('blur', function() {
                setTimeout(() => {
                    document.getElementById('searchResults').style.display = 'none';
                }, 200);
            });
        }

        // Search result click handler
        document.querySelectorAll('.search-item').forEach(item => {
            item.addEventListener('click', function() {
                document.getElementById('productSearch').value = this.textContent;
                document.getElementById('searchResults').style.display = 'none';
                
                // Here would be code to add item to cart
                // For demo, just update totals
                updateCartTotal();
            });
        });

        // Initialize quantity change handlers
        document.querySelectorAll('#cartItems .qty-input').forEach(input => {
            input.addEventListener('input', function() {
                updateSubtotal(this);
                updateCartTotal();
            });
        });

        // Process payment button
        const processPaymentBtn = document.getElementById('processPaymentBtn');
        if (processPaymentBtn) {
            processPaymentBtn.addEventListener('click', function() {
                closeModal('salesModal');
                alert('Pembayaran berhasil diproses!');
            });
        }
        
        // Add event listeners to delete buttons in cart
        document.querySelectorAll('#cartItems .btn-danger').forEach(button => {
            button.addEventListener('click', function() {
                this.closest('tr').remove();
                updateCartTotal();
            });
        });
    }
    
    // Update subtotal for a product row
    function updateSubtotal(inputElement) {
        const row = inputElement.closest('tr');
        const priceText = row.cells[2].textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        const quantity = parseInt(inputElement.value) || 0;
        const subtotal = price * quantity;
        
        row.cells[4].textContent = 'Rp ' + subtotal.toLocaleString();
    }
    
    // Update cart total
    function updateCartTotal() {
        let total = 0;
        document.querySelectorAll('#cartItems tr').forEach(row => {
            const subtotalText = row.cells[4].textContent;
            const subtotal = parseInt(subtotalText.replace(/[^0-9]/g, ''));
            total += subtotal;
        });
        
        // Update total display
        const totalDisplay = document.querySelector('#salesModal .form-group[style*="text-align: right"]');
        if (totalDisplay) {
            totalDisplay.textContent = 'Total: Rp ' + total.toLocaleString();
        }
        
        // Update change amount
        const cashAmount = parseInt(document.getElementById('cashAmount').value) || 0;
        const change = cashAmount - total;
        
        const changeDisplay = document.querySelector('#cashPayment div[style*="text-align: right"]');
        if (changeDisplay) {
            changeDisplay.textContent = 'Kembalian: Rp ' + (change > 0 ? change.toLocaleString() : 0);
        }
    }
    
    // Initialize PPOB modal
    function initPpobModal() {
        // PPOB nominal change handler
        const ppobNominal = document.getElementById('ppobNominal');
        if (ppobNominal) {
            ppobNominal.addEventListener('change', function() {
                if (this.value === 'other') {
                    document.getElementById('otherNominal').style.display = 'block';
                } else {
                    document.getElementById('otherNominal').style.display = 'none';
                }
            });
        }

        // Check PPOB button
        const checkPpobBtn = document.getElementById('checkPpobBtn');
        if (checkPpobBtn) {
            checkPpobBtn.addEventListener('click', function() {
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
                
                // Display result
                displayPpobResult(customerNumber, ppobType, nominal);
            });
        }

        // Process PPOB payment
        const processPpobBtn = document.getElementById('processPpobBtn');
        if (processPpobBtn) {
            processPpobBtn.addEventListener('click', function() {
                alert('Pembayaran berhasil diproses!');
                closeModal('ppobModal');
            });
        }
    }
    
    // Display PPOB result
    function displayPpobResult(customerNumber, ppobType, nominal) {
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
    
    // Initialize member registration modal
    function initMemberRegistrationModal() {
        // Save member registration
        const saveMemberBtn = document.getElementById('saveMemberBtn');
        if (saveMemberBtn) {
            saveMemberBtn.addEventListener('click', function() {
                const name = document.getElementById('memberName').value;
                const phone = document.getElementById('memberPhone').value;
                const termsAgree = document.getElementById('termsAgree').checked;
                
                if (!name || !phone) {
                    alert('Harap isi nama dan nomor telepon!');
                    return;
                }
                
                if (!termsAgree) {
                    alert('Harap setujui syarat dan ketentuan!');
                    return;
                }
                
                alert('Registrasi member berhasil!\nNomor Member: M' + Math.floor(1000 + Math.random() * 9000));
                closeModal('memberRegistrationModal');
            });
        }
    }
    
    // Public methods
    return {
        init,
        openModal,
        closeModal
    };
})();