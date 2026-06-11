import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useLayoutEffect, useRef } from "react";
import { MeshStandardMaterial, RepeatWrapping, SRGBColorSpace } from "three";

function GroundMesh() {
    const [map] = useTexture(["/public/images/ground_texture.jpg"]);

    const materialRef = useRef<MeshStandardMaterial>(null!);
    
    useLayoutEffect(() => {
        const material = materialRef.current;
        if (material) {
            material.map = map;
            material.map.colorSpace = SRGBColorSpace;
            material.map.wrapS = RepeatWrapping;
            material.map.wrapT = RepeatWrapping;
            material.map.repeat.set(8, 8);
        }
    }, []);

    return (
        <RigidBody type="fixed" colliders="hull" rotation={[-Math.PI / 2, 0, 0]} userData={{ type: "ground" }}>
            <mesh receiveShadow>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial ref={materialRef} />
            </mesh>
        </RigidBody>
    );
}

export default GroundMesh;