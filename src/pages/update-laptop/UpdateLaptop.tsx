import { IonActionSheet, IonButton, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonLoading, IonModal, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useContext, useState } from 'react';
import './UpdateLaptop.css';
import { Laptop } from '../../models/Laptop';
import { Redirect, RouteComponentProps } from 'react-router';
import { Header } from '../../components/header/Header';
import { BottomBar } from '../../components/bottom-bar/BottomBar';
import LocalStorage from '../../utils/LocalStorage';
import { LaptopProvider } from '../../api/LaptopProvider';
import { useNetworkStatus } from '../../utils/NetworkStatus';
import { useMyLocation } from '../../components/get-my-location/getMyLocation';
import { Photo, usePhotoGallery } from '../../components/use-photo-gallery/UsePhotoGallery';
import { camera, trash } from 'ionicons/icons';
import { MyMap } from '../../components/my-map/MyMap';
import { MyComponent } from '../../components/my-modal/MyComponent';
import { MyModal } from '../../components/my-modal/MyModal';

interface UpdateLaptopProps extends RouteComponentProps {
}

export const UpdateLaptop: React.FC<UpdateLaptopProps> = ({ history }) => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const { networkStatus } = useNetworkStatus();
    const { photos, takePhoto, deletePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<Photo>();
    const [photoURL, setPhotoURL] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const myLocation = useMyLocation();
    const [lat, setLat] = useState<number>();
    const [lng, setLng] = useState<number>();
    const [openMapModal, setOpenMapModal] = useState(false)
    const { latitude: currentLat, longitude: currentLng } = myLocation.position?.coords || {}
    const [laptop, setLaptop] = useState<Laptop>({
        id: 0,
        name: ''
    });

    function saveOrUpdateLaptop() {
        let updatePromise;
        laptop.photoUrl = photoURL;
        laptop.userId = LocalStorage.getLoggedInUser().id;
        laptop.lat = lat;
        laptop.long = lng;

        if (laptop.id == 0) {
            updatePromise = LaptopProvider.getInstance().saveLaptop(laptop);
        } else {
            updatePromise = LaptopProvider.getInstance().updateLaptop(laptop);
        }

        updatePromise.then(_ => {
            setShouldRedirect(true);
        });
    }

    useIonViewWillEnter(async () => {
        var clickedLaptop = await LocalStorage.getClickedLaptop();
        var loggedUser = await LocalStorage.getLoggedInUser();

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
            photoUrl: (clickedLaptop && clickedLaptop.photoUrl) || '',
            userId: loggedUser.id
        })

        setPhotoURL(clickedLaptop && clickedLaptop.photoUrl || '');
        setLat(clickedLaptop && clickedLaptop.lat || currentLat || 0);
        setLng(clickedLaptop && clickedLaptop.long || currentLng || 0);
    });

    const takePhotoAndSaveIt = () => {
        let url = takePhoto();
        url.then(val => setPhotoURL(val))
            .catch(err => setPhotoURL(''));
    }

    return (
        <IonPage>
            {shouldRedirect && <Redirect to="/" />}
            <Header />
            <IonContent fullscreen>
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
                <IonRow>
                    {photos.filter(photo => { return photo.filepath === photoURL }).map((photo, index) => (
                        <IonCol size="6" key={index}>
                            <IonImg onClick={() => setPhotoToDelete(photo)}
                                src={photo.webviewPath} />
                        </IonCol>
                    ))}
                </IonRow>
                <IonFab vertical="bottom" horizontal="center" slot="fixed">
                    <IonFabButton onClick={() => takePhotoAndSaveIt()}>
                        <IonIcon icon={camera} />
                    </IonFabButton>
                    <IonActionSheet
                        isOpen={!!photoToDelete}
                        buttons={[{
                            text: 'Delete',
                            role: 'destructive',
                            icon: trash,
                            handler: () => {
                                if (photoToDelete) {
                                    deletePhoto(photoToDelete);
                                    setPhotoToDelete(undefined);
                                }
                            }
                        }, {
                            text: 'Cancel',
                            role: 'cancel'
                        }]}
                        onDidDismiss={() => setPhotoToDelete(undefined)}
                    />
                </IonFab>
                <MyComponent />
                <MyModal />
                <IonButton color={"success"} class={"mapBtn"} onClick={() => setOpenMapModal(true)}>OPEN MAP</IonButton>
                <IonModal isOpen={openMapModal} onDidDismiss={() => setOpenMapModal(false)}>
                    {(lat && lng &&
                        <>
                            <div>The location where you can buy the needed books is</div>
                            <div>latitude: {lat}</div>
                            <div>longitude: {lng}</div>
                            <MyMap
                                visibleMarker={true}
                                onMapClick={(e: any) => { setLat(e.latLng.lat()); setLng(e.latLng.lng()) }}
                                lat={lat}
                                lng={lng}
                                onMarkerClick={log('onMarker')}
                            />
                        </>) ||
                        <>
                            <div>SELECT A LOCATION FROM WHERE Laptop CAN BE PURCHASED</div>
                            <MyMap
                                lat={currentLat}
                                lng={currentLng}
                                onMapClick={(e: any) => { setLat(e.latLng.lat()); setLng(e.latLng.lng()) }}
                                onMarkerClick={log('onMarker')}
                            />
                        </>
                    }
                </IonModal>
                <IonButton className="save-button" onClick={_ => saveOrUpdateLaptop()}>
                    Save
                </IonButton>
            </IonContent>
            <BottomBar />
        </IonPage>
    );

    function log(source: string) {
        return (e: any) => console.log(source, e.latLng.lat(), e.latLng.lng());
    }
}
