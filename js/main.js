const chartEl = document.querySelector('#chart');

let chartHeight = 0;

const formatMoneyToDollars = (amt) => new Intl.NumberFormat('en-IN', {style:'currency', currency: 'usd'}).format(amt);

const isCurrentDay = (dayName = 'Friday') => {
    const today = new Date().getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[today] === dayName;
}

function generateChartItem (item) {
    const data = {
        dayName: item.day,
        dayAbbr: item.day.toLowerCase().substring(0,3),
        dayAmount: item.amount,
        currentDay: isCurrentDay(item.day),
    }

    return `<div class="relative flex-1 grid">
    <button class="peer grid gap-3 focus:outline-none focus-visible:ring ${data.currentDay === true ? 'ring-accent2' : 'ring-accent1'} rounded-md" aria-label="${data.dayName}'s spending was ${formatMoneyToDollars(data.dayAmount)}">
      <div class="${data.currentDay === true ? 'bg-accent2' : 'bg-accent1'} hover:opacity-70 rounded-sm h-0" style="height: ${data.dayAmount * 2}px"></div>
      <p class="text-xs text-neutral2">${data.dayAbbr}</p>
    </button>
    <p class="bg-neutral1 text-neutral4 text-xs p-1 rounded-sm absolute -top-8 left-1/2 -translate-x-1/2 transition-opacity duration-300 opacity-0 peer-focus:opacity-100 peer-hover:opacity-100" aria-hidden="true">${formatMoneyToDollars(data.dayAmount)}</p>
  </div>`;
}



async function fetchChartData () {
    const chartFetch = await fetch('./data.json');
    const chartData = await chartFetch.json();
    const array = chartData.map((i) => parseInt(i.amount));
    chartHeight = Math.max(...array) + Math.max(...array) * 0.15;
    chartEl.innerHTML = chartData.map(i => generateChartItem(i)).join('');
}

fetchChartData()