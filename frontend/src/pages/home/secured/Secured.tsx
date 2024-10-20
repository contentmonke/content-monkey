import './Secured.css';

import { useAuth0 } from '@auth0/auth0-react';

import LogoutButton from '../LogoutButton/LogoutButton';
import Example from '../../../example/ExampleList'
import Navbar from '../../../components/navbar/Navbar';

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
      <div>
        <Example />
      </div>
      <LogoutButton />
    </>
    )
  );
}

export default Secured;
