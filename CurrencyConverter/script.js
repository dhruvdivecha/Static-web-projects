// Access countryList from the global scope (defined in codes.js)
// Removed require and import statements

const BASE_URL = "https://api.exchangerate.host/latest?base=";

// Function to get the country flag using Unicode symbols
function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
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

// Function to fetch the exchange rates and update the conversion
async function convertCurrency() {
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const amountFrom = document.getElementById("amountFrom").value;

  // Check if the input amount is valid
  if (amountFrom === "" || isNaN(amountFrom) || amountFrom <= 0) {
    document.getElementById("amountTo").value = "Invalid Amount";
    return;
  }

  try {
    // Fetch the exchange rates from the API
    const response = await fetch(`${BASE_URL}${fromCurrency}`);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();
    const conversionRates = data.rates; // Correct property name

    // Check if the toCurrency is in the conversion rates
    if (!conversionRates[toCurrency]) {
      throw new Error(`Invalid conversion rate for ${toCurrency}`);
    }

    // Perform the conversion and display the result
    const conversionRate = conversionRates[toCurrency];
    const convertedAmount = (amountFrom * conversionRate).toFixed(2);
    document.getElementById("amountTo").value = `${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error("Error converting currency:", error);
    document.getElementById("amountTo").value = "Conversion Error";
  }
}

// Event listeners
document.getElementById("fromCurrency").addEventListener("change", convertCurrency);
document.getElementById("toCurrency").addEventListener("change", convertCurrency);
document.getElementById("amountFrom").addEventListener("input", convertCurrency);
document.getElementById("convertButton").addEventListener("click", convertCurrency);

// Populate dropdowns on load
window.onload = populateDropdowns;