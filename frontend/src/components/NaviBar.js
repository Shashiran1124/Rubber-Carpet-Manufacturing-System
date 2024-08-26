import { AppBar, Toolbar, IconButton, InputBase, Typography, Avatar, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#FBFAFA", color: "#000000", boxShadow: "none" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        P.R.I Rubber Industries
                    </Typography>
                </Box>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                    <SearchIcon sx={{ position: "absolute", top: "8px", left: "8px", color: "#6a1b9a" }} />
                    <InputBase
                        placeholder="Search…"
                        sx={{ pl: 4, pr: 2, backgroundColor: "#f4f4f4", borderRadius: "15px", paddingLeft: "30px" }}
                    />
                </Box>
                <IconButton edge="end" color="inherit">
                    <ShareIcon />
                </IconButton>
                <IconButton edge="end" color="inherit">
                    <NotificationsIcon />
                </IconButton>
                <IconButton edge="end" color="inherit">
                    <SettingsIcon />
                </IconButton>
                <Avatar alt="User" src="/path-to-image" sx={{ marginLeft: 2 }} />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;