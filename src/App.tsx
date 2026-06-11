import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./views/Home";
import { GameContext } from "./contexts/GameContext";
import { useState } from "react";
import { GameState } from "./enums/GameState";

function App() {
    const [state, setState] = useState<GameState>(GameState.Initial);
    const [egg, setEgg] = useState(0);
    const [goldenEgg, setGoldenEgg] = useState(0);
    const [score, setScore] = useState(0);

    return (
        <GameContext.Provider value={{ state, setState, egg, setEgg, goldenEgg, setGoldenEgg, score, setScore }}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<Home/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </GameContext.Provider>
    )
}

export default App;