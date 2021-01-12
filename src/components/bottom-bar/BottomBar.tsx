import { createAnimation, IonButton, IonContent, IonHeader, IonLabel, IonPage, IonTabBar, IonTabButton, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { Redirect } from "react-router";

interface BottomBarProps {

}

export const BottomBar: React.FC<BottomBarProps> = () => {
    
    return (
        <IonTabBar>
            <IonTabButton tab="home" href="/">
                <IonLabel>
                    <span id="home">
                    Home
                        </span></IonLabel>
            </IonTabButton>
            <IonTabButton tab="user-laptops" href="/user-laptops">
                <IonLabel><span id="my-laptops">My laptops</span></IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/">
                <IonLabel>Account</IonLabel>
            </IonTabButton>
        </IonTabBar>
    );
}