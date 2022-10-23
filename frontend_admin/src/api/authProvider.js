import {httpClient} from './httpClient';

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

export const setPermissionsLocale = locale => {
    const permissions = _getPermissions();
    permissions.locale = locale;
    setPermissions(permissions);
};

export const authProvider = {
    login: ({username, password}) => {
        return httpClient("login", {
            method: 'POST',
            body: JSON.stringify({email: username, password: password}),
        }).then(res => {
            localStorage.setItem("token", res.json.token);
            setPermissions(res.json.permissions);
        });
    },
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
    getPermissions: (params) => {
        const permissions = _getPermissions();
        return permissions ? Promise.resolve(permissions) : Promise.reject();
    },
    getIdentity: (params) => {
        const permissions = _getPermissions();
        return permissions ? Promise.resolve({fullName: permissions.fullName || permissions.email}) : Promise.reject();
    },
};
