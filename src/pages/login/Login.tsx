import { CreateAnimation, createAnimation, IonButton, IonContent, IonHeader, IonInput, IonLabel, IonLoading, IonPage, IonTabBar, IonTabButton, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { login } from '../../api/LoginApi';
import { LoginRequest } from '../../models/LoginRequest';
import LocalStorage from '../../utils/LocalStorage';
import './Login.css';
import axios from 'axios';

interface LoginProps {

}

export const Login: React.FC<LoginProps> = () => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
    const [loginRequest, setLoginRequest] = useState<LoginRequest>({});

    const handleLogin = () => {
        login(loginRequest.username, loginRequest.password).then(async result => {
            console.log(result);
            if (result.data != null) {
                await LocalStorage.setLoggedInUser(result.data);
                setShouldRedirect(true);
            } else {
                setInvalidCredentials(true);
            }
        });
    }

    const animation=function simpleAnimation() {
        const user = document.querySelector("#user");
        const pass = document.querySelector("#passwd");
        if (user && pass) {
            const animation = createAnimation()
                .addElement(user)
                .addElement(pass)
                .duration(100)
                .direction('alternate')
                .iterations(1)
                .keyframes([
                    {offset: 0, transform: 'translateX(0px)'},
                    {offset: 0., transform: 'translateX(10px)'},
                    {offset: 0.4, transform: 'translateX(0px)'},
                    {offset: 0.6, transform: 'translateX(-10px)'},
                    {offset: 1, transform: 'translateX(0px)'}
                ])
                .onFinish(()=>setInvalidCredentials(true))
            animation.play();
        }
    }

    return (
        <IonPage>
            <IonContent>
                {
                    shouldRedirect ?
                        <Redirect to="/" /> :
                        <div className="login-container">
                            <IonInput
                                id={"user"}
                                class="login-input"
                                placeholder="Username"
                                onIonChange={e => loginRequest.username = e.detail.value || ''} />
                            <IonInput
                                id={"passwd"}
                                class="login-input"
                                placeholder="Password"
                                onIonChange={e => loginRequest.password = e.detail.value || ''} />
                            <div className="submit-container">
                                <IonButton class="login-button" onClick={handleLogin}>Login</IonButton>
                            </div>
                        </div>

                }
                {
                    invalidCredentials ? <CreateAnimation ref={animation}/> : <div></div>
                }
                

            </IonContent>
        </IonPage>
    );
}
