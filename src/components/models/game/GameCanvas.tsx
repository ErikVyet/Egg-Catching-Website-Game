import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import GameScene from "./GameScene";

function GameCanvas() {
    return (
        <Canvas camera={{ position: [0, 4, 10], fov: 40 }} shadows gl={{ powerPreference: "high-performance" }}>
            <directionalLight position={[0, 5, 5]} intensity={1.5} castShadow />
            <Physics>
                <GameScene/>
            </Physics>
            <EffectComposer>
                <Bloom intensity={1.5} luminanceThreshold={0.6} luminanceSmoothing={0.4} />
            </EffectComposer>
        </Canvas>
    );
}

export default GameCanvas;