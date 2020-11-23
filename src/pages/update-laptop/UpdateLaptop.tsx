import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonLoading, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useContext, useState } from 'react';
import './UpdateLaptop.css';
import { Laptop } from '../../models/Laptop';
import { saveLaptop, updateLaptop } from '../../api/LaptopApi';
import { Redirect, RouteComponentProps } from 'react-router';
import { Header } from '../../components/header/Header';
import { BottomBar } from '../../components/bottom-bar/BottomBar';
import LocalStorage from '../../utils/LocalStorage';

interface UpdateLaptopProps extends RouteComponentProps {
}

export const UpdateLaptop: React.FC<UpdateLaptopProps> = ({ history }) => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [laptop, setLaptop] = useState<Laptop>({
        id: 0,
        name: ''
    });

    function saveOrUpdateLaptop() {
        let updatePromise;

        if(laptop.id == 0) {
            updatePromise = saveLaptop(laptop);
        } else {
            updatePromise = updateLaptop(laptop);
        }

        updatePromise.then(_ => {
            setShouldRedirect(true);
        });
    }

    useIonViewWillEnter(async () => {
        var clickedLaptop = await LocalStorage.getClickedLaptop();
        var loggedUser = await LocalStorage.getLoggedInUser();
        console.log(clickedLaptop);
        setLaptop({
            id: (clickedLaptop && clickedLaptop.id) || laptop.id,
            name:  (clickedLaptop && clickedLaptop.name) || laptop.name,
            price:  (clickedLaptop && clickedLaptop.price) || '',
            brand:  (clickedLaptop && clickedLaptop.brand) || '',
            memory:  (clickedLaptop && clickedLaptop.memory) || '',
            processor:  (clickedLaptop && clickedLaptop.processor) || '',
            rating:  (clickedLaptop && clickedLaptop.rating) || '',
            storage:  (clickedLaptop && clickedLaptop.storage) || '',
            type:  (clickedLaptop && clickedLaptop.type) || '',
            videoCard:  (clickedLaptop && clickedLaptop.videoCard) || '',
            userId: loggedUser.id
        })
    });

    return (
        <IonPage>
             {shouldRedirect && <Redirect to="/"/>}
            <Header />
            <IonContent>
                <IonItem>
                    <IonInput placeholder="Name" value={laptop.name} onIonChange={e => laptop.name = e.detail.value || ''} />
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Price" value={laptop.price} onIonChange={e => laptop.price = e.detail.value || ''} />
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Brand" value={laptop.brand} onIonChange={e => laptop.brand = e.detail.value || ''} />
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Memory" value={laptop.memory} onIonChange={e => laptop.memory = e.detail.value || ''} />
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Processor" value={laptop.processor} onIonChange={e => laptop.processor = e.detail.value || ''} />
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Rating" value={laptop.rating} onIonChange={e => laptop.rating = e.detail.value || ''} />
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Storage" value={laptop.memory} onIonChange={e => laptop.storage = e.detail.value || ''} />
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Type" value={laptop.type} onIonChange={e => laptop.type = e.detail.value || ''} />
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Video Card" value={laptop.videoCard} onIonChange={e => laptop.videoCard = e.detail.value || ''} />
                </IonItem>
                <IonButton className="save-button" onClick={_ => saveOrUpdateLaptop()}>
                    Save
                </IonButton>
            </IonContent>
            <BottomBar />
        </IonPage>
    );
}
