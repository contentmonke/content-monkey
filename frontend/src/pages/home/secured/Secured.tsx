import { useAuth0 } from '@auth0/auth0-react';

import LogoutButton from '../LogoutButton/LogoutButton';

function Secured() {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
    <>
      {user?.picture && <img src={user.picture} alt={user?.name} />}
      <h2>Welcome {user?.name}!</h2>
      <div>
        {Object.keys(user!).map((objKey, i) => <p key={i}>{objKey}: {user![objKey]} </p>)}
      </div>
      <LogoutButton />
    </>
    )
  );
}

export default Secured;
