import api from "@/plugins/axios/index.js";

export async function register(username, email, password) {
    return await api.post("/register", {
      username:  username,
        email:  email,
        password:  password,
    });
}

export async function verifyEmail(verifyLink) {
    return await api.get(verifyLink);
}

export async function sendResetPasswordLink(email) {
    return await api.post("/reset-password", {
        email : email,
    });
}

export async function resetPassword(token, email, password) {
    return await api.post("/reset-password/" + token, {
        email: email,
        token: token,
        password: password,
    });
}

export async function resendEmailVerification(email) {
    return await api.post("/email/verify/resend", {
        email: email,
    });
}

export async function login(email, password, rememberMe) {
    return await api.post("/login", {
        email: email,
        password: password,
        remember_me: rememberMe,
    });
}


export async function authGoogle(url) {
    return await api.get(url);
}

export async function logout() {
    return await api.post("/logout");
}

export async function getUser() {
    return await api.get("/user");
}

export async function updateProfile(username , email , password) {
    return await api.post("/profile/update-profile", {
        username: username,
        email: email,
        password: password,
    });
}