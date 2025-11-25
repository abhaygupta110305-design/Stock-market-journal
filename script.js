// ==================== LOCAL STORAGE SETUP ====================
let entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");


// ==================== ADD ENTRY FUNCTION ====================
function addEntry() {
    const stockName = document.getElementById("stockName").value.trim();
    const buyPrice = parseFloat(document.getElementById("buyPrice").value);
    const sellPrice = parseFloat(document.getElementById("sellPrice").value);

    if (!stockName || isNaN(buyPrice) || isNaN(sellPrice)) {
        alert("Please fill all fields correctly.");
        return;
    }

    const profitLoss = (sellPrice - buyPrice).toFixed(2);

    // Save entry
    const entry = {
        stock: stockName,
        buy: buyPrice,
        sell: sellPrice,
        result: profitLoss
    };

    entries.push(entry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    // Update table
    updateTable();

    // Clear input fields
    document.getElementById("stockName").value = "";
    document.getElementById("buyPrice").value = "";
    document.getElementById("sellPrice").value = "";
}



// ==================== UPDATE TABLE ====================
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
        const color = entry.result >= 0 ? "green" : "red";

        table.innerHTML += `
            <tr>
                <td>${entry.stock}</td>
                <td>${entry.buy}</td>
                <td>${entry.sell}</td>
                <td style="color:${color}">${entry.result}</td>
            </tr>
        `;
    });
}


// ==================== AUTO LOAD OLD ENTRIES ====================
document.addEventListener("DOMContentLoaded", updateTable);
