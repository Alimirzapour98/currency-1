async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultElement = document.getElementById("result");

    if (!amount || amount <= 0) {
        resultElement.innerText = "لطفا مبلغ معتبر وارد کنید.";
        resultElement.style.display = "block"; // نمایش نتیجه
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        if (!response.ok) throw new Error("دریافت نرخ ارز با مشکل مواجه شد.");
        
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        // افزودن رنگ‌های متفاوت به مقادیر و کد ارز
        resultElement.innerHTML = `
        
            <span class="currency-code"> ${fromCurrency} ${amount} </span> =
            <span class="currency-value">(${convertedAmount})</span>
            <span class="currency-code">${toCurrency}</span>
        `;
        resultElement.style.display = "block"; // نمایش نتیجه
    } catch (error) {
        resultElement.innerText = "خطا در دریافت نرخ ارز. لطفا دوباره تلاش کنید.";
        console.error(error);
        resultElement.style.display = "block"; // نمایش پیام خطا
    }
}