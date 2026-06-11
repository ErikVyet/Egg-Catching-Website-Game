import { ArrowBack, Egg, Settings, Star } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { GameState } from "../../enums/GameState";

function GameControl() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { setState, egg, setEgg, goldenEgg, setGoldenEgg, score, setScore } = gameContext;

    const handleReturnClick = () => {
        setState(GameState.Initial);
        setEgg(0);
        setGoldenEgg(0);
        setScore(0);
    }

    return (
        <Grid className="w-full h-11/12" container spacing={1}>
            <Grid className="place-content-center text-center" size={1.5}>
                <IconButton className="rounded-sm! bg-amber-950!" disableRipple onClick={handleReturnClick}>
                    <ArrowBack className="text-zinc-100"/>
                </IconButton>
            </Grid>
            <Grid size={3}>
                <Stack className="relative size-full items-center gap-2 px-2 bg-neutral-800 rounded-sm" direction={"row"}>
                    <Egg className="text-yellow-300"/>
                    <Typography className="text-zinc-100">{goldenEgg}</Typography>
                </Stack>
            </Grid>
            <Grid size={3}>
                <Stack className="relative size-full items-center gap-2 px-2 bg-neutral-800 rounded-sm" direction={"row"}>
                    <Egg className="text-zinc-100"/>
                    <Typography className="text-zinc-100">{egg}</Typography>
                </Stack>
            </Grid>
            <Grid size={3}>
                <Stack className="relative size-full items-center gap-2 px-2 bg-neutral-800 rounded-sm" direction={"row"}>
                    <Star className="text-zinc-100"/>
                    <Typography className="text-zinc-100">{score}</Typography>
                </Stack>
            </Grid>
            <Grid className="place-content-center text-center" size={1.5}>
                <IconButton className="rounded-sm! bg-amber-950!" disableRipple onClick={() => setState(GameState.Paused)}>
                    <Settings className="text-zinc-100"/>
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default GameControl