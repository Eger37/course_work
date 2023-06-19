// import {fetchUtils} from 'react-admin';

const API_PREFIX = "/api/"

const getOptions = (options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    const token = localStorage.getItem('token');
    options.headers.Authorization = `Bearer ${token}`;
    return options;
}

// export const httpClient = (url, options = {}) => {
//     const _options = getOptions(options);
//     return fetchUtils.fetchJson(url, _options);
// }

export const httpClient = (url, options = {}) => {
    const _options = getOptions(options);
    return fetch(API_PREFIX + url, _options);
}
