import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <Container className="h-screen bg-orange-950" maxWidth={"md"} disableGutters>
            <Outlet/>
        </Container>
    );
}

export default MainLayout;