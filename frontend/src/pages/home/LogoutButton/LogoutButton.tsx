import "../Home.css";

import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button className="logButton" onClick={() => logout()}>
        Sign Out
      </button>
    )
  )
}

export default LogoutButton