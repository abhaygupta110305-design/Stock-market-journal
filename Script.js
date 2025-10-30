function calculateProfit() {
    let buy = parseFloat(document.getElementById("buy").value);
    let sell = parseFloat(document.getElementById("sell").value);
    let quantity = parseInt(document.getElementById("quantity").value);

    let profit = (sell - buy) * quantity;

    if (profit > 0) {
        document.getElementById("output").innerHTML = "Profit: ₹" + profit;
    } else if (profit < 0) {
        document.getElementById("output").innerHTML = "Loss: ₹" + Math.abs(profit);
    } else {
        document.getElementById("output").innerHTML = "No profit, No loss";
    }
}
