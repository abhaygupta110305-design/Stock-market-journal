const entries = [];

function addEntry() {
    const stockName = document.getElementById("stockName").value;
    const buyPrice = document.getElementById("buyPrice").value;
    const sellPrice = document.getElementById("sellPrice").value;

    if (!stockName || !buyPrice || !sellPrice) {
        alert("Please enter all fields.");
        return;
    }

    const profitLoss = sellPrice - buyPrice;

    entries.push({
        stock: stockName,
        buy: buyPrice,
        sell: sellPrice,
        result: profitLoss
    });

    updateTable();
}

function updateTable() {
    const table = document.getElementById("entryTable");

    table.innerHTML = `
        <tr>
            <th>Stock</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Profit/Loss</th>
        </tr>
    `;

    entries.forEach(entry => {
        table.innerHTML += `
            <tr>
                <td>${entry.stock}</td>
                <td>${entry.buy}</td>
                <td>${entry.sell}</td>
                <td>${entry.result}</td>
            </tr>
        `;
    });
}
