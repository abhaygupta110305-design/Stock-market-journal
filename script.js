let trades = {};
let chart;

function addEntry() {
    const date = document.getElementById("tradeDate").value;
    const stock = document.getElementById("stockName").value;
    const buy = Number(document.getElementById("buyPrice").value);
    const sell = Number(document.getElementById("sellPrice").value);

    if (!date || !stock || !buy || !sell) {
        alert("Fill all fields");
        return;
    }

    if (!trades[date]) trades[date] = [];

    if (trades[date].length >= 10) {
        alert("Max 10 entries allowed for one day");
        return;
    }

    trades[date].push({
        stock,
        buy,
        sell,
        profit: sell - buy
    });

    updateTable();
    updateChart();
    clearInputs();
}

function updateTable() {
    const table = document.getElementById("entryTable");
    table.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Stock</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>P/L</th>
        </tr>
    `;

    for (let date in trades) {
        trades[date].forEach(t => {
            table.innerHTML += `
                <tr>
                    <td>${date}</td>
                    <td>${t.stock}</td>
                    <td>${t.buy}</td>
                    <td>${t.sell}</td>
                    <td style="color:${t.profit >= 0 ? 'lime' : 'red'}">
                        ${t.profit}
                    </td>
                </tr>
            `;
        });
    }
}

function updateChart() {
    const ctx = document.getElementById("marketChart");

    const labels = [];
    const profits = [];

    for (let date in trades) {
        labels.push(date);
        profits.push(trades[date].reduce((sum, t) => sum + t.profit, 0));
    }

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Daily Profit / Loss",
                data: profits,
                backgroundColor: profits.map(p => p >= 0 ? "#00ffcc" : "#ff4d4d")
            }]
        }
    });
}

function clearInputs() {
    document.getElementById("stockName").value = "";
    document.getElementById("buyPrice").value = "";
    document.getElementById("sellPrice").value = "";
}
