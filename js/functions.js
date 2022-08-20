import * as UI from './selectors.js';

function getPopularCrypto() {
    const URL = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=EUR'

    fetch(URL)
        .then(response => response.json())
        .then( ({Data}) => {
            addCryptos(Data);
        })
        .catch(error => console.log('Error:', error));
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

function searchCrypto(e) {
    e.preventDefault();
    
    const cryptoValue = UI.cryptoSelect.value;
    const currencyValue = UI.currencySelect.value;
    
    if( !cryptoValue || !currencyValue ) {
        showMessage('All fields are required!');
    }


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

export {
    getPopularCrypto,
    searchCrypto
}