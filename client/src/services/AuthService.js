import { json } from "body-parser";

// login function
export default {
    login: user => {
        return fetch(`/users/login`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": `application/json`
            }
        }).then(res => {
            if (res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated: false, user: { userName: "" } };
        })
    },
        register: user => {
        return fetch(`/users/register`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": `application/json`
            }
        }).then(res => res.json())
            .then(data => data);
    },
    logout: () => {
        return fetch(`users/logout`)
            .then(res => res.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch(`users/profile`)
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated: false, user: { userName: "" } };
        })
    }
}