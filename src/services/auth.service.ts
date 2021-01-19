import {API_URL} from "../constants";

export const authUrl = `${API_URL}auth/`;

export const login = (loginEmail: string, password: string): Promise<any> => {
    return fetch(`${authUrl}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: password })
    }).then(res => res.json());
};

export const register = (email: string, name: string, password: string): Promise<string> => {
    return fetch(`${authUrl}register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, name: name, password: password })
    }).then(res => res.json());
};

export const getDetails = (): Promise<any> => {
    return fetch(`${authUrl}user`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(res => res.json());
};
