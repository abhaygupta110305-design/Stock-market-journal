document.getElementById("entryForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const stockName = document.getElementById("stockName").value;
    const buyPrice = document.getElementById("buyPrice").value;
    const sellPrice = document.getElementById("sellPrice").value;
    
    const table = document.getElementById("journalTable");
    const row = document.createElement("tr");
    
    row.innerHTML = `<td>${stockName}</td><td>${buyPrice}</td><td>${sellPrice}</td>`;
    table.appendChild(row);
    
    document.getElementById("entryForm").reset();
});