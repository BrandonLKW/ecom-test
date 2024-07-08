import { User } from "../models/User";
import * as userAPI from "./user-api";

export async function login(user: User){
    const res = await userAPI.login(user);
    return res;
}

export async function signup(user: User){
    const res = await userAPI.signup(user);
    const token = res.token;
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        return null;
    }
    localStorage.setItem("token", token);
    return res;
}

export async function getUserById(userId: string){
    const res = await userAPI.getUserById(userId);
    return res;
}

export function getToken(){
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    };
    const payload = JSON.parse(atob(token.split(".")[1]));
    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
        // Token has expired - remove it from localStorage
        localStorage.removeItem("token");
        return null;
    }
    return payload;
}