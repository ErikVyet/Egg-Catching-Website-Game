import { Download, EmojiEvents, Grade, PlayCircle, Settings, Share } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { GameState } from "../../enums/GameState";

function MenuControl() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { setState } = gameContext;

    return (
        <Grid className="w-full h-40 mb-5" container spacing={2}>
            <Grid className="place-content-center text-center" size={2}>
                <IconButton className="rounded-sm! bg-amber-800!" disableRipple>
                    <Download className="text-zinc-100" />
                </IconButton>
            </Grid>
            <Grid className="place-content-center text-center" size={8}>
                <Button className="w-1/2 rounded-sm! bg-amber-500! py-4! text-zinc-100! normal-case! text-xl!" startIcon={<PlayCircle className="size-8!" />} onClick={() => setState(GameState.Playing)}>Play Now</Button>
            </Grid>
            <Grid className="place-content-center text-center" size={2}>
                <IconButton className="rounded-sm! bg-amber-800!" disableRipple>
                    <Share className="text-zinc-100" />
                </IconButton>
            </Grid>
            <Grid className="place-content-center text-center" size={2}>
                <IconButton className="rounded-sm! bg-amber-800!" disableRipple>
                    <EmojiEvents className="text-zinc-100" />
                </IconButton>
            </Grid>
            <Grid className="place-content-center text-center" size={8}>
                <Button className="w-1/2 rounded-sm! bg-amber-500! py-4! text-zinc-100! normal-case! text-xl!" startIcon={<Settings className="size-8!" />}>Setting</Button>
            </Grid>
            <Grid className="place-content-center text-center" size={2}>
                <IconButton className="rounded-sm! bg-amber-800!" disableRipple>
                    <Grade className="text-zinc-100" />
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default MenuControl;