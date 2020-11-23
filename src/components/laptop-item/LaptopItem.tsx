import { Laptop } from "../../models/Laptop";
import React, { useState } from 'react';
import { IonItem, IonLabel } from "@ionic/react";
import './LaptopItem.css'
import { UpdateLaptop } from "../../pages/update-laptop/UpdateLaptop";
import { Redirect, Route } from "react-router";
import LocalStorage from "../../utils/LocalStorage";

export interface LaptopItemParam {
    laptop: Laptop;
    isUserItem: boolean;
}

export const LaptopItem: React.FC<LaptopItemParam> = ({ laptop, isUserItem }) => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

    const onItemClick = async () => {
        await LocalStorage.setClickedLaptop(laptop);
        setShouldRedirect(true);
    }

    return (
        <div className="laptop-parent" onClick={onItemClick}>
            {
                shouldRedirect && isUserItem ? <Redirect to="/update-laptop" /> :
                    shouldRedirect && !isUserItem ? <Redirect to="/view-laptop" /> :
                        <IonItem>
                            <IonLabel>
                                {/* <img src="https://www.colourbox.com/preview/9735359-laptop-icon-illustration.jpg"></img> */}
                                <span>{laptop.name}</span>
                                <span className="price-label">Price: {laptop.price}</span>
                            </IonLabel>
                        </IonItem>
            }
        </div>

    );
}