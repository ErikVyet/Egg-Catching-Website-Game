import { createContext, type Dispatch, type SetStateAction } from "react";
import type { GameState } from "../enums/GameState";

export const GameContext = createContext<{
    state: GameState,
    setState: Dispatch<SetStateAction<GameState>>,
    egg: number,
    setEgg: Dispatch<SetStateAction<number>>,
    goldenEgg: number,
    setGoldenEgg: Dispatch<SetStateAction<number>>,
    score: number,
    setScore: Dispatch<SetStateAction<number>>,
} | null>(null);