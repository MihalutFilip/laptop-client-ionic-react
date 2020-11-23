import { Plugins } from "@capacitor/core/dist/esm/global";
import React from "react";
import { Laptop } from "../models/Laptop";
import { User } from "../models/User";

const { Storage } = Plugins;

export default class LocalStorage {
    private static async getItem(key: string): Promise<string> {
        return await localStorage.getItem(key) || '';
    }

    private static async removeItem(key: string){
        await localStorage.removeItem(key);
    }

    private static async setItem(key: string, value: string){
        await localStorage.setItem(key, value);
    }

    static async clear(){
        await localStorage.clear();
    }

    static async setLoggedInUser(user: User) {
        return await this.setItem('loggedInUser', JSON.stringify(user));
    }

    static async getLoggedInUser(){
        var item = await this.getItem('loggedInUser');
        return item ? JSON.parse(item) : item;
    }

    static async setClickedLaptop(laptop: Laptop) {
        return await this.setItem('clickedLaptop', JSON.stringify(laptop));
    }
    
    static async clearClickedLaptop() {
        await localStorage.removeItem('clickedLaptop');
    }

    static async getClickedLaptop() {
        var item = await this.getItem('clickedLaptop');
        return item ? JSON.parse(item) : item;
    }
}