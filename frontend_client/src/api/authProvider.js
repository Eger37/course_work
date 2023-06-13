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
    logout: (params, ...rest) => {
        localStorage.removeItem("token");
        window.location.replace("/");
    },
    checkAuth: (params) => {
        return localStorage.getItem('token');
    },
    checkError: (error) => {
        if (error.status === 401) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
};
