import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonLoading, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useState } from 'react';
import './AddLaptop.css';
import { Laptop } from '../../models/Laptop';
import { saveLaptop } from '../../api/LaptopApi';
import { Redirect, RouteComponentProps } from 'react-router';
import { Header } from '../../components/header/Header';
import { BottomBar } from '../../components/bottom-bar/BottomBar';

interface AddLaptopProps extends RouteComponentProps {

}

export const AddLaptop: React.FC<AddLaptopProps> = ({history}) => {
    const [laptop, setLaptop] = useState<Laptop>({
        id: 0,
        name: '',
        price: ''
    });

    function addLaptop() {
        saveLaptop(laptop).then(_ =>{
            history.goBack();
        });
    }

        return (
            <IonPage>
                <Header />
                <IonContent>
                    <IonItem>
                        <IonInput placeholder="Name" onIonChange={e => laptop.name = e.detail.value || ''} />
                    </IonItem>
                    <IonItem>
                        <IonInput placeholder="Price" onIonChange={e => laptop.price = e.detail.value || ''} />
                    </IonItem>
                    <IonButton className="save-button" onClick={_ => addLaptop()}>
                        Save
                    </IonButton>
                </IonContent>
                <BottomBar />
            </IonPage>
        );
}
