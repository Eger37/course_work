import simpleRestProvider from 'ra-data-simple-rest';
import {httpClient} from './httpClient';


export const API_URL = '';

const _simpleRestProvider = simpleRestProvider(API_URL, httpClient);

export const dataProvider = {
    ..._simpleRestProvider,
};
