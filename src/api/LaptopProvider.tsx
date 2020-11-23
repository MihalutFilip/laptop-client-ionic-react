import { Network } from "@capacitor/core";
import { Laptop } from "../models/Laptop";
import LocalStorage from "../utils/LocalStorage";
import { useNetworkStatus } from "../utils/NetworkStatus";
import { LaptopApi } from "./LaptopApi";

export class LaptopProvider extends LaptopApi {
    private static laptopProviderInstance: LaptopProvider;
    
    private LaptopProvider() {}

    static getInstance() {
        if(this.laptopProviderInstance)
            return this.laptopProviderInstance;
        
        return this.laptopProviderInstance = new LaptopProvider();
    }

    private isOnline = () => {
        return LocalStorage.getConnection().connected;
    }

    public getUserLaptops(page: number, userId: number) {
        if(this.isOnline()) {
            return this.getUserLaptopsApi(page, userId);
        }
        else {
            var laptops = LocalStorage.getLaptops();
            return new Promise(_ => { return laptops; });
        }
    }

    public getLaptops(page: number) {
        if(this.isOnline()) {
            return this.getLaptopsApi(page);
        }
        else {
            var laptops = LocalStorage.getLaptops();
            return new Promise(_ => { return laptops; });
        }
    }

    public saveLaptop(laptop: Laptop) {
        return this.saveLaptopApi(laptop);
    }
    
    public updateLaptop(laptop: Laptop) {
        return this.updateLaptopApi(laptop);
    }
}