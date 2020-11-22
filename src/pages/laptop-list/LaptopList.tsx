import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonLabel, IonList, IonLoading, IonPage, IonSearchbar, IonTabBar, IonTabButton, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { Laptop } from '../../models/Laptop';
import { LaptopItem } from '../../components/laptop-item/LaptopItem';
import { add } from 'ionicons/icons';
import './LaptopList.css';
import { getLaptops, getUserLaptops } from '../../api/LaptopApi';
import LocalStorage from '../../utils/LocalStorage';
import { Header } from '../../components/header/Header';
import { BottomBar } from '../../components/bottom-bar/BottomBar';

interface LaptopListProps {

}

export const LaptopList: React.FC<LaptopListProps> = () => {
    const [laptops, setLaptops] = useState<Laptop[]>([]);
    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
    const [searchWord, setSearchWord] = useState<string>('');
    const [page, setPage] = useState<number>(0);

    function fetchLaptops() {
        return getLaptops(page).then(result => {
            setLaptops([...laptops, ...result.data])
            setPage(page + 1)
            if (result.data.length < 13)
                setDisableInfiniteScroll(true);
        })
    }

    function nextPageOfScroll($event: CustomEvent<void>) {
        fetchLaptops().then(_ => {
            ($event.target as HTMLIonInfiniteScrollElement).complete();
        });
    }

    useIonViewWillEnter(() => {
        fetchLaptops();
    });

    return (
        <IonPage>
            <Header />
            {
                    <IonContent>
                        <IonSearchbar
                            value={searchWord}
                            debounce={1000}
                            onIonChange={e => setSearchWord(e.detail.value!)}>
                        </IonSearchbar>
                        {
                            laptops && (
                                <IonList>
                                    {
                                        laptops
                                            .filter(laptop => laptop.name.indexOf(searchWord) >= 0)
                                            .map((laptop) =>
                                                <LaptopItem key={laptop.id} laptop={laptop} />)
                                    }
                                </IonList>
                            )}
                        <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll}
                            onIonInfinite={(e: CustomEvent<void>) => nextPageOfScroll(e)}>
                            <IonInfiniteScrollContent
                                loadingText="Loading more laptops...">
                            </IonInfiniteScrollContent>
                        </IonInfiniteScroll>
                    </IonContent>
            }
            <BottomBar />
        </IonPage>
    );
}
