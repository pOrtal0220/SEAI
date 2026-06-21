document.addEventListener('DOMContentLoaded', () => {
    animateBars();
});

function animateBars() {
    
    setTimeout(() => {
        const mainBar = document.getElementById('mainConfidenceBar');
        if(mainBar) mainBar.style.width = '92%';

        const bar1 = document.getElementById('breakdownBar1');
        const bar2 = document.getElementById('breakdownBar2');

        if(bar1) bar1.style.width = '95%';
        if(bar2) bar2.style.width = '91%';
    }, 300);
}

const navItems = document.querySelectorAll('nav div');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        console.log(`Navigating to: ${this.innerText.trim()}`);
    });
});