import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { GLTF } from 'three-stdlib';

type ThreeDModelsProps = {
  index: number
  z: number
  speed: number
}

type BananaGLTF = GLTF & {
  nodes: {
    banana_high: THREE.Mesh;
    banana_mid: THREE.Mesh;
    banana_low: THREE.Mesh;
  };
  materials: {
    skin: THREE.Material;
  };
};


function ThreeDModels({ index, z, speed }: ThreeDModelsProps) {
  const ref = useRef<THREE.LOD>(null)
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])

  // Load the models
  const { nodes, materials } = useGLTF('/banana-v1-transformed.glb') as BananaGLTF
  console.log(materials)

  // Random positioning and rotation data
  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 2),
    x: THREE.MathUtils.randFloatSpread(width * 2),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI
  })

  useFrame((state, dt) => {
    if (dt < 0.1 && ref.current) {
      ref.current.position.set(data.x, (data.y += dt * speed), -z)
      ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
      if (data.y > height * 2) data.y = -height * 2
    }
  })

  return (
    <Detailed ref={ref} distances={[0, 65, 80]}>
      <mesh geometry={nodes.banana_high.geometry} material={materials.skin} />
      <mesh geometry={nodes.banana_mid.geometry} material={materials.skin} />
      <mesh geometry={nodes.banana_low.geometry} material={materials.skin} />
    </Detailed>
  )
}

type ModelsProps = {
  speed?: number
  count?: number
  depth?: number
  easing?: (x: number) => number
}

export default function Models({ speed = 1, count = 100, depth = 80, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }: ModelsProps) {
  return (
    <Canvas
      flat
      gl={{ antialias: false }}
      style={{
        position: 'absolute',
        top: "-105px",
        left: 0,
        width: '100%',
        height: '100vh',
        clipPath: 'inset(0 0% 0 0%)'  // Adjust to control visible area
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}
    >
      <spotLight position={[10, 20, 10]} penumbra={1} decay={0} intensity={3} color="blue" />
      {Array.from({ length: count }, (_, i) => (
        <ThreeDModels key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} />
      ))}
      <Environment preset="sunset" />
      <EffectComposer multisampling={0}>
        <DepthOfField target={[0, 0, 60]} focalLength={.6} bokehScale={15} height={700} />
      </EffectComposer>
    </Canvas>
  )
}