import './Landing.css'

import cmLogo from '/monkey.svg'

import SignUpButton from '../SignUpButton/SignUpButton';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import ModelView from './ModelView.tsx'
import { Suspense } from 'react';

function Landing() {

  return <div className="landing-page">
    <div className="fiber">
      <Canvas
        camera={{
          fov: 20,
          near: 0.1,
          far: 200,
          position: [0,0,15]
        }}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <Suspense fallback={null}>
          <ModelView />
        </Suspense>
      </Canvas>
      <Loader />
    </div>

    <div className="gradient"></div>

    <div className="cont">
      <div className="title">
        <span className="left-text">CONTENT</span>
        <img className="logo" src={cmLogo} />
        <span className="right-text">MONKEY </span>
      </div>
    </div>

    <div className="signUp">
      <SignUpButton />
    </div>
  </div>;
}

export default Landing;
