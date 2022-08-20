import * as UI from './selectors.js';
import { getPopularCrypto, searchCrypto } from './functions.js';

function eventListener() {
    document.addEventListener('DOMContentLoaded', () => {
        getPopularCrypto();
    });

    UI.form.addEventListener('submit', searchCrypto);
}


eventListener();