import {httpClient} from './httpClient';

export const uploadFile = async (file) => {
    const data = new FormData();
    data.append('file', file);
    const response = await httpClient("/files", {
        method: 'POST',
        body: data,
    });
    return response.json;
}

export const _uploadFile = async (url, file, sheet) => {
    const data = new FormData();
    data.append('file', file);
    sheet && data.append('sheet', sheet);
    const response = await httpClient(url, {
        method: 'POST',
        body: data,
    });
    return response.json;
}
