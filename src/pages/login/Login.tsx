import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonLoading, IonPage, IonTabBar, IonTabButton, IonTitle, IonToast, IonToolbar } from '@ionic/react';
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

    return (
        <IonPage>
            <IonContent>
                {
                    shouldRedirect ?
                        <Redirect to="/" /> :
                        <div className="login-container">
                            <IonInput
                                class="login-input"
                                placeholder="Username"
                                onIonChange={e => loginRequest.username = e.detail.value || ''} />
                            <IonInput
                                class="login-input"
                                placeholder="Password"
                                onIonChange={e => loginRequest.password = e.detail.value || ''} />
                            <div className="submit-container">
                                <IonButton class="login-button" onClick={handleLogin}>Login</IonButton>
                            </div>
                            <IonToast
                                isOpen={invalidCredentials}
                                message="Invalid username or password."
                                duration={500}
                                color="danger"
                            />
                        </div>

                }

            </IonContent>
        </IonPage>
    );
}
