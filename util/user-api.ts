import { User } from "../models/User";
const BASE_URL = "/api/user/";

export async function login(user: User){
    const res = await fetch(BASE_URL + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Login");
    }
}

export async function signup(user: User){
    const res = await fetch(BASE_URL + "signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Signup");
    }
}

export async function getUserById(userId: string){
    const res = await fetch(BASE_URL + "get/userid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id: userId}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Signup");
    }
}