import './Landing.css'

import cmLogo from '/monkey.svg'

import SignUpButton from '../SignUpButton/SignUpButton';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import ModelView from './ModelView.tsx'
import { Suspense } from 'react';

function Landing() {

  return <>
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
      }}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
    >
      <Suspense fallback={null}>
        <ModelView />
      </Suspense>
    </Canvas>
    <Loader />

    <div className="gradient"></div>

    <div className="cont">
      <div className="title">
        <span className="left-text">CONTENT</span>
        <img className="logo" src={cmLogo} />
        <span className="right-text">MONKEY </span>
      </div>
    </div>

    <SignUpButton />
  </>;
}

export default Landing;
