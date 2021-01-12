import { Laptop } from "../../models/Laptop";
import React, { useState } from 'react';
import { IonImg, IonItem, IonLabel } from "@ionic/react";
import './LaptopItem.css'
import { UpdateLaptop } from "../../pages/update-laptop/UpdateLaptop";
import { Redirect, Route } from "react-router";
import LocalStorage from "../../utils/LocalStorage";
import { usePhotoGallery } from "../use-photo-gallery/UsePhotoGallery";

export interface LaptopItemParam {
    laptop: Laptop;
    isUserItem: boolean;
}

export const LaptopItem: React.FC<LaptopItemParam> = ({ laptop, isUserItem }) => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const { photos, takePhoto, deletePhoto } = usePhotoGallery();
    
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
                                <span>{laptop.name}</span>
                                <div className="price-label">{photos.filter(photo=>{return photo.filepath===laptop.photoUrl}).map((photo, index) => (
                            <IonImg 
                                src={photo.webviewPath} />
                    ))}</div>
                            </IonLabel>
                        </IonItem>
            }
        </div>

    );
}