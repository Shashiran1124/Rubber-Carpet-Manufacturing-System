import { AppBar, Toolbar, IconButton, InputBase, Typography, Avatar, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import PRIImage from "../images/PRI.png";

const Navbar = () => {
	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor: "#9568C1",
				color: "#000000",
				boxShadow: "none",
				borderRadius: "5px",
				border: "2px solid #000000",
			}}
		>
			<Toolbar>
				<Box sx={{ flexGrow: 1 }}>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "28px", marginLeft: "380px" }}
					>
						P.R.I Rubber Industries
					</Typography>
				</Box>
				<Box sx={{ position: "relative", display: "inline-block" }}>
					<SearchIcon sx={{ position: "absolute", top: "8px", left: "20px", color: "#6a1b9a" }} />
					<InputBase
						placeholder="search"
						sx={{
							pl: 4,
							pr: 2,
							backgroundColor: "#CDCAC9",
							borderRadius: "15px",
							paddingLeft: "30px",
							fontSize: "14px",
						}}
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
				<Avatar alt="User" src={PRIImage} sx={{ marginLeft: 2, width: 75, height: 43 }} />
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
