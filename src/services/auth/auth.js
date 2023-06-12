import api from "@/plugins/axios/index.js";

export async function register(username, email, password) {
    return await api.post("/register", {
        username,
        email,
        password,
    });
}

export async function verifyEmail(verifyLink) {
    return await api.get(verifyLink);
}