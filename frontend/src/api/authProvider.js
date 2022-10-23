import {httpClient} from "./httpClient";

export const authProvider = {
    login: ({email, password}) => {
        return httpClient("login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password, type: 3}),
        }).then(res => {
            if (res.status !== 200) {
                res.json().then((data) => {
                    alert(data.message)
                })
                return Promise.reject(res.status !== 200)
            } else {
                window.location.replace("/");
                localStorage.setItem("token", res.json.token);
                return Promise.resolve()
            }
        }).catch(function () {
            console.log("error");
        });
    },
    signUp: ({email, password, firstName, lastName}) => {
        return httpClient("sign-up", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email, password: password,
                first_name: firstName, last_name: lastName
            }),
        }).then(res => {
            if (res.status !== 200) {
                res.json().then((data) => {
                    alert(data.message)
                })
                return Promise.reject(res.status !== 200)
            } else {
                window.location.replace("/sign-in");
                return Promise.resolve()
            }
        }).catch(function () {
            console.log("error");
        });
    },
    //     return httpClient("sign-up", {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             email: username, password: password,
    //             first_name: firstName, last_name: lastName
    //         }),
    //     }).then(res => {
    //         localStorage.setItem("token", res.json.token);
    //     });
    // },
    logout: (params, ...rest) => {
        localStorage.removeItem("token");
        return Promise.resolve();
    },
    checkAuth: (params) => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    checkError: (error) => {
        if (error.status === 401) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
};
