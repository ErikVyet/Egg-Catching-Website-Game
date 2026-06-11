import { useEffect, useMemo, useRef } from "react";
import { useAnimations } from "@react-three/drei";
import { AnimationClip, Group, Vector3, type Object3DEventMap } from "three";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import { RigidBody } from "@react-three/rapier";

type ChickenMeshProps = {
    scene: Group<Object3DEventMap>,
    animations: AnimationClip[],
    position?: Vector3 | [number, number, number],
}

function ChickenMesh({ scene, animations, position = [0, 0, 0]}: ChickenMeshProps) {
    const groupRef = useRef<Group>(null!);

    const { actions } = useAnimations(animations, groupRef);

    const cloneScene = useMemo(() => clone(scene), [scene]);

    useEffect(() => {
        cloneScene.traverse((child) => {
            child.receiveShadow = true;
            child.castShadow = true;
        });

        const idleAction = actions["Idle"] || Object.values(actions)[0];
        if (idleAction) {
            idleAction.reset().fadeIn(0.3).play();
        }
        return () => {
            if (idleAction) {
                idleAction.fadeOut(0.3);
            }
        };
    }, [cloneScene, actions]);

    return (
        <RigidBody type="fixed" colliders="trimesh" position={position} scale={2.5}>
            <group ref={groupRef}>
                <primitive object={cloneScene} />
            </group>
        </RigidBody>
    );
}

export default ChickenMesh;