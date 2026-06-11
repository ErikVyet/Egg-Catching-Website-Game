import { Gltf } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import type { Euler, Vector3 } from "three";

type HaystackMeshProps = {
    variant?: "pile" | "block",
    position?: Vector3 | [number, number, number],
    scale?: number,
    rotation?: Euler | [number, number, number]
}

function HaystackMesh({ variant = "pile", position = [0, 0, 0], scale, rotation = [0, 0, 0] }: HaystackMeshProps) {
    const src = variant === "pile" ? "/models/haystack.glb" : "/models/haystack2.glb";

    return (
        <RigidBody type="fixed" colliders="hull" position={position} rotation={rotation} scale={scale}>
            <Gltf src={src} castShadow receiveShadow/>
        </RigidBody>
    );
}

export default HaystackMesh;