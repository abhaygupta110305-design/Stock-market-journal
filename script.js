// ====== CHART ======
const ctx = document.getElementById("marketChart");
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
      label: "NIFTY",
      data: [18000, 18120, 17980, 18200, 18350],
      borderColor: "#00ffcc",
      tension: 0.4
    }]
  }
});

// ====== JOURNAL ======
let entries = [];

function addEntry() {
  const s = stockName.value;
  const b = +buyPrice.value;
  const se = +sellPrice.value;

  if (!s || !b || !se) return alert("Fill all fields");

  entries.push({ s, b, se, p: se - b });
  render();
}

function render() {
  entryTable.innerHTML =
    "<tr><th>Stock</th><th>Buy</th><th>Sell</th><th>P/L</th></tr>";

  entries.forEach(e => {
    entryTable.innerHTML += `
    <tr>
      <td>${e.s}</td>
      <td>${e.b}</td>
      <td>${e.se}</td>
      <td style="color:${e.p>=0?'#00ff00':'#ff4444'}">${e.p}</td>
    </tr>`;
  });
}

// ====== NEWS ======
const news = [
  "Sensex hits new all-time high",
  "IT stocks rally after global cues",
  "RBI policy impacts banking stocks",
  "Market volatile ahead of US data"
];

news.forEach(n => {
  newsList.innerHTML += `<li>📰 ${n}</li>`;
});.hero {
  height: 90vh;
  background: url("https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3") center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  background: rgba(0,0,0,0.6);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
}let journal = JSON.parse(localStorage.getItem("journal")) || {};

function addEntry() {
    const date = document.getElementById("tradeDate").value;
    const stock = document.getElementById("stockName").value;
    const buy = Number(document.getElementById("buyPrice").value);
    const sell = Number(document.getElementById("sellPrice").value);

    if (!date || !stock || !buy || !sell) {
        alert("Fill all fields");
        return;
    }

    if (!journal[date]) journal[date] = [];

    if (journal[date].length >= 10) {
        alert("Max 10 entries per day allowed");
        return;
    }

    journal[date].push({
        stock,
        profit: sell - buy
    });

    localStorage.setItem("journal", JSON.stringify(journal));
    updateChart();
}

function updateChart() {
    const dates = Object.keys(journal).slice(-7);
    const profits = dates.map(d =>
        journal[d].reduce((sum, e) => sum + e.profit, 0)
    );

    drawChart(dates, profits);
}let chart;

function drawChart(labels, data) {
    const ctx = document.getElementById("weeklyChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Weekly Profit/Loss",
                data,
                borderWidth: 2,
                tension: 0.4
            }]
        }
    });
}

updateChart();
