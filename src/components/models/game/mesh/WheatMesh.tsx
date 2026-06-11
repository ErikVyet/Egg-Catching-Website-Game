import { useAnimations } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { Euler, Group, Vector3, type AnimationClip, type Object3DEventMap } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

type WheatMeshProps = {
    scene: Group<Object3DEventMap>,
    animations?: AnimationClip[] | undefined,
    position?: Vector3 | [number, number, number],
    rotation?: Euler | [number, number, number]
}

function WheatMesh({ scene, animations, position = [0, 0, 0], rotation = [0, 0, 0] }: WheatMeshProps) {
    const wheatRef = useRef<Group>(null!);    

    const { actions } = useAnimations(animations, wheatRef);

    const cloneScene = useMemo(() => clone(scene), [scene]);

    useEffect(() => {
        cloneScene.traverse((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
        });

        const idleAction = actions["Object_0"] || Object.values(actions)[0];
        if (idleAction) {
            idleAction.reset().fadeIn(1).play();
        }
        return () => {
            if (idleAction) {
                idleAction.fadeOut(1);
            }
        };
    }, [cloneScene, animations]);

    return (
        <RigidBody type="fixed" colliders="trimesh" position={position} rotation={rotation} scale={0.5}>
            <group ref={wheatRef}>
                <primitive object={cloneScene} />
            </group>
        </RigidBody>
    );
}

export default WheatMesh;