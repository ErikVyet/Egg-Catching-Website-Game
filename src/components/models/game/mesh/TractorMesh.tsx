import { Gltf } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import type { Euler, Vector3 } from "three";

type TractorMeshProps = {
    position?: Vector3 | [number, number, number],
    rotation?: Euler | [number, number, number]
}

function TractorMesh({ position = [0, 0, 0], rotation = [0, 0, 0] }: TractorMeshProps) {
    return (
        <RigidBody type="fixed" colliders="hull" position={position} scale={0.5} rotation={rotation}>
            <Gltf src={"/src/assets/models/tractor.glb"} castShadow />
        </RigidBody>
    );
}

export default TractorMesh;