let db;

initDB();

async function initDB() {
    const sqlPromise = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
    });

    db = new sqlPromise.Database();

    // Table create
    db.run(`
        CREATE TABLE IF NOT EXISTS entries (
            stock TEXT,
            buy REAL,
            sell REAL,
            profit REAL
        );
    `);
}

function addEntry() {
    const stock = document.getElementById("stockName").value;
    const buy = parseFloat(document.getElementById("buyPrice").value);
    const sell = parseFloat(document.getElementById("sellPrice").value);

    if (!stock || !buy || !sell) {
        alert("Please enter all fields.");
        return;
    }

    const profit = sell - buy;

    db.run("INSERT INTO entries (stock, buy, sell, profit) VALUES (?, ?, ?, ?)", [stock, buy, sell, profit]);

    updateTable();
}

function updateTable() {
    const table = document.getElementById("entryTable");

    const result = db.exec("SELECT * FROM entries");

    if (result.length === 0) {
        table.innerHTML = "<tr><th>Stock</th><th>Buy</th><th>Sell</th><th>Profit/Loss</th></tr>";
        return;
    }

    const values = result[0].values;

    table.innerHTML = `
        <tr>
            <th>Stock</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Profit/Loss</th>
        </tr>
    `;

    values.forEach(row => {
        table.innerHTML += `
            <tr>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
            </tr>
        `;
    });
}
