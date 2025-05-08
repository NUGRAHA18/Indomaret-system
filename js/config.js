// Menu configuration based on user role
const menuConfig = {
    supervisor: [
        { category: 'Dashboard', items: [
            { id: 'dashboard', text: 'Dashboard', icon: '📊' }
        ]},
        { category: 'Inventory Management', items: [
            { id: 'audit-stok', text: 'Audit Stok', icon: '📋' },
            { id: 'monitoring-stok', text: 'Monitoring Kebutuhan Stock', icon: '📈' },
            { id: 'kebijakan-stock', text: 'Kebijakan Stock Outlet', icon: '📑' }
        ]},
        { category: 'Price Management', items: [
            { id: 'promosi-lokal', text: 'Pengelolaan Promosi Lokal', icon: '🏷️' }
        ]},
        { category: 'Management', items: [
            { id: 'laporan-penjualan', text: 'Laporan Penjualan', icon: '📃' }
        ]}
    ],
    manager: [
        { category: 'Dashboard', items: [
            { id: 'dashboard', text: 'Dashboard', icon: '📊' }
        ]},
        { category: 'Inventory Management', items: [
            { id: 'monitoring-stok', text: 'Monitoring Kebutuhan Stock', icon: '📈' },
            { id: 'kebijakan-stock', text: 'Kebijakan Stock Outlet', icon: '📑' },
            { id: 'penerimaan-stock', text: 'Pendataan Penerimaan Stock', icon: '📦' },
            { id: 'update-stock', text: 'Update Data Stock', icon: '🔄' },
            { id: 'kadaluarsa', text: 'Pengelolaan Produk Kadaluarsa', icon: '⚠️' }
        ]},
        { category: 'Price Management', items: [
            { id: 'promosi-lokal', text: 'Pengelolaan Promosi Lokal', icon: '🏷️' },
            { id: 'sinkron-harga', text: 'Sinkron Harga Online', icon: '🔄' },
            { id: 'update-harga', text: 'Update Harga Jual Outlet', icon: '💰' },
            { id: 'update-file', text: 'Sinkron Harga Via Update File', icon: '📂' }
        ]},
        { category: 'Management', items: [
            { id: 'shift-karyawan', text: 'Pengelolaan Shift Karyawan', icon: '👥' },
            { id: 'user-outlet', text: 'Manajemen User Outlet', icon: '👤' },
            { id: 'laporan-penjualan', text: 'Laporan Penjualan', icon: '📃' }
        ]}
    ],
    kasir: [
        { category: 'Dashboard', items: [
            { id: 'dashboard', text: 'Dashboard', icon: '📊' }
        ]},
        { category: 'Sales Operations', items: [
            { id: 'penjualan', text: 'Penjualan', icon: '🛒' },
            { id: 'rekap-tagihan', text: 'Rekap Tagihan', icon: '🧾' }
        ]},
        { category: 'Customer Service', items: [
            { id: 'layanan-ppob', text: 'Layanan PPOB', icon: '💳' },
            { id: 'registrasi-member', text: 'Registrasi Member', icon: '📝' }
        ]}
    ],
    supplier: [
        { category: 'Dashboard', items: [
            { id: 'dashboard', text: 'Dashboard', icon: '📊' }
        ]},
        { category: 'Inventory Management', items: [
            { id: 'penerimaan-stock', text: 'Pendataan Penerimaan Stock', icon: '📦' }
        ]}
    ]
};

// System configuration
const config = {
    appName: 'Sistem Manajemen Indomaret',
    appVersion: '1.0.0',
    dateFormat: 'yyyy-MM-dd',
    currencyFormat: 'id-ID',
    apiEndpoint: 'https://api.example.com/', // Dummy endpoint
    itemsPerPage: 10,
    autoLogoutTime: 30 // in minutes
};