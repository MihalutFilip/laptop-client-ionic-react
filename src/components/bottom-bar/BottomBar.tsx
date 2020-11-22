import { IonButton, IonContent, IonHeader, IonLabel, IonPage, IonTabBar, IonTabButton, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { Redirect } from "react-router";

interface BottomBarProps {

}

export const BottomBar: React.FC<BottomBarProps> = () => {
    return (
        <IonTabBar>
            <IonTabButton tab="home" href="/">
                <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="user-laptops" href="/user-laptops">
                <IonLabel>My laptops</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/">
                <IonLabel>Account</IonLabel>
            </IonTabButton>
        </IonTabBar>
    );
}