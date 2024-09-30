import cmLogo from '/monkey.svg'

import SignUpButton from '../SignUpButton/SignUpButton';
import { useAuth0 } from '@auth0/auth0-react';

function Landing() {
  const { loginWithRedirect } = useAuth0();

  return <>
    <h1 className="title">CONTENT</h1>
    <img className="logo" src={cmLogo} />
    <h1 className="title">MONKEY</h1>
    <SignUpButton />
  </>;
}

export default Landing;
