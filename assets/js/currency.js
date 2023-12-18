const API_KEY = 'TU_API_KEY'; // Reemplaza con tu clave de API

/**
 * Main function.
 */
document.addEventListener('DOMContentLoaded', function() {
    // fetch currencies when page loads
    fetchCurrencies();

    // clear result when amount changes
    document.getElementById('amount').addEventListener('change', function() {
        document.getElementById('result').innerText = '';
    });

    // perform conversion when button is clicked
    document.getElementById('convert').addEventListener('click', performConversion);
});

/**
 * Fetches the available currencies from the API.
 * @returns {void}
 * @see https://www.freecurrencyapi.com/
 * @see https://www.freecurrencyapi.com/api-doc
 */ 
function fetchCurrencies() {
    const url = `https://api.freecurrencyapi.com/api/v2/latest?apikey=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => populateCurrencyDropdowns(data.data))
        .catch(error => console.error('Error fetching currencies:', error));
}

/**
 * Populates the currency dropdowns with the available currencies.
 * @param {object}
 * @returns {void}
 */
function populateCurrencyDropdowns(currencies) {
    const currencyFromDropdown = document.getElementById('currencyFrom');
    const currencyToDropdown = document.getElementById('currencyTo');
    Object.keys(currencies).forEach(currency => {
        let option = new Option(currency, currency);
        currencyFromDropdown.add(option.cloneNode(true));
        currencyToDropdown.add(option);
    });
}

/**
 * Realiza la conversión de moneda.
 * @returns {void}
 */
function performConversion() {
    const currencyFrom = document.getElementById('currencyFrom').value;
    const currencyTo = document.getElementById('currencyTo').value;
    const amount = document.getElementById('amount').value;
    if (amount && currencyFrom && currencyTo) {
        convertCurrency(currencyFrom, currencyTo, amount);
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

/**
 * Converts an amount from one currency to another.
 * @param {string} currencyFrom - The currency to convert from.
 * @param {string} currencyTo - The currency to convert to.
 * @param {number} amount - The amount to convert.
 */
function convertCurrency(currencyFrom, currencyTo, amount) {
    const url = `https://api.freecurrencyapi.com/api/v2/latest?apikey=${API_KEY}&base_currency=${currencyFrom}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data[currencyTo]) {
                const rate = data.data[currencyTo];
                const result = rate * amount;
                document.getElementById('result').innerText = `Resultado: ${result.toFixed(2)} ${currencyTo}`;
            } else {
                throw new Error('Currency conversion data not found');
            }
        })
        .catch(error => console.error('Error converting currency:', error));
}
