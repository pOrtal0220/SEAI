const alertsData = [
    {
        id: 1,
        type: 'critical',
        title: 'Sensor Failure Detected',
        message: 'Zone 3 sensor stuck at 0% — immediate attention required',
        time: '2026-03-25 14:32:15',
        icon: '⚠️'
    },
    {
        id: 2,
        type: 'critical',
        title: 'Pump Malfunction',
        message: 'Zone 2 pump not responding to control commands',
        time: '2026-03-25 13:45:22',
        icon: '🚫'
    },
    {
        id: 3,
        type: 'warning',
        title: 'Data Anomaly',
        message: 'Unusual moisture spike detected in Zone 1',
        time: '2026-03-25 12:18:40',
        icon: '⚠'
    },
    {
        id: 4,
        type: 'warning',
        title: 'Connection Intermittent',
        message: 'Zone 4 sensor experiencing connectivity issues',
        time: '2026-03-25 11:05:13',
        icon: '📶'
    },
    {
        id: 5,
        type: 'info',
        title: 'Scheduled Maintenance Due',
        message: 'Routine calibration for Zone 5 sensors tomorrow',
        time: '2026-03-25 09:00:00',
        icon: '📅'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const alertContainer = document.getElementById('alertList');
    const tabs = document.querySelectorAll('.tab-btn');

    renderAlerts('all');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('tab-btn-active'));
            tab.classList.add('tab-btn-active');

            const filter = tab.getAttribute('data-filter');
            renderAlerts(filter);
        });
    });

    function renderAlerts(filter) {
        alertContainer.innerHTML = ''; 
        
        const filtered = filter === 'all' 
            ? alertsData 
            : alertsData.filter(a => a.type === filter);

        filtered.forEach(alert => {
            const card = document.createElement('div');
            card.className = `alert-card ${alert.type}`;
            
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex gap-4">
                        <div class="text-2xl opacity-80 mt-1">${alert.icon}</div>
                        <div>
                            <h3 class="text-white font-bold text-lg">${alert.title}</h3>
                            <p class="text-gray-400 text-sm mt-1">${alert.message}</p>
                            <p class="text-gray-600 text-xs mt-4 font-mono">${alert.time}</p>
                        </div>
                    </div>
                    <span class="badge badge-${alert.type}">${alert.type}</span>
                </div>
            `;
            alertContainer.appendChild(card);
        });
    }
});