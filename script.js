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
}
