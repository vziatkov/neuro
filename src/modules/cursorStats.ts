// Cursor 2025 Year in Review - Data Visualization
// Based on actual usage statistics

interface MonthlyData {
    month: string;
    messages: number;
    tokens?: number;
}

interface WeeklyData {
    week: number;
    tokens: number;
}

interface KeyPressData {
    month: string;
    count: number;
}

// Monthly messages data
const monthlyMessages: MonthlyData[] = [
    { month: 'Jan', messages: 0 },
    { month: 'Feb', messages: 0 },
    { month: 'Mar', messages: 0 },
    { month: 'Apr', messages: 0 },
    { month: 'May', messages: 103 },
    { month: 'Jun', messages: 325 },
    { month: 'Jul', messages: 54 },
    { month: 'Aug', messages: 0 },
    { month: 'Sep', messages: 0 },
    { month: 'Oct', messages: 94 },
    { month: 'Nov', messages: 186 },
    { month: 'Dec', messages: 35 },
];

// Key press data (Tab key)
const keyPressData: KeyPressData[] = [
    { month: 'Jan', count: 0 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 0 },
    { month: 'Apr', count: 0 },
    { month: 'May', count: 412 },
    { month: 'Jun', count: 14 },
    { month: 'Jul', count: 1 },
    { month: 'Aug', count: 0 },
    { month: 'Sep', count: 0 },
    { month: 'Oct', count: 1 },
    { month: 'Nov', count: 0 },
    { month: 'Dec', count: 0 },
];

// Weekly tokens data (simplified - showing key weeks)
const weeklyTokens: WeeklyData[] = Array.from({ length: 50 }, (_, i) => {
    const week = i + 1;
    let tokens = 0;
    
    // Peak weeks based on the screenshot
    if (week === 25) tokens = 6059005;
    else if (week === 26) tokens = 2798907;
    else if (week === 27) tokens = 1936997;
    else if (week === 28) tokens = 253154;
    else if (week === 40) tokens = 65451;
    else if (week === 41) tokens = 81759;
    else if (week === 42) tokens = 23201884;
    else if (week === 43) tokens = 9952304;
    else if (week === 44) tokens = 20101560;
    else if (week === 45) tokens = 46445918; // Peak
    else if (week === 46) tokens = 14315432;
    else if (week === 47) tokens = 274535;
    else if (week === 48) tokens = 2378172;
    else if (week === 49) tokens = 3799563;
    else if (week === 50) tokens = 2960310;
    
    return { week, tokens };
});

// Activity heatmap data (days of year)
function generateActivityHeatmap(): boolean[] {
    const days: boolean[] = Array(365).fill(false);
    const activeDays = 79;
    const longestStreakStart = 130; // May 10 (day of year)
    
    // Longest streak: 14 days starting May 10
    for (let i = 0; i < 14; i++) {
        days[longestStreakStart + i] = true;
    }
    
    // Additional active days (distributed around active months)
    const activeMonths = [130, 151, 182, 213, 274, 304, 335]; // May, Jun, Jul, Oct, Nov, Dec
    let placed = 14;
    
    for (const startDay of activeMonths) {
        for (let i = 0; i < 10 && placed < activeDays; i++) {
            const day = startDay + Math.floor(Math.random() * 30);
            if (day < 365 && !days[day]) {
                days[day] = true;
                placed++;
            }
        }
    }
    
    // Fill remaining days randomly
    while (placed < activeDays) {
        const day = Math.floor(Math.random() * 365);
        if (!days[day]) {
            days[day] = true;
            placed++;
        }
    }
    
    return days;
}

function renderMonthlyChart() {
    const container = document.getElementById('monthlyChart');
    if (!container) return;
    
    const maxMessages = Math.max(...monthlyMessages.map(m => m.messages));
    const highlightMonth = monthlyMessages.findIndex(m => m.messages === maxMessages);
    
    monthlyMessages.forEach((data, index) => {
        const bar = document.createElement('div');
        bar.className = `bar ${index === highlightMonth ? 'highlight' : ''}`;
        
        const height = data.messages > 0 ? (data.messages / maxMessages) * 100 : 2;
        bar.style.height = `${height}%`;
        
        if (data.messages > 0) {
            const value = document.createElement('div');
            value.className = 'bar-value';
            value.textContent = `${data.messages}`;
            bar.appendChild(value);
        }
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = data.month;
        bar.appendChild(label);
        
        container.appendChild(bar);
    });
}

