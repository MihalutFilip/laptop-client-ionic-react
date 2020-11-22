import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export interface PrivateRouteProps {
    component: PropTypes.ReactNodeLike;
    path: string;
    exact?: boolean;
}

export const LoginProtectedRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('loggedInUser');;
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
  