import {fetchUtils} from 'react-admin';


const getOptions = (options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return options;
}

export const httpClient = (url, options = {}) => {
    const _options = getOptions(options);
    return fetchUtils.fetchJson(url, _options);
}

export const httpClientRaw = (url, options = {}) => {
    const _options = getOptions(options);
    return fetch(url, _options);
}
