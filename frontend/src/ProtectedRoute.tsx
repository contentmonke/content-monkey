import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Loading } from './components/Loading'

interface ProtectedRouteProps {
  component: React.ComponentType;
  [key: string]: any; // Allow for any other props
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // If Auth0 is still loading the authentication state, show a loading indicator
  if (isLoading) {
    return <Loading />;
  }

  // If the user is authenticated, render the component, otherwise redirect to the login page
  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;