import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useContext, useEffect, useMemo } from "react";
import { Color, Mesh, MeshStandardMaterial, type Vector3 } from "three";
import { GameContext } from "../../../../contexts/GameContext";
import { GameState } from "../../../../enums/GameState";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

type EggMeshProps = {
    variant?: "normal" | "golden" | "spoil",
    position: Vector3 | [number, number, number],
    id: number,
    onRemove: (id: number) => void
}

function EggMesh({ variant = "normal", position, id, onRemove }: EggMeshProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { state } = gameContext;

    const { scene } = useGLTF("/models/egg.glb");

    const cloneScene = useMemo(() => clone(scene), [scene]);

    useEffect(() => {
        cloneScene.traverse((child) => {
            child.receiveShadow = true;
            child.castShadow = true;
            if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
                child.material = child.material.clone();
                if (variant === "golden") {
                    child.material.emissive.set(Color.NAMES.yellow);
                    child.material.emissiveIntensity = 2;
                }
                else if (variant === "normal") {
                    child.material.emissive.set(Color.NAMES.white);
                    child.material.emissiveIntensity = 0;
                }
                else {
                    child.material.emissive.set(Color.NAMES.red);
                    child.material.emissiveIntensity = 2;
                }
            }
        });
    }, [variant, cloneScene]);

    return (
        <RigidBody type={state === GameState.Playing ? "dynamic" : "fixed"} colliders="ball" position={position} scale={0.1} gravityScale={1} userData={{ type: "egg", id }}
            onCollisionEnter={({ other }) => {
                const otherType = other.rigidBodyObject?.userData?.type;
                if (otherType === "ground" || otherType === "bucket") {
                    onRemove(id);
                }
            }}
        >
            <group>
                <primitive object={cloneScene} />
            </group>
        </RigidBody>
    );
}

useGLTF.preload("/models/egg.glb");

export default EggMesh;