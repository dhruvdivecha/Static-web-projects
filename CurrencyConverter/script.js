

function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
    .join('');
}

// Function to populate the dropdowns with flags and currency codes
function populateDropdowns() {
  const fromDropdown = document.getElementById('fromCurrency');
  const toDropdown = document.getElementById('toCurrency');

  for (let currency in countryList) {
    const countryCode = countryList[currency];
    const flagEmoji = getFlagEmoji(countryCode);
    const optionElement = document.createElement('option');
    optionElement.value = currency;
    optionElement.textContent = `${flagEmoji} ${currency}`;

    // Append to both dropdowns
    fromDropdown.appendChild(optionElement.cloneNode(true));
    toDropdown.appendChild(optionElement);
  }

  // Set default values
  fromDropdown.value = 'USD';
  toDropdown.value = 'EUR';
}

// Function to fetch exchange rates
async function convertCurrency() {
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const amountFrom = document.getElementById("amountFrom").value.trim();

  // Input validation
  if (amountFrom === "" || isNaN(amountFrom) || amountFrom <= 0) {
    document.getElementById("amountTo").value = "Invalid Amount";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}${fromCurrency}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    if (!data.success) throw new Error("API failed to return rates");

    const rate = data.rates[toCurrency];
    if (!rate) throw new Error(`Rate for ${toCurrency} not found`);

    const convertedAmount = (amountFrom * rate).toFixed(2);
    document.getElementById("amountTo").value = `${convertedAmount} ${toCurrency}`;

  } catch (error) {
    console.error("Error:", error.message);
    document.getElementById("amountTo").value = `Error: ${error.message}`;
  }
}

// Event listeners and initialization
document.getElementById("fromCurrency").addEventListener("change", convertCurrency);
document.getElementById("toCurrency").addEventListener("change", convertCurrency);
document.getElementById("amountFrom").addEventListener("input", convertCurrency);
document.getElementById("convertButton").addEventListener("click", convertCurrency);
window.onload = populateDropdowns;