import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMatcapTexture, Text3D, useGLTF, Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three'

const matcapMat = new THREE.MeshMatcapMaterial();

function ModelView() {
  const [height, setHeight] = useState() as any;

  const book = useGLTF("/models/book.gltf");
  const slate = useGLTF("/models/slate.gltf");
  const vg = useGLTF("/models/vg.gltf");
  const openBookRef = useRef() as any;
  const controllerRef = useRef() as any;
  const slateRef = useRef() as any;

  const booksRef = useRef() as any;
  const vgRef = useRef() as any;
  const mvtvRef = useRef() as any;
  const trackRef = useRef() as any;

  const rotationMult = .05;
  const positionMult = .05;
  const { mouse } = useThree(); // Get mouse position from the canvas
  const [matcapTexture] = useMatcapTexture('28292A_D3DAE5_A3ACB8_818183', 512)

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace
    matcapTexture.needsUpdate = true
    matcapMat.matcap = matcapTexture
    matcapMat.needsUpdate = true

    window.addEventListener('resize', setHeight(window.innerHeight));
    return () => window.removeEventListener('resize', setHeight(window.innerHeight));
  }), []

  // Update the text position or rotation based on mouse movement
  useFrame(() => {
    if (booksRef.current) {
      booksRef.current.rotation.y = -Math.PI / 24 + (-mouse.x * Math.PI * rotationMult);
    }
    if (vgRef.current) {
      vgRef.current.rotation.y = -Math.PI / 8 + mouse.x * Math.PI * rotationMult;
    }
    if (mvtvRef.current) {
      mvtvRef.current.rotation.y = Math.PI / 12 + mouse.x * Math.PI * rotationMult;
    }
    if (openBookRef.current) {
      openBookRef.current.rotation.x = Math.PI / 10 + mouse.y * Math.PI * rotationMult;
      openBookRef.current.rotation.z = Math.PI / 9 + mouse.x * Math.PI * rotationMult;

      openBookRef.current.position.x = 1.1 + mouse.x * positionMult;
      openBookRef.current.position.y = -0.6 + mouse.y * positionMult;
    }
    if (controllerRef.current) {
      controllerRef.current.rotation.x = Math.PI / 2.7 + mouse.y * Math.PI * rotationMult;
      controllerRef.current.rotation.y = mouse.x * Math.PI * rotationMult;

      controllerRef.current.position.x = .5 + mouse.x * positionMult;
      controllerRef.current.position.y = 1 + mouse.y * positionMult;
    }
    if (slateRef.current) {
      slateRef.current.rotation.x = Math.PI / 2 - mouse.y * Math.PI * rotationMult;
      slateRef.current.rotation.z = Math.PI / 24 + mouse.x * Math.PI * rotationMult;

      slateRef.current.position.x = -1 + mouse.x * positionMult;
      slateRef.current.position.y = -0.6 + mouse.y * positionMult;
    }
    if (trackRef.current) {
      trackRef.current.rotation.x = -mouse.y * Math.PI * rotationMult;
      trackRef.current.position.y = 1 + height/1100;
    }
  });

  return (<>
    <Environment preset="city" />
    <ambientLight intensity={.75} />
    <directionalLight position={[0, 15, 5]} />

    <primitive
      object={vg.scene}
      ref={controllerRef}
      position={[.5, .7, -3]}
    />

    <primitive
      object={slate.scene}
      ref={slateRef}
      position={[-1, -1, -3]}
      rotation-x="90"
      scale=".8"
    />

    <primitive
      object={book.scene}
      ref={openBookRef}
      position={[1.3, -1.1, -3]}
      rotation-x="90"
      scale=".8"
    />

    <group ref={trackRef} position={[0, 1.3, -2]} scale={.45}>
      <Text3D
        material={matcapMat}
        position={[-3.1, 0, 0]}
        font="/fonts/open_extrabold.json"
        letterSpacing={-.05}
        height={.25}
        size={.7}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        TRACK YOUR
      </Text3D>
    </group>

    <group ref={booksRef} position={[1.3, -1, -2]} scale={.5}>
      <Text3D
        material={matcapMat}
        position={[-1.7, 0, 0]}
        rotation-x={-Math.PI / 7}
        font="/fonts/open_extrabold.json"
        letterSpacing={-.05}
        height={.25}
        curveSegments={12}
        size={.7}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        BOOKS
      </Text3D>
    </group>

    <group ref={vgRef} position={[1.6, 1, -2]} scale={.5}>
      <Text3D
        material={matcapMat}
        position={[-1.45, 0, 0]}
        font="/fonts/open_extrabold.json"
        letterSpacing={-.05}
        height={.25}
        curveSegments={12}
        size={.7}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        VIDEO
      </Text3D>
      <Text3D
        material={matcapMat}
        position={[-1.7, -1.2, 0]}
        font="/fonts/open_extrabold.json"
        letterSpacing={-.05}
        height={.25}
        size={.7}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        GAMES
      </Text3D>
    </group>

    <group ref={mvtvRef} position={[-1.5, .2, -2]} scale={.5}>
      <Text3D
        material={matcapMat}
        position={[-1.9, 0, 0]}
        size={.7}
        font="/fonts/open_extrabold.json"
        letterSpacing={-.05}
        height={.25}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        MOVIES
      </Text3D>
      <Text3D
        material={matcapMat}
        position={[-2.4, -1.2, 0]}
        size={.7}
        font="/fonts/open_extrabold.json"
        letterSpacing={-.05}
        height={.25}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        & SHOWS
      </Text3D>
    </group>

  </>
  );
};

export default ModelView;
