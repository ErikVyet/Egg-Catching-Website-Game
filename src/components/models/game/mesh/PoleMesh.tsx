import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useLayoutEffect, useRef } from "react";
import { MeshStandardMaterial, RepeatWrapping, SRGBColorSpace } from "three";

type PoleMeshProps = {
    width: number;
    height: number;
    depth: number;
    wide: number;
}

function PoleMesh({ width, height, depth, wide }: PoleMeshProps) {
    const [map] = useTexture(["/public/images/wood_texture.jpg"]);

    const materialRef = useRef<MeshStandardMaterial>(null!);

    useLayoutEffect(() => {
        const material = materialRef.current;
        if (material) {
            material.map = map;
            material.map.colorSpace = SRGBColorSpace;
            material.map.wrapS = RepeatWrapping;
            material.map.wrapT = RepeatWrapping;
            material.map.repeat.set(0.1, 0.1);
        }
    }, []);

    return (
        <group>
            <RigidBody type="fixed" colliders="cuboid" position={[-wide, height / 2, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[width, height, depth]}/>
                    <meshStandardMaterial map={map} />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed" colliders="cuboid" position={[wide, height / 2, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[width, height, depth]}/>
                    <meshStandardMaterial map={map} />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed" colliders="cuboid" position={[-0.1, height, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[wide * 2 + 1, 0.2, 0.2]}/>
                    <meshStandardMaterial ref={materialRef} />
                </mesh>
            </RigidBody>
        </group>
    );
}

export default PoleMesh;