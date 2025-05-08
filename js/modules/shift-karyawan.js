/**
 * Shift Karyawan Module
 * Handles employee shift management for the Indomaret Management System
 */

// Shift Karyawan module
const ShiftKaryawanModule = (() => {
    // Sample employee data
    const employeeData = [
        { id: 'EMP001', name: 'Budi Santoso', position: 'Kasir', status: 'Tetap', joinDate: '2023-05-15', phoneNumber: '081234567890', address: 'Jl. Kenanga No. 10, Jakarta Pusat' },
        { id: 'EMP002', name: 'Siti Nurbaya', position: 'Kasir', status: 'Tetap', joinDate: '2023-08-20', phoneNumber: '082345678901', address: 'Jl. Melati No. 5, Jakarta Pusat' },
        { id: 'EMP003', name: 'Ahmad Rahman', position: 'Pramuniaga', status: 'Kontrak', joinDate: '2024-01-10', phoneNumber: '083456789012', address: 'Jl. Mawar No. 8, Jakarta Selatan' },
        { id: 'EMP004', name: 'Dewi Safitri', position: 'Pramuniaga', status: 'Kontrak', joinDate: '2024-02-05', phoneNumber: '084567890123', address: 'Jl. Anggrek No. 12, Jakarta Selatan' },
        { id: 'EMP005', name: 'Rio Wibowo', position: 'Kasir', status: 'Paruh Waktu', joinDate: '2024-03-12', phoneNumber: '085678901234', address: 'Jl. Dahlia No. 3, Jakarta Barat' },
        { id: 'EMP006', name: 'Lisa Permata', position: 'Pramuniaga', status: 'Paruh Waktu', joinDate: '2024-03-15', phoneNumber: '086789012345', address: 'Jl. Tulip No. 7, Jakarta Barat' },
        { id: 'EMP007', name: 'Joko Prasetyo', position: 'Cleaning Service', status: 'Kontrak', joinDate: '2023-11-20', phoneNumber: '087890123456', address: 'Jl. Kamboja No. 9, Jakarta Timur' },
        { id: 'EMP008', name: 'Maya Indah', position: 'Asisten Kepala Toko', status: 'Tetap', joinDate: '2022-10-15', phoneNumber: '088901234567', address: 'Jl. Teratai No. 11, Jakarta Pusat' }
    ];
    
    // Sample shift definitions
    const shiftDefinitions = [
        { id: 'SHIFT1', name: 'Pagi', startTime: '07:00', endTime: '15:00', color: '#4CAF50' },
        { id: 'SHIFT2', name: 'Siang', startTime: '15:00', endTime: '23:00', color: '#2196F3' },
        { id: 'SHIFT3', name: 'Malam', startTime: '23:00', endTime: '07:00', color: '#9C27B0' },
        { id: 'OFF', name: 'Libur', startTime: '-', endTime: '-', color: '#E0E0E0' }
    ];
    
    // Sample shift schedule data (for current month)
    const currentYear = 2025;
    const currentMonth = 5; // May
    const daysInMonth = 31;
    
    // Generate sample shifts
    function generateSampleShifts() {
        const shifts = {};
        
        employeeData.forEach(employee => {
            shifts[employee.id] = {};
            
            for (let day = 1; day <= daysInMonth; day++) {
                // Assign random shifts, but ensure at least 8 days off per month
                // and no more than 3 consecutive working days
                
                const dayKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                
                // Check previous days to avoid more than 3 consecutive shifts
                let consecutiveShifts = 0;
                if (day > 1) {
                    for (let prevDay = day - 1; prevDay >= Math.max(1, day - 3); prevDay--) {
                        const prevDayKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${prevDay.toString().padStart(2, '0')}`;
                        if (shifts[employee.id][prevDayKey] && shifts[employee.id][prevDayKey] !== 'OFF') {
                            consecutiveShifts++;
                        } else {
                            break;
                        }
                    }
                }
                
                // Count days off so far
                let daysOff = 0;
                for (let prevDay = 1; prevDay < day; prevDay++) {
                    const prevDayKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${prevDay.toString().padStart(2, '0')}`;
                    if (shifts[employee.id][prevDayKey] === 'OFF') {
                        daysOff++;
                    }
                }
                
                // Calculate remaining days in month
                const remainingDays = daysInMonth - day + 1;
                
                // Calculate minimum required days off for the rest of the month
                const minRemainingDaysOff = Math.max(0, 8 - daysOff);
                
                // Calculate probability of a day off
                let offProbability = minRemainingDaysOff / remainingDays;
                
                // Adjust probability based on consecutive shifts
                if (consecutiveShifts >= 3) {
                    offProbability = 1; // Force a day off after 3 consecutive shifts
                }
                
                // Assign shift based on probability
                if (Math.random() < offProbability || day % 7 === 0) { // Also ensure at least one day off per week
                    shifts[employee.id][dayKey] = 'OFF';
                } else {
                    // Assign a random shift (excluding OFF)
                    const randomShift = ['SHIFT1', 'SHIFT2', 'SHIFT3'][Math.floor(Math.random() * 3)];
                    shifts[employee.id][dayKey] = randomShift;
                }
            }
        });
        
        return shifts;
    }
    
    // Sample shift schedule
    const shiftSchedule = generateSampleShifts();
    
    // Sample leave requests
    const leaveRequests = [
        { id: 'LR001', employeeId: 'EMP001', employeeName: 'Budi Santoso', startDate: '2025-05-20', endDate: '2025-05-22', type: 'Cuti Tahunan', reason: 'Acara keluarga', status: 'Disetujui', approvedBy: 'Joko Widodo', requestDate: '2025-05-10' },
        { id: 'LR002', employeeId: 'EMP003', employeeName: 'Ahmad Rahman', startDate: '2025-05-15', endDate: '2025-05-15', type: 'Izin', reason: 'Urusan pribadi', status: 'Disetujui', approvedBy: 'Joko Widodo', requestDate: '2025-05-08' },
        { id: 'LR003', employeeId: 'EMP005', employeeName: 'Rio Wibowo', startDate: '2025-05-25', endDate: '2025-05-27', type: 'Cuti Tahunan', reason: 'Liburan', status: 'Menunggu', approvedBy: null, requestDate: '2025-05-11' },
        { id: 'LR004', employeeId: 'EMP002', employeeName: 'Siti Nurbaya', startDate: '2025-05-18', endDate: '2025-05-19', type: 'Sakit', reason: 'Sakit demam', status: 'Disetujui', approvedBy: 'Joko Widodo', requestDate: '2025-05-18' }
    ];
    
    // Sample attendance history
    const attendanceHistory = [
        { id: 'ATT001', employeeId: 'EMP001', employeeName: 'Budi Santoso', date: '2025-05-07', shift: 'SHIFT1', scheduledIn: '07:00', scheduledOut: '15:00', actualIn: '06:55', actualOut: '15:05', status: 'Tepat Waktu' },
        { id: 'ATT002', employeeId: 'EMP001', employeeName: 'Budi Santoso', date: '2025-05-06', shift: 'SHIFT2', scheduledIn: '15:00', scheduledOut: '23:00', actualIn: '15:10', actualOut: '23:00', status: 'Terlambat' },
        { id: 'ATT003', employeeId: 'EMP002', employeeName: 'Siti Nurbaya', date: '2025-05-07', shift: 'SHIFT2', scheduledIn: '15:00', scheduledOut: '23:00', actualIn: '14:50', actualOut: '23:05', status: 'Tepat Waktu' },
        { id: 'ATT004', employeeId: 'EMP003', employeeName: 'Ahmad Rahman', date: '2025-05-07', shift: 'SHIFT1', scheduledIn: '07:00', scheduledOut: '15:00', actualIn: '07:20', actualOut: '15:00', status: 'Terlambat' },
        { id: 'ATT005', employeeId: 'EMP004', employeeName: 'Dewi Safitri', date: '2025-05-07', shift: 'SHIFT3', scheduledIn: '23:00', scheduledOut: '07:00', actualIn: '22:50', actualOut: '07:05', status: 'Tepat Waktu' },
        { id: 'ATT006', employeeId: 'EMP005', employeeName: 'Rio Wibowo', date: '2025-05-07', shift: 'SHIFT1', scheduledIn: '07:00', scheduledOut: '15:00', actualIn: '07:05', actualOut: '15:00', status: 'Tepat Waktu' }
    ];
    
    // Load shift karyawan page
    function loadShiftKaryawan() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        const html = `
            <div class="dashboard-header">
                <h2>Pengelolaan Shift Karyawan</h2>
                <p>Kelola jadwal shift dan kehadiran karyawan</p>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Jadwal Shift</h3>
                    <div>
                        <button class="action-btn btn-primary" id="editScheduleBtn">Edit Jadwal</button>
                        <button class="action-btn btn-secondary" id="printScheduleBtn">Cetak Jadwal</button>
                        <button class="action-btn btn-secondary" id="exportScheduleBtn">Export</button>
                    </div>
                </div>
                <div class="panel-body">
                    <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
                        <div class="form-group" style="flex: 1; min-width: 200px;">
                            <label for="scheduleMonth">Bulan</label>
                            <select id="scheduleMonth">
                                <option value="1">Januari</option>
                                <option value="2">Februari</option>
                                <option value="3">Maret</option>
                                <option value="4">April</option>
                                <option value="5" selected>Mei</option>
                                <option value="6">Juni</option>
                                <option value="7">Juli</option>
                                <option value="8">Agustus</option>
                                <option value="9">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">Desember</option>
                            </select>
                        </div>
                        <div class="form-group" style="flex: 1; min-width: 150px;">
                            <label for="scheduleYear">Tahun</label>
                            <select id="scheduleYear">
                                <option value="2025" selected>2025</option>
                                <option value="2026">2026</option>
                            </select>
                        </div>
                        <div class="form-group" style="flex: 2; min-width: 200px;">
                            <label for="employeeFilter">Filter Karyawan</label>
                            <select id="employeeFilter">
                                <option value="">Semua Karyawan</option>
                                ${employeeData.map(emp => `<option value="${emp.id}">${emp.name} (${emp.position})</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group" style="align-self: flex-end;">
                            <button class="action-btn btn-primary" id="viewScheduleBtn">Tampilkan</button>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            ${shiftDefinitions.map(shift => `
                                <div style="display: flex; align-items: center; margin-right: 10px;">
                                    <div style="width: 15px; height: 15px; background-color: ${shift.color}; margin-right: 5px; border-radius: 3px;"></div>
                                    <span>${shift.name} (${shift.startTime} - ${shift.endTime})</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="table-responsive">
                        <table class="schedule-table" style="min-width: 1200px;">
                            <thead>
                                <tr>
                                    <th style="min-width: 200px;">Karyawan</th>
                                    ${Array.from({length: daysInMonth}, (_, i) => i + 1).map(day => `
                                        <th>${day}</th>
                                    `).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${employeeData.map(employee => `
                                    <tr>
                                        <td style="white-space: nowrap;">${employee.name}<br><small>${employee.position}</small></td>
                                        ${Array.from({length: daysInMonth}, (_, i) => i + 1).map(day => {
                                            const dayKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                                            const shiftId = shiftSchedule[employee.id][dayKey];
                                            const shift = shiftDefinitions.find(s => s.id === shiftId);
                                            const isLeaveDay = leaveRequests.some(lr => 
                                                lr.employeeId === employee.id && 
                                                new Date(dayKey) >= new Date(lr.startDate) && 
                                                new Date(dayKey) <= new Date(lr.endDate)
                                            );
                                            
                                            return `
                                                <td class="shift-cell" 
                                                    style="background-color: ${isLeaveDay ? '#FFD580' : shift ? shift.color : '#E0E0E0'};" 
                                                    data-employee-id="${employee.id}" 
                                                    data-date="${dayKey}"
                                                    title="${employee.name}: ${shift ? shift.name : 'Libur'} ${isLeaveDay ? '(Cuti/Izin)' : ''}"
                                                >
                                                    ${isLeaveDay ? 'C' : shift ? shift.name.substring(0, 1) : 'L'}
                                                </td>
                                            `;
                                        }).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Permintaan Cuti/Izin</h3>
                    <button class="action-btn btn-primary" id="newLeaveRequestBtn">Permintaan Baru</button>
                </div>
                <div class="panel-body">
                    <div class="tabs">
                        <div class="tab active">Semua</div>
                        <div class="tab">Menunggu</div>
                        <div class="tab">Disetujui</div>
                        <div class="tab">Ditolak</div>
                    </div>
                    <div class="tab-content active">
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Karyawan</th>
                                        <th>Tanggal Mulai</th>
                                        <th>Tanggal Selesai</th>
                                        <th>Durasi</th>
                                        <th>Jenis</th>
                                        <th>Tanggal Request</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${leaveRequests.map(request => {
                                        const startDate = new Date(request.startDate);
                                        const endDate = new Date(request.endDate);
                                        const durationDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                                        
                                        let statusClass = '';
                                        switch(request.status) {
                                            case 'Disetujui': statusClass = 'success'; break;
                                            case 'Ditolak': statusClass = 'danger'; break;
                                            default: statusClass = 'warning';
                                        }
                                        
                                        return `
                                            <tr>
                                                <td>${request.id}</td>
                                                <td>${request.employeeName}</td>
                                                <td>${request.startDate}</td>
                                                <td>${request.endDate}</td>
                                                <td>${durationDays} hari</td>
                                                <td>${request.type}</td>
                                                <td>${request.requestDate}</td>
                                                <td><span class="status ${statusClass}">${request.status}</span></td>
                                                <td>
                                                    <button class="action-btn btn-primary btn-view-leave" data-id="${request.id}">Detail</button>
                                                    ${request.status === 'Menunggu' ? `
                                                        <button class="action-btn btn-success btn-approve-leave" data-id="${request.id}">Setuju</button>
                                                        <button class="action-btn btn-danger btn-reject-leave" data-id="${request.id}">Tolak</button>
                                                    ` : ''}
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Content for "Menunggu" tab -->
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Karyawan</th>
                                        <th>Tanggal Mulai</th>
                                        <th>Tanggal Selesai</th>
                                        <th>Durasi</th>
                                        <th>Jenis</th>
                                        <th>Tanggal Request</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${leaveRequests.filter(r => r.status === 'Menunggu').map(request => {
                                        const startDate = new Date(request.startDate);
                                        const endDate = new Date(request.endDate);
                                        const durationDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                                        
                                        return `
                                            <tr>
                                                <td>${request.id}</td>
                                                <td>${request.employeeName}</td>
                                                <td>${request.startDate}</td>
                                                <td>${request.endDate}</td>
                                                <td>${durationDays} hari</td>
                                                <td>${request.type}</td>
                                                <td>${request.requestDate}</td>
                                                <td><span class="status warning">Menunggu</span></td>
                                                <td>
                                                    <button class="action-btn btn-primary btn-view-leave" data-id="${request.id}">Detail</button>
                                                    <button class="action-btn btn-success btn-approve-leave" data-id="${request.id}">Setuju</button>
                                                    <button class="action-btn btn-danger btn-reject-leave" data-id="${request.id}">Tolak</button>
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Content for "Disetujui" tab -->
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Karyawan</th>
                                        <th>Tanggal Mulai</th>
                                        <th>Tanggal Selesai</th>
                                        <th>Durasi</th>
                                        <th>Jenis</th>
                                        <th>Tanggal Request</th>
                                        <th>Disetujui Oleh</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${leaveRequests.filter(r => r.status === 'Disetujui').map(request => {
                                        const startDate = new Date(request.startDate);
                                        const endDate = new Date(request.endDate);
                                        const durationDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                                        
                                        return `
                                            <tr>
                                                <td>${request.id}</td>
                                                <td>${request.employeeName}</td>
                                                <td>${request.startDate}</td>
                                                <td>${request.endDate}</td>
                                                <td>${durationDays} hari</td>
                                                <td>${request.type}</td>
                                                <td>${request.requestDate}</td>
                                                <td>${request.approvedBy}</td>
                                                <td>
                                                    <button class="action-btn btn-primary btn-view-leave" data-id="${request.id}">Detail</button>
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-content">
                        <!-- Content for "Ditolak" tab -->
                        <p style="margin: 15px 0;">Belum ada permintaan yang ditolak.</p>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <div class="panel-header">
                    <h3>Laporan Kehadiran</h3>
                    <div>
                        <button class="action-btn btn-primary" id="checkAttendanceBtn">Cek Kehadiran</button>
                        <button class="action-btn btn-secondary" id="exportAttendanceBtn">Export</button>
                    </div>
                </div>
                <div class="panel-body">
                    <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
                        <div class="form-group" style="flex: 1; min-width: 200px;">
                            <label for="attendanceDate">Tanggal</label>
                            <input type="date" id="attendanceDate" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group" style="flex: 1; min-width: 150px;">
                            <label for="attendanceShift">Shift</label>
                            <select id="attendanceShift">
                                <option value="">Semua Shift</option>
                                ${shiftDefinitions.filter(s => s.id !== 'OFF').map(shift => `
                                    <option value="${shift.id}">${shift.name} (${shift.startTime} - ${shift.endTime})</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group" style="flex: 1; min-width: 150px;">
                            <label for="attendanceStatus">Status</label>
                            <select id="attendanceStatus">
                                <option value="">Semua Status</option>
                                <option value="Tepat Waktu">Tepat Waktu</option>
                                <option value="Terlambat">Terlambat</option>
                                <option value="Pulang Awal">Pulang Awal</option>
                                <option value="Absen">Absen</option>
                            </select>
                        </div>
                        <div class="form-group" style="align-self: flex-end;">
                            <button class="action-btn btn-primary" id="viewAttendanceBtn">Tampilkan</button>
                        </div>
                    </div>
                    
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Karyawan</th>
                                    <th>Tanggal</th>
                                    <th>Shift</th>
                                    <th>Jadwal Masuk</th>
                                    <th>Jadwal Keluar</th>
                                    <th>Aktual Masuk</th>
                                    <th>Aktual Keluar</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${attendanceHistory.map(attendance => {
                                    const shift = shiftDefinitions.find(s => s.id === attendance.shift);
                                    
                                    let statusClass = '';
                                    switch(attendance.status) {
                                        case 'Tepat Waktu': statusClass = 'success'; break;
                                        case 'Terlambat': statusClass = 'warning'; break;
                                        case 'Pulang Awal': statusClass = 'warning'; break;
                                        case 'Absen': statusClass = 'danger'; break;
                                    }
                                    
                                    return `
                                        <tr>
                                            <td>${attendance.employeeName}</td>
                                            <td>${attendance.date}</td>
                                            <td>${shift ? shift.name : '-'}</td>
                                            <td>${attendance.scheduledIn}</td>
                                            <td>${attendance.scheduledOut}</td>
                                            <td>${attendance.actualIn}</td>
                                            <td>${attendance.actualOut}</td>
                                            <td><span class="status ${statusClass}">${attendance.status}</span></td>
                                            <td>
                                                <button class="action-btn btn-primary btn-edit-attendance" data-id="${attendance.id}">Edit</button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Shift Edit Modal -->
            <div class="modal" id="shiftEditModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Edit Shift</h3>
                        <button class="close-btn" data-close-modal="shiftEditModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="shiftEditDetails">
                            <!-- Shift edit details will be inserted here -->
                        </div>
                        
                        <div class="form-group">
                            <label for="editShiftSelect">Pilih Shift</label>
                            <select id="editShiftSelect">
                                ${shiftDefinitions.map(shift => `
                                    <option value="${shift.id}">${shift.name} (${shift.startTime} - ${shift.endTime})</option>
                                `).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="editShiftNote">Catatan (Opsional)</label>
                            <textarea id="editShiftNote" rows="2"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="shiftEditModal">Batal</button>
                        <button class="action-btn btn-primary" id="saveShiftBtn">Simpan</button>
                    </div>
                </div>
            </div>
            
            <!-- Leave Request Modal -->
            <div class="modal" id="leaveRequestModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Permintaan Cuti/Izin Baru</h3>
                        <button class="close-btn" data-close-modal="leaveRequestModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="leaveEmployee">Karyawan</label>
                            <select id="leaveEmployee">
                                <option value="">Pilih Karyawan</option>
                                ${employeeData.map(emp => `<option value="${emp.id}">${emp.name} (${emp.position})</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="leaveType">Jenis</label>
                            <select id="leaveType">
                                <option value="Cuti Tahunan">Cuti Tahunan</option>
                                <option value="Sakit">Sakit</option>
                                <option value="Izin">Izin</option>
                                <option value="Cuti Khusus">Cuti Khusus</option>
                            </select>
                        </div>
                        
                        <div style="display: flex; gap: 15px;">
                            <div class="form-group" style="flex: 1;">
                                <label for="leaveStartDate">Tanggal Mulai</label>
                                <input type="date" id="leaveStartDate">
                            </div>
                            
                            <div class="form-group" style="flex: 1;">
                                <label for="leaveEndDate">Tanggal Selesai</label>
                                <input type="date" id="leaveEndDate">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="leaveReason">Alasan</label>
                            <textarea id="leaveReason" rows="3"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="leaveDocument">Dokumen Pendukung (Opsional)</label>
                            <input type="file" id="leaveDocument">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="leaveRequestModal">Batal</button>
                        <button class="action-btn btn-primary" id="saveLeaveBtn">Simpan</button>
                    </div>
                </div>
            </div>
            
            <!-- Leave Detail Modal -->
            <div class="modal" id="leaveDetailModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Detail Permintaan Cuti/Izin</h3>
                        <button class="close-btn" data-close-modal="leaveDetailModal">&times;</button>
                    </div>
                    <div class="modal-body" id="leaveDetailContent">
                        <!-- Leave details will be inserted here -->
                    </div>
                    <div class="modal-footer" id="leaveDetailFooter">
                        <!-- Footer buttons will be inserted here -->
                    </div>
                </div>
            </div>
            
            <!-- Attendance Check Modal -->
            <div class="modal" id="attendanceCheckModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Cek Kehadiran</h3>
                        <button class="close-btn" data-close-modal="attendanceCheckModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="attendanceCheckDate">Tanggal</label>
                            <input type="date" id="attendanceCheckDate" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        
                        <div class="form-group">
                            <label for="attendanceCheckShift">Shift</label>
                            <select id="attendanceCheckShift">
                                ${shiftDefinitions.filter(s => s.id !== 'OFF').map(shift => `
                                    <option value="${shift.id}">${shift.name} (${shift.startTime} - ${shift.endTime})</option>
                                `).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Karyawan yang Dijadwalkan</label>
                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Karyawan</th>
                                            <th>Status</th>
                                            <th>Waktu Masuk</th>
                                            <th>Waktu Keluar</th>
                                            <th>Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody id="scheduledEmployeesBody">
                                        <!-- Scheduled employees will be inserted here -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="attendanceCheckModal">Tutup</button>
                        <button class="action-btn btn-primary" id="saveAttendanceBtn">Simpan</button>
                    </div>
                </div>
            </div>
            
            <!-- Attendance Edit Modal -->
            <div class="modal" id="attendanceEditModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Edit Kehadiran</h3>
                        <button class="close-btn" data-close-modal="attendanceEditModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="attendanceEditDetails">
                            <!-- Attendance details will be inserted here -->
                        </div>
                        
                        <div style="display: flex; gap: 15px;">
                            <div class="form-group" style="flex: 1;">
                                <label for="editActualIn">Waktu Masuk Aktual</label>
                                <input type="time" id="editActualIn">
                            </div>
                            
                            <div class="form-group" style="flex: 1;">
                                <label for="editActualOut">Waktu Keluar Aktual</label>
                                <input type="time" id="editActualOut">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="attendanceStatus">Status</label>
                            <select id="editAttendanceStatus">
                                <option value="Tepat Waktu">Tepat Waktu</option>
                                <option value="Terlambat">Terlambat</option>
                                <option value="Pulang Awal">Pulang Awal</option>
                                <option value="Absen">Absen</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="attendanceNote">Catatan</label>
                            <textarea id="attendanceNote" rows="2"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="attendanceEditModal">Batal</button>
                        <button class="action-btn btn-primary" id="updateAttendanceBtn">Simpan</button>
                    </div>
                </div>
            </div>
            
            <!-- Schedule Edit Modal -->
            <div class="modal" id="scheduleEditModal">
                <div class="modal-content" style="width: 80%; max-width: 900px;">
                    <div class="modal-header">
                        <h3>Edit Jadwal Shift</h3>
                        <button class="close-btn" data-close-modal="scheduleEditModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
                            <div class="form-group" style="flex: 1; min-width: 200px;">
                                <label for="editScheduleMonth">Bulan</label>
                                <select id="editScheduleMonth">
                                    <option value="1">Januari</option>
                                    <option value="2">Februari</option>
                                    <option value="3">Maret</option>
                                    <option value="4">April</option>
                                    <option value="5" selected>Mei</option>
                                    <option value="6">Juni</option>
                                    <option value="7">Juli</option>
                                    <option value="8">Agustus</option>
                                    <option value="9">September</option>
                                    <option value="10">Oktober</option>
                                    <option value="11">November</option>
                                    <option value="12">Desember</option>
                                </select>
                            </div>
                            <div class="form-group" style="flex: 1; min-width: 150px;">
                                <label for="editScheduleYear">Tahun</label>
                                <select id="editScheduleYear">
                                    <option value="2025" selected>2025</option>
                                    <option value="2026">2026</option>
                                </select>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                                ${shiftDefinitions.map(shift => `
                                    <div style="display: flex; align-items: center; margin-right: 10px;">
                                        <div style="width: 15px; height: 15px; background-color: ${shift.color}; margin-right: 5px; border-radius: 3px;"></div>
                                        <span>${shift.name} (${shift.startTime} - ${shift.endTime})</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Edit Jadwal (klik pada sel untuk mengubah shift)</label>
                            <div class="table-responsive">
                                <table class="schedule-edit-table" style="min-width: 1200px;">
                                    <thead>
                                        <tr>
                                            <th style="min-width: 200px;">Karyawan</th>
                                            ${Array.from({length: daysInMonth}, (_, i) => i + 1).map(day => `
                                                <th>${day}</th>
                                            `).join('')}
                                        </tr>
                                    </thead>
                                    <tbody id="editScheduleBody">
                                        ${employeeData.map(employee => `
                                            <tr>
                                                <td style="white-space: nowrap;">${employee.name}<br><small>${employee.position}</small></td>
                                                ${Array.from({length: daysInMonth}, (_, i) => i + 1).map(day => {
                                                    const dayKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                                                    const shiftId = shiftSchedule[employee.id][dayKey];
                                                    const shift = shiftDefinitions.find(s => s.id === shiftId);
                                                    const isLeaveDay = leaveRequests.some(lr => 
                                                        lr.employeeId === employee.id && 
                                                        new Date(dayKey) >= new Date(lr.startDate) && 
                                                        new Date(dayKey) <= new Date(lr.endDate) &&
                                                        lr.status === 'Disetujui'
                                                    );
                                                    
                                                    return `
                                                        <td class="shift-cell editable-shift" 
                                                            style="background-color: ${isLeaveDay ? '#FFD580' : shift ? shift.color : '#E0E0E0'}; cursor: pointer;" 
                                                            data-employee-id="${employee.id}" 
                                                            data-date="${dayKey}"
                                                            data-shift="${shiftId}"
                                                            title="${employee.name}: ${shift ? shift.name : 'Libur'} ${isLeaveDay ? '(Cuti/Izin)' : ''}"
                                                            ${isLeaveDay ? 'data-leave="true"' : ''}
                                                        >
                                                            ${isLeaveDay ? 'C' : shift ? shift.name.substring(0, 1) : 'L'}
                                                        </td>
                                                    `;
                                                }).join('')}
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn btn-secondary" data-close-modal="scheduleEditModal">Batal</button>
                        <button class="action-btn btn-primary" id="saveScheduleChangesBtn">Simpan Perubahan</button>
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
        // Edit schedule button
        const editScheduleBtn = document.getElementById('editScheduleBtn');
        if (editScheduleBtn) {
            editScheduleBtn.addEventListener('click', function() {
                openScheduleEditModal();
            });
        }
        
        // Print schedule button
        const printScheduleBtn = document.getElementById('printScheduleBtn');
        if (printScheduleBtn) {
            printScheduleBtn.addEventListener('click', function() {
                alert('Jadwal akan dicetak');
            });
        }
        
        // Export schedule button
        const exportScheduleBtn = document.getElementById('exportScheduleBtn');
        if (exportScheduleBtn) {
            exportScheduleBtn.addEventListener('click', function() {
                alert('Jadwal akan diekspor ke file Excel');
            });
        }
        
        // View schedule button
        const viewScheduleBtn = document.getElementById('viewScheduleBtn');
        if (viewScheduleBtn) {
            viewScheduleBtn.addEventListener('click', function() {
                // In a real app, this would filter the schedule based on selections
                alert('Jadwal diperbarui sesuai filter');
            });
        }
        
        // New leave request button
        const newLeaveRequestBtn = document.getElementById('newLeaveRequestBtn');
        if (newLeaveRequestBtn) {
            newLeaveRequestBtn.addEventListener('click', function() {
                openLeaveRequestModal();
            });
        }
        
        // View leave request buttons
        document.querySelectorAll('.btn-view-leave').forEach(button => {
            button.addEventListener('click', function() {
                const requestId = this.getAttribute('data-id');
                openLeaveDetailModal(requestId);
            });
        });
        
        // Approve leave request buttons
        document.querySelectorAll('.btn-approve-leave').forEach(button => {
            button.addEventListener('click', function() {
                const requestId = this.getAttribute('data-id');
                approveLeaveRequest(requestId);
            });
        });
        
        // Reject leave request buttons
        document.querySelectorAll('.btn-reject-leave').forEach(button => {
            button.addEventListener('click', function() {
                const requestId = this.getAttribute('data-id');
                rejectLeaveRequest(requestId);
            });
        });
        
        // Check attendance button
        const checkAttendanceBtn = document.getElementById('checkAttendanceBtn');
        if (checkAttendanceBtn) {
            checkAttendanceBtn.addEventListener('click', function() {
                openAttendanceCheckModal();
            });
        }
        
        // Export attendance button
        const exportAttendanceBtn = document.getElementById('exportAttendanceBtn');
        if (exportAttendanceBtn) {
            exportAttendanceBtn.addEventListener('click', function() {
                alert('Data kehadiran akan diekspor ke file Excel');
            });
        }
        
        // View attendance button
        const viewAttendanceBtn = document.getElementById('viewAttendanceBtn');
        if (viewAttendanceBtn) {
            viewAttendanceBtn.addEventListener('click', function() {
                // In a real app, this would filter the attendance based on selections
                alert('Data kehadiran diperbarui sesuai filter');
            });
        }
        
        // Edit attendance buttons
        document.querySelectorAll('.btn-edit-attendance').forEach(button => {
            button.addEventListener('click', function() {
                const attendanceId = this.getAttribute('data-id');
                openAttendanceEditModal(attendanceId);
            });
        });
        
        // Save leave request button
        const saveLeaveBtn = document.getElementById('saveLeaveBtn');
        if (saveLeaveBtn) {
            saveLeaveBtn.addEventListener('click', function() {
                saveLeaveRequest();
            });
        }
        
        // Update attendance button
        const updateAttendanceBtn = document.getElementById('updateAttendanceBtn');
        if (updateAttendanceBtn) {
            updateAttendanceBtn.addEventListener('click', function() {
                updateAttendance();
            });
        }
        
        // Save attendance button
        const saveAttendanceBtn = document.getElementById('saveAttendanceBtn');
        if (saveAttendanceBtn) {
            saveAttendanceBtn.addEventListener('click', function() {
                saveAttendanceCheck();
            });
        }
        
        // Save schedule changes button
        const saveScheduleChangesBtn = document.getElementById('saveScheduleChangesBtn');
        if (saveScheduleChangesBtn) {
            saveScheduleChangesBtn.addEventListener('click', function() {
                saveScheduleChanges();
            });
        }
        
        // Editable shift cells in schedule edit modal
        document.querySelectorAll('.editable-shift').forEach(cell => {
            cell.addEventListener('click', function() {
                // Skip if this is a leave day
                if (this.getAttribute('data-leave') === 'true') {
                    alert('Karyawan sedang cuti pada tanggal ini. Tidak dapat mengubah shift.');
                    return;
                }
                
                const employeeId = this.getAttribute('data-employee-id');
                const date = this.getAttribute('data-date');
                const currentShift = this.getAttribute('data-shift');
                
                openShiftEditModal(employeeId, date, currentShift);
            });
        });
    }
    
    // Open schedule edit modal
    function openScheduleEditModal() {
        const modal = document.getElementById('scheduleEditModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Open shift edit modal
    function openShiftEditModal(employeeId, date, currentShift) {
        const employee = employeeData.find(emp => emp.id === employeeId);
        if (!employee) return;
        
        const formattedDate = new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const currentShiftObj = shiftDefinitions.find(s => s.id === currentShift);
        
        // Update shift edit details
        const shiftEditDetails = document.getElementById('shiftEditDetails');
        if (shiftEditDetails) {
            shiftEditDetails.innerHTML = `
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <div style="margin-bottom: 10px;"><strong>Karyawan:</strong> ${employee.name} (${employee.position})</div>
                    <div style="margin-bottom: 10px;"><strong>Tanggal:</strong> ${formattedDate}</div>
                    <div><strong>Shift Saat Ini:</strong> ${currentShiftObj ? currentShiftObj.name : 'Libur'}</div>
                </div>
            `;
        }
        
        // Set current shift in dropdown
        const editShiftSelect = document.getElementById('editShiftSelect');
        if (editShiftSelect) {
            editShiftSelect.value = currentShift;
        }
        
        // Reset note
        const editShiftNote = document.getElementById('editShiftNote');
        if (editShiftNote) {
            editShiftNote.value = '';
        }
        
        // Store employee ID and date in the modal
        const modal = document.getElementById('shiftEditModal');
        if (modal) {
            modal.setAttribute('data-employee-id', employeeId);
            modal.setAttribute('data-date', date);
            modal.style.display = 'flex';
        }
    }
    
    // Save shift changes
    function saveShiftChanges() {
        const modal = document.getElementById('scheduleEditModal');
        if (modal) {
            // In a real app, this would save all schedule changes to the server
            
            // Close modal
            modal.style.display = 'none';
            
            // Show confirmation
            alert('Perubahan jadwal shift berhasil disimpan');
            
            // Reload to reflect changes
            loadShiftKaryawan();
        }
    }
    
    // Open leave request modal
    function openLeaveRequestModal() {
        // Reset form
        document.getElementById('leaveEmployee').value = '';
        document.getElementById('leaveType').value = 'Cuti Tahunan';
        
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        
        document.getElementById('leaveStartDate').value = formattedDate;
        document.getElementById('leaveEndDate').value = formattedDate;
        document.getElementById('leaveReason').value = '';
        document.getElementById('leaveDocument').value = '';
        
        // Show modal
        const modal = document.getElementById('leaveRequestModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Save leave request
    function saveLeaveRequest() {
        const employeeId = document.getElementById('leaveEmployee').value;
        const leaveType = document.getElementById('leaveType').value;
        const startDate = document.getElementById('leaveStartDate').value;
        const endDate = document.getElementById('leaveEndDate').value;
        const reason = document.getElementById('leaveReason').value;
        
        // Validate input
        if (!employeeId) {
            alert('Harap pilih karyawan');
            return;
        }
        
        if (!startDate || !endDate) {
            alert('Harap isi tanggal mulai dan selesai');
            return;
        }
        
        if (!reason.trim()) {
            alert('Harap isi alasan cuti/izin');
            return;
        }
        
        if (new Date(startDate) > new Date(endDate)) {
            alert('Tanggal mulai harus lebih awal atau sama dengan tanggal selesai');
            return;
        }
        
        // Get employee name
        const employee = employeeData.find(emp => emp.id === employeeId);
        if (!employee) return;
        
        // Create new leave request
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        
        const newRequest = {
            id: 'LR' + (leaveRequests.length + 1).toString().padStart(3, '0'),
            employeeId: employeeId,
            employeeName: employee.name,
            startDate: startDate,
            endDate: endDate,
            type: leaveType,
            reason: reason,
            status: 'Menunggu',
            approvedBy: null,
            requestDate: todayStr
        };
        
        // Add to leave requests
        leaveRequests.push(newRequest);
        
        // Close modal
        document.getElementById('leaveRequestModal').style.display = 'none';
        
        // Show confirmation
        alert('Permintaan cuti/izin berhasil disimpan');
        
        // Reload to reflect changes
        loadShiftKaryawan();
    }
    
    // Open leave detail modal
    function openLeaveDetailModal(requestId) {
        const request = leaveRequests.find(r => r.id === requestId);
        if (!request) return;
        
        const startDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        const durationDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        
        // Update leave detail content
        const leaveDetailContent = document.getElementById('leaveDetailContent');
        if (leaveDetailContent) {
            leaveDetailContent.innerHTML = `
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div><strong>ID Request:</strong> ${request.id}</div>
                        <div><strong>Tanggal Request:</strong> ${request.requestDate}</div>
                    </div>
                    <div style="margin-bottom: 10px;"><strong>Karyawan:</strong> ${request.employeeName}</div>
                    <div style="margin-bottom: 10px;"><strong>Jenis:</strong> ${request.type}</div>
                    <div style="margin-bottom: 10px;"><strong>Periode:</strong> ${request.startDate} s/d ${request.endDate} (${durationDays} hari)</div>
                    <div style="margin-bottom: 10px;"><strong>Alasan:</strong> ${request.reason}</div>
                    <div><strong>Status:</strong> <span class="status ${request.status === 'Disetujui' ? 'success' : request.status === 'Ditolak' ? 'danger' : 'warning'}">${request.status}</span></div>
                    ${request.approvedBy ? `<div style="margin-top: 10px;"><strong>Disetujui Oleh:</strong> ${request.approvedBy}</div>` : ''}
                </div>
            `;
        }
        
        // Update footer buttons based on status
        const leaveDetailFooter = document.getElementById('leaveDetailFooter');
        if (leaveDetailFooter) {
            if (request.status === 'Menunggu') {
                leaveDetailFooter.innerHTML = `
                    <button class="action-btn btn-secondary" data-close-modal="leaveDetailModal">Tutup</button>
                    <button class="action-btn btn-danger" id="rejectLeaveBtn" data-id="${request.id}">Tolak</button>
                    <button class="action-btn btn-success" id="approveLeaveBtn" data-id="${request.id}">Setuju</button>
                `;
                
                // Add event listeners to new buttons
                document.getElementById('approveLeaveBtn').addEventListener('click', function() {
                    approveLeaveRequest(this.getAttribute('data-id'));
                });
                
                document.getElementById('rejectLeaveBtn').addEventListener('click', function() {
                    rejectLeaveRequest(this.getAttribute('data-id'));
                });
            } else {
                leaveDetailFooter.innerHTML = `
                    <button class="action-btn btn-secondary" data-close-modal="leaveDetailModal">Tutup</button>
                    <button class="action-btn btn-primary" id="printLeaveBtn">Cetak</button>
                `;
                
                // Add event listener to print button
                document.getElementById('printLeaveBtn').addEventListener('click', function() {
                    alert('Detail permintaan cuti/izin akan dicetak');
                });
            }
        }
        
        // Show modal
        const modal = document.getElementById('leaveDetailModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Approve leave request
    function approveLeaveRequest(requestId) {
        const request = leaveRequests.find(r => r.id === requestId);
        if (!request) return;
        
        // Update request status
        request.status = 'Disetujui';
        request.approvedBy = 'Joko Widodo'; // Current user name would be dynamically retrieved in a real app
        
        // Close modal if open
        document.getElementById('leaveDetailModal').style.display = 'none';
        
        // Show confirmation
        alert('Permintaan cuti/izin telah disetujui');
        
        // Reload to reflect changes
        loadShiftKaryawan();
    }
    
    // Reject leave request
    function rejectLeaveRequest(requestId) {
        const request = leaveRequests.find(r => r.id === requestId);
        if (!request) return;
        
        // Update request status
        request.status = 'Ditolak';
        request.approvedBy = 'Joko Widodo'; // Current user name would be dynamically retrieved in a real app
        
        // Close modal if open
        document.getElementById('leaveDetailModal').style.display = 'none';
        
        // Show confirmation
        alert('Permintaan cuti/izin telah ditolak');
        
        // Reload to reflect changes
        loadShiftKaryawan();
    }
    
    // Open attendance check modal
    function openAttendanceCheckModal() {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        
        // Set default date to today
        document.getElementById('attendanceCheckDate').value = formattedDate;
        
        // Set default shift to SHIFT1 (morning)
        document.getElementById('attendanceCheckShift').value = 'SHIFT1';
        
        // Get employees scheduled for the selected shift
        updateScheduledEmployees();
        
        // Show modal
        const modal = document.getElementById('attendanceCheckModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Update scheduled employees list in attendance check modal
    function updateScheduledEmployees() {
        const date = document.getElementById('attendanceCheckDate').value;
        const shift = document.getElementById('attendanceCheckShift').value;
        
        // Find employees scheduled for this shift on this date
        const scheduledEmployees = [];
        
        employeeData.forEach(employee => {
            const dayKey = date;
            if (shiftSchedule[employee.id] && shiftSchedule[employee.id][dayKey] === shift) {
                scheduledEmployees.push(employee);
            }
        });
        
        // Update scheduled employees table
        const scheduledEmployeesBody = document.getElementById('scheduledEmployeesBody');
        if (scheduledEmployeesBody) {
            if (scheduledEmployees.length > 0) {
                scheduledEmployeesBody.innerHTML = scheduledEmployees.map(emp => `
                    <tr>
                        <td>${emp.name}</td>
                        <td>
                            <select class="attendance-status" data-employee-id="${emp.id}">
                                <option value="Tepat Waktu">Tepat Waktu</option>
                                <option value="Terlambat">Terlambat</option>
                                <option value="Absen">Absen</option>
                            </select>
                        </td>
                        <td>
                            <input type="time" class="attendance-in" data-employee-id="${emp.id}" value="${shiftDefinitions.find(s => s.id === shift).startTime}">
                        </td>
                        <td>
                            <input type="time" class="attendance-out" data-employee-id="${emp.id}" value="${shiftDefinitions.find(s => s.id === shift).endTime}">
                        </td>
                        <td>
                            <input type="text" class="attendance-note" data-employee-id="${emp.id}" placeholder="Catatan (opsional)">
                        </td>
                    </tr>
                `).join('');
            } else {
                scheduledEmployeesBody.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center;">Tidak ada karyawan yang dijadwalkan untuk shift ini pada tanggal ini</td>
                    </tr>
                `;
            }
        }
        
        // Add event listeners for status change
        document.querySelectorAll('.attendance-status').forEach(select => {
            select.addEventListener('change', function() {
                const employeeId = this.getAttribute('data-employee-id');
                const row = this.closest('tr');
                
                if (this.value === 'Absen') {
                    // Disable time inputs for absent employees
                    row.querySelector('.attendance-in').disabled = true;
                    row.querySelector('.attendance-out').disabled = true;
                } else {
                    // Enable time inputs for present employees
                    row.querySelector('.attendance-in').disabled = false;
                    row.querySelector('.attendance-out').disabled = false;
                }
            });
        });
    }
    
    // Save attendance check
    function saveAttendanceCheck() {
        const date = document.getElementById('attendanceCheckDate').value;
        const shiftId = document.getElementById('attendanceCheckShift').value;
        const shift = shiftDefinitions.find(s => s.id === shiftId);
        
        // Get attendance data for all employees
        const statusSelects = document.querySelectorAll('.attendance-status');
        const hasData = statusSelects.length > 0;
        
        if (!hasData) {
            alert('Tidak ada data kehadiran untuk disimpan');
            return;
        }
        
        statusSelects.forEach(select => {
            const employeeId = select.getAttribute('data-employee-id');
            const employee = employeeData.find(emp => emp.id === employeeId);
            if (!employee) return;
            
            const row = select.closest('tr');
            const status = select.value;
            const actualIn = row.querySelector('.attendance-in').value;
            const actualOut = row.querySelector('.attendance-out').value;
            
            // Create new attendance record
            const newAttendance = {
                id: 'ATT' + (attendanceHistory.length + 1).toString().padStart(3, '0'),
                employeeId: employeeId,
                employeeName: employee.name,
                date: date,
                shift: shiftId,
                scheduledIn: shift.startTime,
                scheduledOut: shift.endTime,
                actualIn: status === 'Absen' ? '-' : actualIn,
                actualOut: status === 'Absen' ? '-' : actualOut,
                status: status
            };
            
            // Add to attendance history
            attendanceHistory.push(newAttendance);
        });
        
        // Close modal
        document.getElementById('attendanceCheckModal').style.display = 'none';
        
        // Show confirmation
        alert('Data kehadiran berhasil disimpan');
        
        // Reload to reflect changes
        loadShiftKaryawan();
    }
    
    // Open attendance edit modal
    function openAttendanceEditModal(attendanceId) {
        const attendance = attendanceHistory.find(a => a.id === attendanceId);
        if (!attendance) return;
        
        const shift = shiftDefinitions.find(s => s.id === attendance.shift);
        
        // Update attendance edit details
        const attendanceEditDetails = document.getElementById('attendanceEditDetails');
        if (attendanceEditDetails) {
            attendanceEditDetails.innerHTML = `
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <div style="margin-bottom: 10px;"><strong>Karyawan:</strong> ${attendance.employeeName}</div>
                    <div style="margin-bottom: 10px;"><strong>Tanggal:</strong> ${attendance.date}</div>
                    <div style="margin-bottom: 10px;"><strong>Shift:</strong> ${shift ? shift.name : '-'} (${attendance.scheduledIn} - ${attendance.scheduledOut})</div>
                    <div><strong>Status Saat Ini:</strong> ${attendance.status}</div>
                </div>
            `;
        }
        
        // Set current values
        document.getElementById('editActualIn').value = attendance.actualIn;
        document.getElementById('editActualOut').value = attendance.actualOut;
        document.getElementById('editAttendanceStatus').value = attendance.status;
        document.getElementById('attendanceNote').value = '';
        
        // Disable time inputs if status is Absen
        const isAbsent = attendance.status === 'Absen';
        document.getElementById('editActualIn').disabled = isAbsent;
        document.getElementById('editActualOut').disabled = isAbsent;
        
        // Add event listener to status change
        document.getElementById('editAttendanceStatus').addEventListener('change', function() {
            const isAbsent = this.value === 'Absen';
            document.getElementById('editActualIn').disabled = isAbsent;
            document.getElementById('editActualOut').disabled = isAbsent;
        });
        
        // Store attendance ID in the modal
        const modal = document.getElementById('attendanceEditModal');
        if (modal) {
            modal.setAttribute('data-attendance-id', attendanceId);
            modal.style.display = 'flex';
        }
    }
    
    // Update attendance
    function updateAttendance() {
        const modal = document.getElementById('attendanceEditModal');
        if (!modal) return;
        
        const attendanceId = modal.getAttribute('data-attendance-id');
        const attendance = attendanceHistory.find(a => a.id === attendanceId);
        if (!attendance) return;
        
        const status = document.getElementById('editAttendanceStatus').value;
        const actualIn = document.getElementById('editActualIn').value;
        const actualOut = document.getElementById('editActualOut').value;
        
        // Update attendance record
        attendance.status = status;
        attendance.actualIn = status === 'Absen' ? '-' : actualIn;
        attendance.actualOut = status === 'Absen' ? '-' : actualOut;
        
        // Close modal
        modal.style.display = 'none';
        
        // Show confirmation
        alert('Data kehadiran berhasil diperbarui');
        
        // Reload to reflect changes
        loadShiftKaryawan();
    }
    
    // Public methods
    return {
        loadShiftKaryawan
    };
})();