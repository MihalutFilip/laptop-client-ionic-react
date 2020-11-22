import React from "react";

export default class LocalStorage extends React.Component {
    getItem(key: string): string {
        return localStorage.getItem(key) || '';
    }

    removeItem(key: string){
        localStorage.removeItem(key);
    }

    setItem(key: string, value: string){
        localStorage.setItem(key, value);
    }

    clear(){
        localStorage.clear();
    }

    getLoggedInUser(){
        return JSON.parse(this.getItem('loggedInUser'));
    }
}