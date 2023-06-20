import {httpClient} from "./httpClient";

export const _getPermissions = () => {
    const rawPermissions = localStorage.getItem('permissions');
    const permissions = JSON.parse(rawPermissions);
    return permissions;
};

export const setPermissions = permissions => {
    localStorage.setItem("permissions", JSON.stringify(permissions));
};

window.addEventListener('storage', (e) => {
    if (e.key === "token" && e.oldValue !== e.newValue) {
        window.location = window.location.origin;
    }
});


function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


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
                res.json().then((data) => {
                    console.log("data");
                    console.log(data);
                    console.log("parseJwt(data.token)");
                    console.log(parseJwt(data.token));
                    // const exp = parseJwt(data.token).exp;
                    // const expirationTime = (exp * 1000);
                    // if (Date.now() >= expirationTime) {
                    //     this.logout()
                    // }
                    localStorage.setItem("token", data.token);
                    setPermissions(data.permissions);
                    window.location.replace("/");
                })
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
    logoutIfExpired: (token) => {
        const exp = parseJwt(token).exp;
        const expirationTime = (exp * 1000);
        if (Date.now() >= expirationTime) {
            authProvider.logout()
        }
    },
    logout: (params, ...rest) => {
        localStorage.removeItem("token");
        window.location.replace("/");
    },
    checkAuth: (params) => {
        const token = localStorage.getItem('token')
        if (token) {
            const exp = parseJwt(token).exp;
            const expirationTime = (exp * 1000);
            if (Date.now() >= expirationTime) {
                authProvider.logout()
                return false
            } else {
                setTimeout(authProvider.checkAuth, expirationTime)
                return true
            }
        } else {
            return false
        }


    },
    checkError: (error) => {
        if (error.status === 401) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
};
