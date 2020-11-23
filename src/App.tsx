import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import { AuthProtectedRoute } from './guards/AuthProtectedRoute';
import { LoginProtectedRoute } from './guards/LoginProtectedRoute';
import { Login } from './pages/login/Login';
import { UserLaptopList } from './pages/user-laptop-list/UserLaptopList';
import { LaptopList } from './pages/laptop-list/LaptopList';
import { UpdateLaptop } from './pages/update-laptop/UpdateLaptop';
import { ViewLaptop } from './pages/view-laptop/ViewLaptop';
import axios from 'axios';
import LocalStorage from './utils/LocalStorage';

axios.interceptors.request.use(async function (config) {
  const user = await LocalStorage.getLoggedInUser();
  config.headers.Authorization =  user ? user.token : '';
  return config;
});

const App: React.FC = () => (
    <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
          <LoginProtectedRoute path="/login" component={Login} exact={true} />
          <AuthProtectedRoute path="/" component={LaptopList} exact={true}/>
          <AuthProtectedRoute path="/user-laptops" component={UserLaptopList} exact={true}/>
          <AuthProtectedRoute path="/update-laptop" component={UpdateLaptop} exact={true}/>
          <AuthProtectedRoute path="/view-laptop" component={ViewLaptop} exact={true}/>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
