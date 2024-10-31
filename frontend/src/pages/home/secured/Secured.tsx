import { Suspense, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Models from './ThreeDModels';
// Comment the above and uncomment the following to import the WebGL BG lazily for faster loading times
// const Bananas = lazy(() => import('./Bananas'))

function Secured() {
  const { isAuthenticated } = useAuth0();
  const [speed] = useState(1);

  return (
    isAuthenticated && (
      <div className="the-secured-page">
        <Suspense fallback={null}>
          <Models speed={speed} />
        </Suspense>
      </div>
    )
  );
}

export default Secured;