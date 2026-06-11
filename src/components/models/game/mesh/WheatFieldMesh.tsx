import { useGLTF } from "@react-three/drei";
import WheatMesh from "./WheatMesh";
import type { Vector3 } from "three";

type WheatFieldMeshProps = {
    position?: Vector3 | [number, number, number],
    size?: [number, number],
    gap?: number
}

function WheatFieldMesh({ position = [0, 0, 0], size = [1, 1], gap = 0.2 }: WheatFieldMeshProps) {
    const wheatModel = useGLTF("/src/assets/models/wheat.glb");
    
    return (
        <group position={position}>
            <WheatMesh scene={wheatModel.scene} animations={wheatModel.animations} />
        </group>
    );
}

useGLTF.preload("/src/assets/models/wheat.glb");

export default WheatFieldMesh;