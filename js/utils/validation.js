/**
 * Validation Utility
 * Handles form and data validations for the Indomaret Management System
 */

const Validation = {
    /**
     * Validate that a value is not empty
     * @param {*} value - The value to check
     * @returns {boolean} - True if valid, false if empty
     */
    isNotEmpty: function(value) {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim() !== '';
        return true;
    },
    
    /**
     * Validate that a value is a valid number
     * @param {*} value - The value to check
     * @returns {boolean} - True if a valid number, false otherwise
     */
    isNumber: function(value) {
        if (typeof value === 'number') return !isNaN(value);
        if (typeof value === 'string') return !isNaN(Number(value));
        return false;
    },
    
    /**
     * Validate that a value is a positive number
     * @param {*} value - The value to check
     * @returns {boolean} - True if a positive number, false otherwise
     */
    isPositiveNumber: function(value) {
        return this.isNumber(value) && Number(value) > 0;
    },
    
    /**
     * Validate that a value is a non-negative number (zero or positive)
     * @param {*} value - The value to check
     * @returns {boolean} - True if a non-negative number, false otherwise
     */
    isNonNegativeNumber: function(value) {
        return this.isNumber(value) && Number(value) >= 0;
    },
    
    /**
     * Validate that a value is within a specified range
     * @param {*} value - The value to check
     * @param {number} min - The minimum allowed value
     * @param {number} max - The maximum allowed value
     * @returns {boolean} - True if within range, false otherwise
     */
    isInRange: function(value, min, max) {
        if (!this.isNumber(value)) return false;
        const num = Number(value);
        return num >= min && num <= max;
    },
    
    /**
     * Validate that a value is a valid date
     * @param {*} value - The value to check
     * @returns {boolean} - True if a valid date, false otherwise
     */
    isDate: function(value) {
        if (!value) return false;
        const date = new Date(value);
        return !isNaN(date.getTime());
    },
    
    /**
     * Validate that a date is not in the future
     * @param {*} value - The date value to check
     * @returns {boolean} - True if not in the future, false otherwise
     */
    isNotFutureDate: function(value) {
        if (!this.isDate(value)) return false;
        const date = new Date(value);
        const today = new Date();
        today.setHours(23, 59, 59, 999); // End of today
        return date <= today;
    },
    
    /**
     * Validate that a value is a valid email address
     * @param {string} value - The email to validate
     * @returns {boolean} - True if a valid email, false otherwise
     */
    isEmail: function(value) {
        if (!value || typeof value !== 'string') return false;
        // Simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    
    /**
     * Validate that a value is a valid Indonesian phone number
     * @param {string} value - The phone number to validate
     * @returns {boolean} - True if a valid phone number, false otherwise
     */
    isPhoneNumber: function(value) {
        if (!value || typeof value !== 'string') return false;
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, '');
        // Check if it starts with 0 or 62 (Indonesia country code)
        return (digits.startsWith('0') || digits.startsWith('62')) && 
               (digits.length >= 10 && digits.length <= 14);
    },
    
    /**
     * Validate form fields
     * @param {Object} fields - Object with field name as key and value as value
     * @param {Object} rules - Object with field name as key and array of validation rules as value
     * @returns {Object} - Object with validation results: {isValid, errors}
     */
    validateForm: function(fields, rules) {
        const errors = {};
        let isValid = true;
        
        for (const fieldName in rules) {
            if (!rules.hasOwnProperty(fieldName)) continue;
            
            const fieldRules = rules[fieldName];
            const value = fields[fieldName];
            const fieldErrors = [];
            
            for (const rule of fieldRules) {
                let isValidField = true;
                let errorMessage = '';
                
                switch (rule.type) {
                    case 'required':
                        isValidField = this.isNotEmpty(value);
                        errorMessage = rule.message || 'Field ini wajib diisi';
                        break;
                    case 'number':
                        isValidField = this.isNumber(value);
                        errorMessage = rule.message || 'Harap masukkan angka yang valid';
                        break;
                    case 'positive':
                        isValidField = this.isPositiveNumber(value);
                        errorMessage = rule.message || 'Harap masukkan angka positif';
                        break;
                    case 'nonNegative':
                        isValidField = this.isNonNegativeNumber(value);
                        errorMessage = rule.message || 'Harap masukkan angka non-negatif';
                        break;
                    case 'range':
                        isValidField = this.isInRange(value, rule.min, rule.max);
                        errorMessage = rule.message || `Harap masukkan angka antara ${rule.min} dan ${rule.max}`;
                        break;
                    case 'date':
                        isValidField = this.isDate(value);
                        errorMessage = rule.message || 'Harap masukkan tanggal yang valid';
                        break;
                    case 'notFutureDate':
                        isValidField = this.isNotFutureDate(value);
                        errorMessage = rule.message || 'Tanggal tidak boleh di masa depan';
                        break;
                    case 'email':
                        isValidField = this.isEmail(value);
                        errorMessage = rule.message || 'Harap masukkan alamat email yang valid';
                        break;
                    case 'phone':
                        isValidField = this.isPhoneNumber(value);
                        errorMessage = rule.message || 'Harap masukkan nomor telepon yang valid';
                        break;
                    case 'custom':
                        if (typeof rule.validate === 'function') {
                            isValidField = rule.validate(value, fields);
                            errorMessage = rule.message || 'Validasi gagal';
                        }
                        break;
                }
                
                if (!isValidField) {
                    fieldErrors.push(errorMessage);
                    isValid = false;
                    break; // Stop on first error for this field
                }
            }
            
            if (fieldErrors.length > 0) {
                errors[fieldName] = fieldErrors[0]; // Get first error message
            }
        }
        
        return {
            isValid,
            errors
        };
    },
    
    /**
     * Validate a stock audit form
     * @param {Object} auditData - The audit data to validate
     * @returns {Object} - Validation result object
     */
    validateStockAudit: function(auditData) {
        const rules = {
            auditDate: [
                { type: 'required', message: 'Tanggal audit wajib diisi' },
                { type: 'date', message: 'Format tanggal tidak valid' },
                { type: 'notFutureDate', message: 'Tanggal audit tidak boleh di masa depan' }
            ],
            outlet: [
                { type: 'required', message: 'Outlet wajib dipilih' }
            ]
        };
        
        // Check if there are any physical stock entries with invalid values
        if (auditData.items && Array.isArray(auditData.items)) {
            for (let i = 0; i < auditData.items.length; i++) {
                const item = auditData.items[i];
                if (!this.isNonNegativeNumber(item.physicalStock)) {
                    const result = this.validateForm(auditData, rules);
                    result.isValid = false;
                    result.errors['items'] = `Stok fisik harus berupa angka non-negatif pada baris ${i + 1}`;
                    return result;
                }
            }
        }
        
        return this.validateForm(auditData, rules);
    },
    
    /**
     * Validate a stock receipt form
     * @param {Object} receiptData - The receipt data to validate
     * @returns {Object} - Validation result object
     */
    validateStockReceipt: function(receiptData) {
        const rules = {
            receiptDate: [
                { type: 'required', message: 'Tanggal penerimaan wajib diisi' },
                { type: 'date', message: 'Format tanggal tidak valid' }
            ],
            supplier: [
                { type: 'required', message: 'Supplier wajib dipilih' }
            ],
            receiptNo: [
                { type: 'required', message: 'Nomor penerimaan wajib diisi' }
            ]
        };
        
        // Check if there are any item entries with invalid values
        if (receiptData.items && Array.isArray(receiptData.items)) {
            for (let i = 0; i < receiptData.items.length; i++) {
                const item = receiptData.items[i];
                if (!this.isPositiveNumber(item.quantity)) {
                    const result = this.validateForm(receiptData, rules);
                    result.isValid = false;
                    result.errors['items'] = `Jumlah harus berupa angka positif pada baris ${i + 1}`;
                    return result;
                }
            }
        } else {
            // If no items or items is not an array
            const result = this.validateForm(receiptData, rules);
            result.isValid = false;
            result.errors['items'] = 'Minimal satu produk harus ditambahkan';
            return result;
        }
        
        return this.validateForm(receiptData, rules);
    },
    
    /**
     * Validate a sales transaction
     * @param {Object} salesData - The sales data to validate
     * @returns {Object} - Validation result object
     */
    validateSales: function(salesData) {
        const rules = {
            paymentMethod: [
                { type: 'required', message: 'Metode pembayaran wajib dipilih' }
            ]
        };
        
        // Add rules for cash payment
        if (salesData.paymentMethod === 'cash') {
            rules.cashAmount = [
                { type: 'required', message: 'Jumlah diterima wajib diisi' },
                { type: 'positive', message: 'Jumlah diterima harus positif' },
                { 
                    type: 'custom', 
                    validate: (value) => Number(value) >= salesData.totalAmount,
                    message: 'Jumlah diterima harus lebih besar atau sama dengan total belanja'
                }
            ];
        }
        
        // Check if there are any items in the cart
        if (!salesData.items || salesData.items.length === 0) {
            const result = this.validateForm(salesData, rules);
            result.isValid = false;
            result.errors['cart'] = 'Keranjang belanja kosong';
            return result;
        }
        
        // Check if all items have valid quantities
        for (let i = 0; i < salesData.items.length; i++) {
            const item = salesData.items[i];
            if (!this.isPositiveNumber(item.quantity)) {
                const result = this.validateForm(salesData, rules);
                result.isValid = false;
                result.errors['items'] = `Jumlah harus berupa angka positif untuk ${item.name}`;
                return result;
            }
        }
        
        return this.validateForm(salesData, rules);
    },
    
    /**
     * Validate PPOB transaction
     * @param {Object} ppobData - The PPOB data to validate
     * @returns {Object} - Validation result object
     */
    validatePpob: function(ppobData) {
        const rules = {
            customerNumber: [
                { type: 'required', message: 'Nomor pelanggan wajib diisi' }
            ],
            ppobType: [
                { type: 'required', message: 'Jenis layanan wajib dipilih' }
            ],
            nominal: [
                { type: 'required', message: 'Nominal wajib diisi' },
                { type: 'positive', message: 'Nominal harus positif' }
            ]
        };
        
        // If other nominal is selected, validate custom nominal
        if (ppobData.ppobNominal === 'other') {
            rules.customNominal = [
                { type: 'required', message: 'Nominal kustom wajib diisi' },
                { type: 'positive', message: 'Nominal harus positif' }
            ];
        }
        
        return this.validateForm(ppobData, rules);
    },
    
    /**
     * Validate member registration
     * @param {Object} memberData - The member data to validate
     * @returns {Object} - Validation result object
     */
    validateMemberRegistration: function(memberData) {
        const rules = {
            name: [
                { type: 'required', message: 'Nama lengkap wajib diisi' }
            ],
            phone: [
                { type: 'required', message: 'Nomor telepon wajib diisi' },
                { type: 'phone', message: 'Format nomor telepon tidak valid' }
            ],
            email: [
                { type: 'email', message: 'Format email tidak valid' }
            ],
            birthdate: [
                { type: 'date', message: 'Format tanggal lahir tidak valid' },
                { type: 'notFutureDate', message: 'Tanggal lahir tidak boleh di masa depan' }
            ],
            termsAgree: [
                { 
                    type: 'custom',
                    validate: (value) => value === true,
                    message: 'Anda harus menyetujui syarat dan ketentuan'
                }
            ]
        };
        
        return this.validateForm(memberData, rules);
    }
};

// Export the validation utility
export default Validation;