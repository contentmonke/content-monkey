import "../Home.css";

import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button className="logButton" onClick={() => loginWithRedirect()}>
        Get started
      </button>
    )
  )
}

export default LoginButton