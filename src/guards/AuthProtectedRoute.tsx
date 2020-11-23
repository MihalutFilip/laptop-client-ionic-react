
import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export interface AuthProtectedProps {
    component: PropTypes.ReactNodeLike;
    path: string;
    exact?: boolean;
}

export const AuthProtectedRoute: React.FC<AuthProtectedProps> = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('loggedInUser');
    return (
      <Route {...rest} render={props => {
        if (isAuthenticated) {
          // @ts-ignore
          return <Component {...props} />;
        }
        return <Redirect to={{ pathname: '/login' }}/>
      }}/>
    );
}
  