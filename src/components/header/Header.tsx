import { CreateAnimation, createAnimation, IonButton, IonContent, IonHeader, IonLabel, IonPage, IonTabBar, IonTabButton, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Redirect, Router } from "react-router";
import { baseUrl } from "../../utils/Cofingurations";
import io from 'socket.io-client';
import LocalStorage from "../../utils/LocalStorage";
import { useNetworkStatus } from "../../utils/NetworkStatus";

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = () => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const { networkStatus } = useNetworkStatus();
    async function logOut() {
        await LocalStorage.clear();
        setShouldRedirect(true);
    }

    function chainAnimations() {
        const elB = document.querySelector('#header-title');
        const elC = document.querySelector('#network-title');
        if (elB && elC) {
          const animationA = createAnimation()
            .addElement(elB)
            .duration(2000)
            .fromTo('transform', 'scale(1)', 'scale(2.5)')
            .afterStyles({
              'background': 'red'
            });
          const animationB = createAnimation()
            .addElement(elC)
            .duration(2000)
            .fromTo('transform', 'scale(1)', 'scale(0.5)')
            .afterStyles({
              'background': 'yellow'
            });
            (async () => {
            await animationA.play();
            await animationB.play();
          })();
        }
      }

    function simpleAnimation() {
        const el = document.querySelector('#logout-button');
        console.log(el);
        if (el) {
          const animation = createAnimation()
            .addElement(el)
            .duration(1000)
            .direction('alternate')
            .iterations(Infinity)
            .keyframes([
              { offset: 0, transform: 'scale(3)', opacity: '1' },
              {
                offset: 1, transform: 'scale(1.5)', opacity: '0.5'
              }
            ]);
          animation.play();
        }
      }

    return (
        <div>
            {
                shouldRedirect && <Redirect to="/login" />
            }
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                    <CreateAnimation ref={chainAnimations} />
                    <CreateAnimation ref={simpleAnimation} />
                        <span id="header-title">Laptops</span>
                        <span id="network-title">
                            {networkStatus.connected ? 'Online': 'Offline'}
                            </span> 
                        <IonButton class="logout-button" onClick={_ => logOut()}>
                            <span id="logout-button">
                            Logout

                            </span>
                            </IonButton>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        </div>
    );
}