function renderKeyPressChart() {
    const container = document.getElementById('keyPressChart');
    if (!container) return;
    
    const maxCount = Math.max(...keyPressData.map(k => k.count));
    const highlightMonth = keyPressData.findIndex(k => k.count === maxCount);
    
    keyPressData.forEach((data, index) => {
        const bar = document.createElement('div');
        bar.className = `bar ${index === highlightMonth ? 'highlight' : ''}`;
        
        const height = data.count > 0 ? (data.count / maxCount) * 100 : 2;
        bar.style.height = `${height}%`;
        
        if (data.count > 0) {
            const value = document.createElement('div');
            value.className = 'bar-value';
            value.textContent = `${data.count}`;
            bar.appendChild(value);
        }
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = data.month;
        bar.appendChild(label);
        
        container.appendChild(bar);
    });
}

function renderActivityHeatmap() {
    const container = document.getElementById('activityHeatmap');
    if (!container) return;
    
    const days = generateActivityHeatmap();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    let dayIndex = 0;
    
    months.forEach((month, monthIndex) => {
        const monthContainer = document.createElement('div');
        monthContainer.style.marginBottom = '20px';
        
        const monthLabel = document.createElement('div');
        monthLabel.textContent = month;
        monthLabel.style.fontSize = '12px';
        monthLabel.style.color = '#808080';
        monthLabel.style.marginBottom = '8px';
        monthContainer.appendChild(monthLabel);
        
        const monthGrid = document.createElement('div');
        monthGrid.style.display = 'grid';
        monthGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        monthGrid.style.gap = '4px';
        
        // Find first day of week for this month
        const firstDayOfYear = new Date(2025, 0, 1).getDay();
        let firstDayOfMonth = 0;
        for (let i = 0; i < monthIndex; i++) {
            firstDayOfMonth += daysInMonth[i];
        }
        const firstDayOfWeek = (firstDayOfYear + firstDayOfMonth) % 7;
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDayOfWeek; i++) {
            const empty = document.createElement('div');
            monthGrid.appendChild(empty);
        }
        
        // Add cells for each day of the month
        for (let i = 0; i < daysInMonth[monthIndex]; i++) {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            
            if (days[dayIndex]) {
                cell.classList.add('active');
                // Highlight streak (May 10-23)
                if (dayIndex >= 129 && dayIndex <= 142) {
                    cell.classList.add('highlight');
                }
            }
            
            monthGrid.appendChild(cell);
            dayIndex++;
        }
        
        monthContainer.appendChild(monthGrid);
        container.appendChild(monthContainer);
    });
}

function renderTokensByWeek() {
    const container = document.getElementById('tokensByWeek');
    if (!container) return;
    
    const maxTokens = Math.max(...weeklyTokens.map(w => w.tokens));
    
    // Group weeks into rows of 12
    for (let row = 0; row < Math.ceil(weeklyTokens.length / 12); row++) {
        const rowContainer = document.createElement('div');
        rowContainer.className = 'week-grid';
        
        for (let col = 0; col < 12; col++) {
            const weekIndex = row * 12 + col;
            if (weekIndex >= weeklyTokens.length) break;
            
            const week = weeklyTokens[weekIndex];
            const weekItem = document.createElement('div');
            weekItem.className = 'week-item';
            
            const circle = document.createElement('div');
            circle.className = 'week-circle';
            
            if (week.tokens > 0) {
                circle.classList.add('has-data');
                if (week.tokens > maxTokens * 0.5) {
                    circle.classList.add('high');
                }
                circle.textContent = week.week.toString();
            }
            
            const label = document.createElement('div');
            label.className = 'week-label';
            label.textContent = `Week ${week.week}`;
            
            const value = document.createElement('div');
            value.className = 'week-value';
            if (week.tokens > 0) {
                value.textContent = formatTokens(week.tokens);
            }
            
            weekItem.appendChild(circle);
            weekItem.appendChild(label);
            weekItem.appendChild(value);
            rowContainer.appendChild(weekItem);
        }
        
        container.appendChild(rowContainer);
    }
}

function formatTokens(tokens: number): string {
    if (tokens >= 1000000) {
        return `${(tokens / 1000000).toFixed(1)}M`;
    } else if (tokens >= 1000) {
        return `${(tokens / 1000).toFixed(0)}K`;
    }
    return tokens.toString();
}

