import React, { useEffect, useState } from 'react';
import { useLoader } from "@react-three/fiber";
import { DDSLoader } from "three-stdlib";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";


THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = ({url, rotate}: {url: string, rotate: number[]}) => {

  const [rotation, setRotation] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prevRotation => [
        prevRotation[0] + rotate[0],   // Increment x rotation by 0.01 radians
        prevRotation[1] + rotate[1],            // Keep y rotation same
        prevRotation[2] + rotate[2]            // Keep z rotation same
      ]);  
    }, 20);

    return () => clearInterval(interval);
  }, []);


  const obj = useLoader(OBJLoader, url, loader => {
    loader.manager.onError = function (url: string) {
      console.error(`There was an error loading ${url}`);
    };
  });

  console.log(obj);
  return (
      <primitive 
        object={obj} 
        scale={4}
        // position={[0, -3.25, -1.5]}
        rotation={rotation}  // Pass rotation state
      />
  )
};


export default Scene;