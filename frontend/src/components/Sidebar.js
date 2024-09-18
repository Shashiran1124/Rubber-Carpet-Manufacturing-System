import { useNavigate, useLocation } from "react-router-dom"; // useNavigate replaces useHistory
import { Box, List, ListItem, Divider, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useState, useEffect } from "react";

const Sidebar = () => {
	const navigate = useNavigate(); // useNavigate instead of useHistory
	const location = useLocation();
	const [active, setActive] = useState(location.pathname);

	useEffect(() => {
		setActive(location.pathname); // This ensures active state is updated when the location changes
	}, [location.pathname]);

	const handleNavigation = (path) => {
		setActive(path);
		navigate(path); // use navigate instead of history.push
	};

	const isActive = (paths) => paths.includes(active);

	return (
		<Box
			sx={{
				width: "250px",
				backgroundColor: "#d7c2f4",
				height: "113vh",
				paddingTop: "10px",
				borderRadius: "5px",
				border: "2px solid #000000",
			}}
		>
			<List sx={{ padding: 0 }}>
				{/* Home */}
				<ListItem
					button
					sx={{
						justifyContent: "center",
						padding: "20px 0",
						width: "244px",
						marginRight: "2px",
						borderRadius: "6px",
						border: "1px solid #7540a7",
						marginBottom: "60px",
					}}
					onClick={() => handleNavigation("/")}
				>
					<HomeIcon sx={{ color: isActive(["/"]) ? "#7540a7" : "#000" }} />
				</ListItem>
				<Divider sx={{ backgroundColor: "#fff" }} />

				{/* Reports */}
				<ListItem
					button
					sx={{
						padding: "15px 20px",
						width: "244px",
						marginRight: "2px",
						borderRadius: "6px",
						border: "2px solid #7540a7",
						marginBottom: "4px",
						backgroundColor: isActive(["/reports"]) ? "#7540a7" : "inherit",
					}}
					onClick={() => handleNavigation("/reports")}
				>
					<AssessmentIcon sx={{ color: isActive(["/reports"]) ? "#fff" : "#000" }} />
					<ListItemText
						primary="Reports"
						sx={{
							paddingLeft: "10px",
							color: isActive(["/reports"]) ? "#fff" : "#000",
						}}
					/>
				</ListItem>
				<Divider sx={{ backgroundColor: "#fff" }} />

				{/* Supplier and Raw Material Details */}
				<ListItem
					button
					sx={{
						padding: "15px 20px",
						width: "244px",
						marginRight: "2px",
						borderRadius: "6px",
						border: "2px solid #7540a7",
						marginBottom: "4px",
						backgroundColor: isActive(["/machine/all"]) ? "#7540a7" : "inherit",
					}}
					onClick={() => handleNavigation("/machine/all")}
				>
					<ListAltIcon
						sx={{
							color: isActive(["/machine/all"]) ? "#fff" : "#000",
						}}
					/>
					<ListItemText
						primary="All Machines"
						sx={{
							paddingLeft: "10px",
							color: isActive(["/machine/all"]) ? "#fff" : "#000",
						}}
					/>
				</ListItem>
				<Divider sx={{ backgroundColor: "#fff" }} />

				{/* Create An Order */}
				<ListItem
					button
					sx={{
						padding: "15px 20px",
						width: "244px",
						marginRight: "2px",
						borderRadius: "6px",
						border: "2px solid #7540a7",
						marginBottom: "4px",
						backgroundColor: isActive(["/machine/add"]) ? "#7540a7" : "inherit",
					}}
					onClick={() => handleNavigation("/machine/add")}
				>
					<ListItemText
						primary="Add New Machine"
						sx={{
							paddingLeft: "10px",
							color: isActive(["/machine/add"]) ? "#fff" : "#000",
						}}
					/>
				</ListItem>
				<Divider sx={{ backgroundColor: "#fff" }} />

				{/* View Order Details */}
				<ListItem
					button
					sx={{
						padding: "15px 20px",
						width: "244px",
						marginRight: "2px",
						borderRadius: "6px",
						border: "2px solid #7540a7",
						marginBottom: "4px",
						backgroundColor: isActive(["/Part/add"]) ? "#7540a7" : "inherit",
					}}
					onClick={() => handleNavigation("/Part/add")}
				>
					<ListItemText
						primary="Add New Buy Part"
						sx={{
							paddingLeft: "10px",
							color: isActive(["/Part/add"]) ? "#fff" : "#000",
						}}
					/>
				</ListItem>
				<Divider sx={{ backgroundColor: "#fff" }} />

				{/* Calculate Raw Material Costs */}
				<ListItem
					button
					sx={{
						padding: "15px 20px",
						width: "244px",
						marginRight: "2px",
						borderRadius: "6px",
						border: "2px solid #7540a7",
						marginBottom: "4px",
						backgroundColor: isActive(["/Part/all"]) ? "#7540a7" : "inherit",
					}}
					onClick={() => handleNavigation("/Part/all")}
				>
					<ListItemText
						primary="View Buy Parts"
						sx={{
							paddingLeft: "10px",
							color: isActive(["/Part/all"]) ? "#fff" : "#000",
						}}
					/>
				</ListItem>
			</List>
		</Box>
	);
};

export default Sidebar;
