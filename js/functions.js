import * as UI from './selectors.js';

async function getPopularCrypto() {
    const URL = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=EUR'
    try {
        const response = await fetch(URL);
        const { Data } = await response.json();
        addCryptos(Data);
    } catch (error) {
        console.log('Error: ', error);
    }
    // fetch(URL)
    //     .then(response => response.json())
    //     .then( ({Data}) => {
    //         addCryptos(Data);
    //     })
    //     .catch(error => console.log('Error:', error));
}

function addCryptos( cryptosArr ) {
    cryptosArr.forEach( crypto => {
        const { CoinInfo: {Name, FullName} } = crypto;
        const cryptoOption = document.createElement('option');
        cryptoOption.value = Name;
        cryptoOption.textContent = FullName;

        UI.cryptoSelect.appendChild(cryptoOption);
    });
}

async function searchCrypto(e) {
    e.preventDefault();
    
    const cryptoValue = UI.cryptoSelect.value;
    const currencyValue = UI.currencySelect.value;
    
    if( !cryptoValue || !currencyValue ) {
        showMessage('All fields are required!');
        return;
    }

    // API Call
    const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoValue}&tsyms=${currencyValue}`;

    // Spinner
    showSpinner();
    
    try {
        const response = await fetch(URL);
        const data = await response.json();
        showCryptoData(data.DISPLAY[cryptoValue][currencyValue]);   
    } catch (error) {
        console.log('Error: ', error);
    }

    // fetch(URL)
    //     .then(response => response.json())
    //     .then(data => {
    //         // const { PRICE, HIGHDAY, LOWDAY } = data.DISPLAY[cryptoValue][currencyValue];
    //         showCryptoData(data.DISPLAY[cryptoValue][currencyValue]);
    //     })
    //     .catch(error => console.log('Error: ', error));
}

function showMessage( message ) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.classList.add('error');

    UI.form.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function showCryptoData( cryptoData ) {
    const { PRICE, HIGHDAY, FROMSYMBOL, LOWDAY, LASTUPDATE, CHANGEPCT24HOUR} = cryptoData;

    UI.resultDiv.innerHTML = `
        <h3>${FROMSYMBOL}</h3>
        <p class="price">Price: <span>${PRICE}</span></p>
        <p>Highest price: <span>${HIGHDAY}</span></p>
        <p>Lowest price: <span>${LOWDAY}</span></p>
        <p>Change in the last 24h: <span>${CHANGEPCT24HOUR}</span></p>
        <p>Last update: <span>${LASTUPDATE}</span></p>
    `;
}

function showSpinner() {
    UI.resultDiv.textContent = '';
    
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    UI.resultDiv.appendChild(spinner);
}

export {
    getPopularCrypto,
    searchCrypto
}