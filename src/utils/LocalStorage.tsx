import { Plugins } from "@capacitor/core/dist/esm/global";
import React from "react";
import { Laptop } from "../models/Laptop";
import { User } from "../models/User";

export default class LocalStorage {
    private static getItem(key: string): string {
        return localStorage.getItem(key) || '';
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

    static getLoggedInUser(){
        var item = this.getItem('loggedInUser');
        return item ? JSON.parse(item) : null;
    }

    static async setClickedLaptop(laptop: Laptop) {
        return await this.setItem('clickedLaptop', JSON.stringify(laptop));
    }
    
    static async clearClickedLaptop() {
        await localStorage.removeItem('clickedLaptop');
    }

    static async getClickedLaptop() {
        var item = await this.getItem('clickedLaptop');
        return item ? JSON.parse(item) : null;
    }

    static async setLaptops(laptops: Laptop[]) {
        return await this.setItem('laptops', JSON.stringify(laptops));
    }

    static getLaptops(){
        var item = this.getItem('laptops');
        return item ? JSON.parse(item) : null;
    }

    static async setConnection(connection: any) {
        return await this.setItem('connection', JSON.stringify(connection));
    }

    static getConnection(){
        var item = this.getItem('connection');
        return item ? JSON.parse(item) : null;
    }
}