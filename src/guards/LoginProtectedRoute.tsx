import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import LocalStorage from '../utils/LocalStorage';

export interface PrivateRouteProps {
    component: PropTypes.ReactNodeLike;
    path: string;
    exact?: boolean;
}

export const LoginProtectedRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const isAuthenticated = LocalStorage.getLoggedInUser();

    return (
      <Route {...rest} render={props => {
        if (!isAuthenticated) {
          // @ts-ignore
          return <Component {...props} />;
        }
        return <Redirect to={{ pathname: '/' }}/>
      }}/>
    );
}
  