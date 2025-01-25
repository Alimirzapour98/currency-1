async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultElement = document.getElementById("result");

    if (!amount || amount <= 0) {
        resultElement.innerText = "Please enter a valid amount.";
        resultElement.style.display = "block"; // Show result container
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        if (!response.ok) throw new Error("Failed to fetch exchange rates.");
        
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        resultElement.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        resultElement.style.display = "block";  // Show result container
    } catch (error) {
        resultElement.innerText = "Error fetching conversion rates. Try again later.";
        console.error(error);
        resultElement.style.display = "block";  // Show result even on error
    }
}