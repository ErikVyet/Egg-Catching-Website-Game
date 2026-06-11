import { Gltf } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../../../../contexts/GameContext";
import { GameState } from "../../../../enums/GameState";

type BucketMeshProps = {
    range: [number, number],
    pointerPositionScale: number,
    onEggCaught: (id: number) => void
}

function BucketMesh({ range, pointerPositionScale, onEggCaught }: BucketMeshProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { state } = gameContext;

    const [isGrabbing, setIsGrabbing] = useState(false);

    const bucketRef = useRef<RapierRigidBody>(null!);
    const caughtEggsRef = useRef<Set<number>>(new Set());

    const { pointer } = useThree();

    const maxWorldLeft = range[0];
    const maxWorldRight = range[1];
    const softness = 0.03;

    useEffect(() => {
        const bucket = bucketRef.current;
        if (bucket && state === GameState.Initial) {
            const bucketPos = bucket.translation();
            bucket.setTranslation({ x: 0, y: bucketPos.y, z: bucketPos.z}, true);
        }
    }, [state]);

    useFrame(() => {
        const bucket = bucketRef.current;
        if (bucket && isGrabbing && state === GameState.Playing) {
            const currentPos = bucket.translation();

            let targetX = pointer.x * pointerPositionScale;
            targetX = Math.max(maxWorldLeft, Math.min(maxWorldRight, targetX));

            const smoothX = currentPos.x + (targetX - currentPos.x) * softness;

            bucket.setTranslation({ x: smoothX, y: currentPos.y, z: currentPos.z }, true);
        }
    });

    const handleGrabbing = () => {
        setIsGrabbing(true);
        document.body.style.cursor = "grabbing";
    };
    const handleReleasing = () => {
        setIsGrabbing(false);
        document.body.style.cursor = "default";
    };

    return (
        <RigidBody ref={bucketRef} type="fixed" colliders="trimesh" scale={0.4} userData={{ type: "bucket" }}
            onCollisionEnter={({ other }) => {
                if (other.rigidBodyObject?.userData?.type === "egg") {
                    const eggId = other.rigidBodyObject.userData.id as number;
                    if (caughtEggsRef.current.has(eggId)) return;
                    caughtEggsRef.current.add(eggId);
                    onEggCaught(eggId);
                    setTimeout(() => caughtEggsRef.current.delete(eggId), 500);
                }
            }}>
            <Gltf src={"/src/assets/models/bucket.glb"} castShadow onPointerDown={handleGrabbing} onPointerUp={handleReleasing} />
        </RigidBody>
    );
}

export default BucketMesh;