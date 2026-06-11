import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import GameCanvas from "../components/models/game/GameCanvas";
import MenuControl from "../components/home/MenuControl";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { GameState } from "../enums/GameState";
import GameControl from "../components/home/GameControl";
import { ArrowBack, PlayCircle } from "@mui/icons-material";

function Home() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { state, setState, setEgg, setGoldenEgg, score, setScore } = gameContext;

    const scoreRecord = Number(localStorage.getItem("score") ?? 0);

    const handleReturnClick = () => {
        setState(GameState.Initial);
        setEgg(0);
        setGoldenEgg(0);
        setScore(0);
    }

    return (
        <Box className="relative size-full z-0">
            <Stack className={`items-center justify-between size-full ${state === GameState.Initial ? '' : 'hidden!'}`}>
                <Stack className="h-40 items-center justify-center gap-4">
                    <Typography className="text-zinc-100 font-serif! italic" variant="h4">Egg Catching</Typography>
                    <Typography className="text-orange-400">Your highest score: {scoreRecord}</Typography>
                </Stack>
                <MenuControl />
            </Stack>
            <Box className={`absolute bottom-0 left-0 h-12 w-full ${state === GameState.Initial ? 'hidden' : 'block'}`}>
                <GameControl />
            </Box>
            <Box className="absolute top-0 left-0 -z-10 size-full">
                <GameCanvas/>
            </Box>
            <Dialog open={state === GameState.Paused}>
                <Box className="bg-amber-800 border-2 border-zinc-100 rounded-sm py-2 px-8 place-content-center text-center">
                    <Typography className="text-zinc-100 font-serif! py-2" variant="h5">Settings</Typography>
                    <Box className="border-2 border-zinc-100 rounded-sm p-2">
                        <Typography className="text-zinc-100 font-serif! w-2/3 justify-self-center" variant="h3">This feature is coming soon</Typography>
                    </Box>
                    <Box className="pt-5">
                        <Button className="normal-case! font-serif! bg-amber-950! shadow-none!" variant="contained" startIcon={<PlayCircle className="text-zinc-100"/>} disableRipple onClick={() => setState(GameState.Playing)}>Continue</Button>
                    </Box>
                </Box>
            </Dialog>
            <Dialog open={state === GameState.GameOver}>
                <Box className="bg-amber-800 border-2 border-zinc-100 rounded-sm py-2 px-8 place-content-center text-center">
                    <Typography className="text-zinc-100 font-serif! py-2" variant="h5">Game Over</Typography>
                    <Stack className="p-2">
                        <Typography className="text-zinc-100 font-serif! justify-self-center" variant="h6">Score: {score}</Typography>
                        <Typography className="text-zinc-100 font-serif! justify-self-center" variant="h6">Record: {scoreRecord}</Typography>
                    </Stack>
                    <Box className="pt-5">
                        <Button className="normal-case! font-serif! bg-amber-950! shadow-none!" variant="contained" startIcon={<ArrowBack className="text-zinc-100"/>} disableRipple onClick={handleReturnClick}>Return</Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}

export default Home;