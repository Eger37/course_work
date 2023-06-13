import {httpClient} from "./httpClient";

export const prepareUrlParams = (params) => {
    const prepareUrlParam = (param) => (`${param[0]}=${JSON.stringify(param[1])}`)
    return Object.entries(params).map(prepareUrlParam).join('&');
}

export const getOne = (url) => {
    return httpClient(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
        },
    }).then(res => {
        if (res.status !== 200) {
            res.json().then((data) => {
                alert(data.message)
            })
            return Promise.reject(res.status !== 200)
        } else {
            return res.json()
        }
    }).catch(function () {
        console.log("error getOne");
    });
};


export const getList = (url, params={}) => {
    return httpClient(`${url}?${prepareUrlParams(params)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
        },
    }).then(res => {
        if (res.status !== 200) {
            res.json().then((data) => {
                alert(data.message)
            })
            return Promise.reject(res.status !== 200)
        } else {
            return res.json()
        }
    }).catch(function () {
        console.log("error");
    });
};

export const createOne = (url, data) => {
    return httpClient(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
        },
        body: JSON.stringify({...data}),
    }).then(res => {
        if (res.status !== 200) {
            res.json().then((data) => {
                alert(data.message)
            })
            return Promise.reject(res.status !== 200)
        } else {
            return res.json()
        }
    }).catch(function () {
        console.log("error");
    });
};

export const postTest1 = ({userId, test1Data, answers}) => {
    return httpClient("test1", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: userId, test_1_data: test1Data, answers: answers}),
    }).then(res => {
        if (res.status !== 200) {
            res.json().then((data) => {
                alert(data.message)
            })
            return Promise.reject(res.status !== 200)
        } else {
            return res.json()
        }
    }).catch(function () {
        console.log("error");
    });
};