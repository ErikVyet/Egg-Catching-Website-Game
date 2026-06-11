import PoleMesh from "./mesh/PoleMesh";
import GroundMesh from "./mesh/GroundMesh";
import ChickenMesh from "./mesh/ChickenMesh";
import { useGLTF } from "@react-three/drei";
import HaystackMesh from "./mesh/HaystackMesh";
import BucketMesh from "./mesh/BucketMesh";
import TractorMesh from "./mesh/TractorMesh";
import WheatFieldMesh from "./mesh/WheatFieldMesh";
import { useContext, useEffect, useRef, useState } from "react";
import type { Egg } from "../../../interfaces/Egg";
import EggMesh from "./mesh/EggMesh";
import { GameContext } from "../../../contexts/GameContext";
import { GameState } from "../../../enums/GameState";
import { randInt } from "three/src/math/MathUtils.js";

function GameScene() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { state, setState, setEgg, setGoldenEgg, score, setScore } = gameContext;

    const chickenModel = useGLTF("/src/assets/models/chicken.glb");

    const [eggs, setEggs] = useState<Egg[]>([]);

    const eggIdRef = useRef(0);

    const poleWidth = 0.2;
    const poleHeight = 5;
    const poleDepth = 0.2;
    const poleWide = 3;

    const chickens = 5;
    const wheatFieldSize = 5;

    const chickenGroupOffsetX = poleWide - chickens - ((5 - chickens) / 2);
    const chickenXPositions = Array.from({ length: chickens }, (_, i) => chickenGroupOffsetX + i);
    const chickenY = poleHeight + poleDepth / 2;

    const secondRef = useRef(0);
    const lastSpawnRef = useRef(0);

    useEffect(() => {
        if (state === GameState.Playing) {
            const timerInterval = setInterval(() => { secondRef.current += 1; }, 1000);
            return () => clearInterval(timerInterval);
        }
        else if (state === GameState.Initial) {
            secondRef.current = 0;
        }
    }, [state]);

    useEffect(() => {
        if (state === GameState.Initial) {
            setEggs([]);
        }
        else if (state === GameState.Playing) {
            const spawnInterval = setInterval(() => {
                const now = Date.now();
                const spawnDelay = secondRef.current <= 30 ? 2000 : secondRef.current <= 60 ? 1200 : secondRef.current <= 90 ? 600 : 300;

                if (now - lastSpawnRef.current < spawnDelay) return;
                lastSpawnRef.current = now;

                const randomChickenX = chickenXPositions[randInt(0, chickens - 1)];
                const isSpoiled = Math.random() < 0.3;
                const isGolden = Math.random() < 0.15;

                const spawnedEgg: Egg = { 
                    id: ++eggIdRef.current, 
                    position: [randomChickenX, chickenY, 0],
                    variant: isSpoiled ? "spoil" : isGolden ? "golden" : "normal"
                }
                setEggs(prev => [...prev.filter(e => e.id > eggIdRef.current - 20), spawnedEgg]);
            }, 200);

            return () => clearInterval(spawnInterval);
        }
    }, [state]);

    const handleEggCaught = (id: number) => {
        const caughtEgg = eggs.find(e => e.id === id);
        if (!caughtEgg) return;
        if (caughtEgg.variant === "golden") {
            setGoldenEgg(prev => prev + 1);
            setScore(prev => prev + 3);
        }
        else if (caughtEgg.variant === "normal") {
            setEgg(prev => prev + 1);
            setScore(prev => prev + 1);
        }
        else {
            setState(GameState.GameOver);
            const scoreRecord = Number(localStorage.getItem("score"));
            localStorage.setItem("score", Math.max(score, scoreRecord).toString());
        }
        removeEgg(id);
    };

    const removeEgg = (id: number) => {
        setEggs(prev => prev.filter(e => e.id !== id));
    };

    return (
        <group position={[0, -3, 0]}>
            <GroundMesh />
            <PoleMesh width={poleWidth} height={poleHeight} depth={poleDepth} wide={poleWide} />
            <HaystackMesh position={[-2.5, 0, -3]} scale={2} />
            <HaystackMesh variant="block" position={[3.5, 0, 0.5]} scale={1} rotation={[0, -Math.PI / 4, 0]} />
            <TractorMesh position={[-6.5, 0, -5.5]} rotation={[0, -Math.PI / 1.5, 0]} />
            <WheatFieldMesh position={[4, 0, -12]} size={[wheatFieldSize, wheatFieldSize]} />
            <BucketMesh range={[-(poleWide - 0.5), poleWide - 0.5]} pointerPositionScale={5} onEggCaught={handleEggCaught} />
            <group position={[poleWide - chickens - ((5 - chickens) / 2), 0, 0]}>
                {Array.from({ length: chickens }).map((_, index) =>
                    <ChickenMesh scene={chickenModel.scene} animations={chickenModel.animations} position={[index, chickenY, 0]} key={index} />
                )}
            </group>
            {eggs.map(egg => (
                <EggMesh key={egg.id} id={egg.id} position={[egg.position[0], egg.position[1] - poleDepth - 0.1, egg.position[2]]} variant={egg.variant} onRemove={removeEgg} />
            ))}
        </group>
    );
}

useGLTF.preload("/src/assets/models/chicken.glb");

export default GameScene;