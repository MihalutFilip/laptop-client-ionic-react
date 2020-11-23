import { IonButton, IonContent, IonHeader, IonLabel, IonPage, IonTabBar, IonTabButton, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { baseUrl } from "../../utils/Cofingurations";
import io from 'socket.io-client';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = () => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

    function logOut() {
        localStorage.clear();
        setShouldRedirect(true);
    }


    return (
        <div>
            {
                shouldRedirect && <Redirect to="/login" />
            }
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <span>Laptops</span>
                        <IonButton class="logout-button" onClick={_ => logOut()}>
                            Logout
                            </IonButton>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        </div>
    );
}