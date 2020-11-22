import { Laptop } from "../../models/Laptop";
import React from 'react';
import { IonItem, IonLabel } from "@ionic/react";
import './LaptopItem.css'

export interface LaptopItemParam {
    laptop: Laptop;
}

export const LaptopItem: React.FC<LaptopItemParam> = ({laptop}) => {
    return (
        <div className="laptop-parent">
            <IonItem>
                <IonLabel> 
                    {/* <img src="https://www.colourbox.com/preview/9735359-laptop-icon-illustration.jpg"></img> */}
                    <span>{laptop.name}</span>
                    <span className="price-label">Price: {laptop.price}</span>
                </IonLabel>
            </IonItem>
        </div>

    );
}