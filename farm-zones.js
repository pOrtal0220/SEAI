const zones = [
    { id: 1, name: 'Zone 1', moisture: 45, status: 'Normal', anomaly: false },
    { id: 2, name: 'Zone 2', moisture: 89, status: 'Anomaly Detected', anomaly: true, lastAlert: '2 hours ago' },
    { id: 3, name: 'Zone 3', moisture: 38, status: 'Normal', anomaly: false },
    { id: 4, name: 'Zone 4', moisture: 52, status: 'Normal', anomaly: false },
    { id: 5, name: 'Zone 5', moisture: 41, status: 'Normal', anomaly: false },
    { id: 6, name: 'Zone 6', moisture: 35, status: 'Normal', anomaly: false }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('zoneGrid');
    
    zones.forEach(zone => {
        const card = document.createElement('div');
        card.className = `zone-card p-6 rounded-xl cursor-pointer ${zone.anomaly ? 'anomaly' : ''}`;
        card.id = `zone-card-${zone.id}`;
        
        const statusColor = zone.anomaly ? 'text-yellow-500' : 'text-emerald-500';
        const barColor = zone.anomaly ? 'bg-yellow-500' : 'bg-emerald-500';

        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <span class="font-bold text-white">${zone.name}</span>
                <span class="${statusColor}">${zone.anomaly ? '⚠' : '✓'}</span>
            </div>
            <div class="flex justify-between items-end mb-2">
                <span class="text-gray-500 text-xs">Moisture</span>
                <span class="text-xl font-bold text-white">${zone.moisture}%</span>
            </div>
            <div class="progress-bg">
                <div class="${barColor} h-full" style="width: ${zone.moisture}%"></div>
            </div>
            <div class="${statusColor} text-[10px] mt-3 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full ${barColor}"></span> ${zone.anomaly ? 'Anomaly' : 'Normal'}
            </div>
        `;

        card.addEventListener('click', () => selectZone(zone));
        grid.appendChild(card);
    });

    selectZone(zones[1]);
});

function selectZone(zone) {
    document.querySelectorAll('.zone-card').forEach(c => c.classList.remove('active'));
    document.getElementById(`zone-card-${zone.id}`).classList.add('active');

    document.getElementById('detailTitle').innerText = `${zone.name} Details`;
    document.getElementById('detailMoisture').innerText = `${zone.moisture}%`;
    document.getElementById('detailStatus').innerText = zone.status;
    document.getElementById('detailAlert').innerText = zone.lastAlert || 'No alerts recorded';

    const statusEl = document.getElementById('detailStatus');
    statusEl.className = `text-lg font-bold ${zone.anomaly ? 'text-yellow-500' : 'text-emerald-500'}`;

    const alertBox = document.getElementById('zoneAlertBox');
    if (zone.anomaly) {
        alertBox.classList.remove('hidden');
    } else {
        alertBox.classList.add('hidden');
    }
}