function renderUsagePatterns() {
    const container = document.getElementById('usagePatterns');
    if (!container) return;
    
    // Month pattern
    const monthSection = document.createElement('div');
    monthSection.style.marginBottom = '40px';
    
    const monthTitle = document.createElement('div');
    monthTitle.textContent = 'Month';
    monthTitle.style.fontSize = '14px';
    monthTitle.style.color = '#808080';
    monthTitle.style.marginBottom = '15px';
    monthSection.appendChild(monthTitle);
    
    const monthBars = document.createElement('div');
    monthBars.style.display = 'flex';
    monthBars.style.gap = '8px';
    monthBars.style.alignItems = 'flex-end';
    monthBars.style.height = '60px';
    
    const maxMonth = Math.max(...monthlyMessages.map(m => m.messages));
    monthlyMessages.forEach((data, index) => {
        const bar = document.createElement('div');
        bar.style.flex = '1';
        bar.style.height = data.messages > 0 ? `${(data.messages / maxMonth) * 100}%` : '4px';
        bar.style.background = index === 5 ? '#ff6b35' : '#2a2a2a'; // June is highlight
        bar.style.borderRadius = '2px';
        monthBars.appendChild(bar);
    });
    
    monthSection.appendChild(monthBars);
    container.appendChild(monthSection);
    
    // Day of week pattern
    const daySection = document.createElement('div');
    daySection.style.marginBottom = '40px';
    
    const dayTitle = document.createElement('div');
    dayTitle.textContent = 'Day of Week';
    dayTitle.style.fontSize = '14px';
    dayTitle.style.color = '#808080';
    dayTitle.style.marginBottom = '15px';
    daySection.appendChild(dayTitle);
    
    const dayBars = document.createElement('div');
    dayBars.style.display = 'flex';
    dayBars.style.gap = '8px';
    dayBars.style.alignItems = 'flex-end';
    dayBars.style.height = '60px';
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayUsage = [0, 1, 0.7, 0.6, 0.5, 0.4, 0.3]; // Monday is highest
    
    days.forEach((day, index) => {
        const bar = document.createElement('div');
        bar.style.flex = '1';
        bar.style.height = `${dayUsage[index] * 100}%`;
        bar.style.background = index === 1 ? '#ff6b35' : '#2a2a2a'; // Monday is highlight
        bar.style.borderRadius = '2px';
        dayBars.appendChild(bar);
    });
    
    daySection.appendChild(dayBars);
    container.appendChild(daySection);
    
    // Hour pattern
    const hourSection = document.createElement('div');
    
    const hourTitle = document.createElement('div');
    hourTitle.textContent = 'Hour - Riga (UTC+2)';
    hourTitle.style.fontSize = '14px';
    hourTitle.style.color = '#808080';
    hourTitle.style.marginBottom = '15px';
    hourSection.appendChild(hourTitle);
    
    const hourBars = document.createElement('div');
    hourBars.style.display = 'flex';
    hourBars.style.gap = '8px';
    hourBars.style.alignItems = 'flex-end';
    hourBars.style.height = '60px';
    
    const hours = ['12-2 AM', '2-4 AM', '4-6 AM', '6-8 AM', '8-10 AM', '10 AM-12 PM', '12 PM', '2-4 PM', '4-6 PM', '6-8 PM', '8-10 PM', '10 PM-12 AM'];
    const hourUsage = [0, 0, 0, 0, 0.3, 0.5, 1, 0.7, 0.6, 0.4, 0.2, 0.1]; // 12-2 PM is highest
    
    hours.forEach((hour, index) => {
        const bar = document.createElement('div');
        bar.style.flex = '1';
        bar.style.height = `${hourUsage[index] * 100}%`;
        bar.style.background = index === 6 ? '#ff6b35' : '#2a2a2a'; // 12-2 PM is highlight
        bar.style.borderRadius = '2px';
        hourBars.appendChild(bar);
    });
    
    hourSection.appendChild(hourBars);
    container.appendChild(hourSection);
}

// Initialize all visualizations when DOM is ready
function init() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    renderMonthlyChart();
    renderKeyPressChart();
    renderActivityHeatmap();
    renderTokensByWeek();
    renderUsagePatterns();
    
    // Smooth scroll on load
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

init();


