import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonLoading, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useContext, useState } from 'react';
import './ViewLaptop.css';
import { Laptop } from '../../models/Laptop';
import { saveLaptop, updateLaptop } from '../../api/LaptopApi';
import { Redirect, RouteComponentProps } from 'react-router';
import { Header } from '../../components/header/Header';
import { BottomBar } from '../../components/bottom-bar/BottomBar';
import LocalStorage from '../../utils/LocalStorage';
import { arrowBack } from 'ionicons/icons';

export const ViewLaptop: React.FC<any> = () => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [laptop, setLaptop] = useState<Laptop>({
        id: 0,
        name: ''
    });

    useIonViewWillEnter(async () => {
        var clickedLaptop = await LocalStorage.getClickedLaptop();
        var loggedUser = await LocalStorage.getLoggedInUser();
        console.log(clickedLaptop);
        setLaptop({
            id: (clickedLaptop && clickedLaptop.id) || laptop.id,
            name: (clickedLaptop && clickedLaptop.name) || laptop.name,
            price: (clickedLaptop && clickedLaptop.price) || '',
            brand: (clickedLaptop && clickedLaptop.brand) || '',
            memory: (clickedLaptop && clickedLaptop.memory) || '',
            processor: (clickedLaptop && clickedLaptop.processor) || '',
            rating: (clickedLaptop && clickedLaptop.rating) || '',
            storage: (clickedLaptop && clickedLaptop.storage) || '',
            type: (clickedLaptop && clickedLaptop.type) || '',
            videoCard: (clickedLaptop && clickedLaptop.videoCard) || '',
            userId: loggedUser.id
        })
    });

    return (
        <IonPage>
            {shouldRedirect && <Redirect to="/"/>}
            <Header />
            <IonContent>
                <IonItem>
                    <IonLabel>
                        Name: {laptop.name}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Price: {laptop.price}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Brand: {laptop.brand}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Memory: {laptop.memory}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Processor: {laptop.processor}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Rating: {laptop.rating}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Storage: {laptop.storage}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Type: {laptop.type}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Video Card: {laptop.videoCard}
                    </IonLabel>
                </IonItem>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <div onClick={_ => setShouldRedirect(true)}>
                        <IonFabButton>
                            <IonIcon icon={arrowBack} />
                        </IonFabButton>
                    </div>
                </IonFab>
            </IonContent>
            <BottomBar />
        </IonPage>
    );
}
