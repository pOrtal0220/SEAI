let moistureChart;
let currentRange = '7d';      
let currentZone = 'all_zones'; 

const dataMatrix = {
    '24h_all_zones':   { labels: ['12am', '4am', '8am', '12pm', '4pm', '8pm'], values: [30, 35, 32, 40, 45, 38] },
    '24h_north_field': { labels: ['12am', '4am', '8am', '12pm', '4pm', '8pm'], values: [25, 28, 30, 35, 33, 30] },
    '24h_south_field': { labels: ['12am', '4am', '8am', '12pm', '4pm', '8pm'], values: [40, 42, 45, 50, 55, 52] },

    '7d_all_zones':    { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], values: [45, 42, 38, 32, 89, 85, 40] },
    '7d_north_field':  { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], values: [30, 32, 35, 30, 31, 33, 30] },
    '7d_south_field':  { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], values: [60, 58, 62, 65, 70, 75, 72] },

    '30d_all_zones':   { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], values: [40, 35, 70, 42] },
    '30d_north_field': { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], values: [20, 25, 22, 28] },
    '30d_south_field': { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], values: [80, 75, 85, 90] }
};

document.addEventListener('DOMContentLoaded', () => {
    updateView(); 
    initListeners();
});

function initListeners() {
    const rangeButtons = document.querySelectorAll('#timeRangeContainer button');
    rangeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            rangeButtons.forEach(b => {
                b.classList.remove('filter-btn-active');
                b.classList.add('filter-btn');
            });
            btn.classList.add('filter-btn-active');
            btn.classList.remove('filter-btn');

            currentRange = btn.getAttribute('data-range');
            updateView();
        });
    });

    const zoneDropdown = document.getElementById('zoneSelect');
    zoneDropdown.addEventListener('change', (e) => {
        currentZone = e.target.value;
        updateView();
    });
}

function updateView() {
    const key = `${currentRange}_${currentZone}`;
    const data = dataMatrix[key];

    renderChart(data.labels, data.values);
}

function renderChart(labels, values) {
    const ctx = document.getElementById('analyticsChart').getContext('2d');

    if (moistureChart) {
        moistureChart.destroy(); 
    }

    moistureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                borderColor: '#10b981',
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: (context) => (context.raw > 80 ? '#f87171' : '#10b981'),
                pointRadius: 5,
                pointHoverRadius: 8,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 25, color: '#6b7280' },
                    grid: { color: '#1a332a', drawBorder: false }
                },
                x: {
                    ticks: { color: '#6b7280' },
                    grid: { display: false }
                }
            }
        }
    });
}